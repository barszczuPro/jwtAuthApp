import UserSchema from '../models/users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET_JWT } from '../config'

// Validate email address
function validateEmailAccessibility(email) {
  return UserSchema.findOne({email: email}).then((result) => {
    return !result;
  });
}

// Generate token
const generateTokens = (req, user) => {
  const ACCESS_TOKEN = jwt.sign(
    {sub: user._id, rol: user.role, type: 'ACCESS_TOKEN'},
    TOKEN_SECRET_JWT,
    {expiresIn: 120});
  const REFRESH_TOKEN = jwt.sign(
    {sub: user._id, rol: user.role, type: 'REFRESH_TOKEN'},
    TOKEN_SECRET_JWT,
    {expiresIn: 480});
  return { accessToken: ACCESS_TOKEN, refreshToken: REFRESH_TOKEN }
}

// Controller create user
exports.createUser = (req, res, next) => {
  validateEmailAccessibility(req.body.email).then((valid) => {
    if (valid) {
      UserSchema.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password }, (error, result) => {
        if (error)
          next(error);
        else
          res.json({
            message: 'The user was created'})
      });
    } else {
      res.status(409).send({message: "The request could not be completed due to a conflict"})
    }
  });
};

// Controller login user
exports.loginUser = (req, res, next) => {
  UserSchema.findOne({email: req.body.email}, (err, user) => {
    if (err || !user) {
      res.status(401).send({message: "Unauthorized"})
      next(err)
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json(generateTokens(req, user));
      } else {
        res.status(401).send({
          message: "Invalid email/password"
        })
      }
    }
  }).select('password')
};

// Verify accessToken
exports.accessTokenVerify = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'Token is missing' });
  }
  const BEARER = 'Bearer'
  const AUTHORIZATION_TOKEN = req.headers.authorization.split(' ')
  if (AUTHORIZATION_TOKEN[0] !== BEARER) {
    return res.status(401).send({ error: "Token is not complete" })
  }
  jwt.verify(AUTHORIZATION_TOKEN[1], TOKEN_SECRET_JWT, function(err) {
    if(err) {
      return res.status(401).send({ error: "Token is invalid" });
    }
    next();
  });
};

// Verify refreshToken
exports.refreshTokenVerify = (req, res, next) => {
  if(!req.body.refreshToken) {
    res.status(401).send({message: "Token refresh is missing"})
  }
  const BEARER = 'Bearer'
  const REFRESH_TOKEN = req.body.refreshToken.split(' ')
  if (REFRESH_TOKEN[0] !== BEARER) {
    return res.status(401).send({ error: "Token is not complete" })
  }
  jwt.verify(REFRESH_TOKEN[1], TOKEN_SECRET_JWT, function(err, payload) {
    if(err) {
      return res.status(401).send({ error: "Token refresh is invalid" });
    }
    UserSchema.findById(payload.sub, function(err, person){
      if (!person){
        return res.status(401).send({error: 'Person not found'});
      }
      return res.json(generateTokens(req, person));
    });
  });
}