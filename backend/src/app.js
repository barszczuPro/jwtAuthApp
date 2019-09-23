import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'
import config from './config'
import { initializeData } from './seed/user-seeder'

// Initialize app
const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', (req, res) => {
  res.json({app: 'Run app auth'});
});

// Connect to MongoDB
mongoose.connect(config.URI_MONGO, {
  useCreateIndex: true,
  useNewUrlParser: true
}).catch(err => console.log('Error: Could not connect to MongoDB.', err));

mongoose.connection.on('connected', () => {
  initializeData()
  console.log('Initialize user')
});
mongoose.connection.on('error', (err) => {
  console.log('Error: Could not connect to MongoDB.', err);
});

// Routes app
app.use('/', routes);
// Start app
app.listen(config.PORT_LISTEN, () => {
  console.log('Listen port ' + config.PORT_LISTEN);
})