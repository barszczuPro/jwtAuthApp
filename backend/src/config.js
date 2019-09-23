module.exports = {
  //MONGO CONFIG
  URI_MONGO: process.env.URI_MONGO || 'mongodb://admin:example@localhost:27017/jwtAuthDB',
  //PORT APP CONFIG
  PORT_LISTEN: process.env.PORT_LISTEN || 4200,
  //JWT CONFIG
  TOKEN_SECRET_JWT: process.env.TOKEN_SECRET_JWT || 'jWt9982_s!tokenSecreTqQrtw'
}