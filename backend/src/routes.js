import express from 'express'
import authController from './controllers/auth'
import usersController from './controllers/users'

const router = express.Router();

router.post('/login', authController.loginUser);
router.post('/refresh', authController.refreshTokenVerify);

// secure router
router.get('/users', authController.accessTokenVerify, usersController.getUserList);
router.post('/register', authController.accessTokenVerify, authController.createUser);

module.exports = router;