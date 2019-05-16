const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
// express() func return an obj which has http methods
const app = express();

app.set('view engine', 'pug'); // dont have to require pug
app.set('views', './views'); // path to the templates

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`)

// middleware. enable parsing json. not enabled in default. 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// 3rd party middleware
app.use(helmet());

app.use('/api/courses', courses);
app.use('/', home);

// Configuration
// console.log('Applicaiotn Name: '+ config.get('name'));
// console.log('Mail Server: '+ config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    //DEBUG=app:startup nodemon index.js
    startupDebugger('Morgan enabled...');
}

//DEBUG=app:db nodemon index.js
dbDebugger('Connected to the database...');

app.use(logger);

// global obj process. attr env. PORT var
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));