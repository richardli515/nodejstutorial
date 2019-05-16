const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
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

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'},
]

// reference: expressjs.com
app.get('/', (req, res) => {
    res.render('index', {title:'My Express App', message: 'Home Page'});
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// get a single course by id
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
})

// add a course
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// update a course
app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // if not existing, return 404
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    
    // Validate
    // if invalid, return 400 - bad request
    const { error } = validateCourse(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);

    // update course
    course.name = req.body.name;
    // return the updated course
    res.send(course);
})

function validateCourse(course) {
    const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    
    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
})

// params and query example
// http://localhost:3000/api/posts/2018/1/?sortBy=name
app.get('/api/posts/:year/:month', (req, res) => {
    let ret = [];
    ret.push(req.params);
    ret.push(req.query);
    res.send(ret);
})

// global obj process. attr env. PORT var
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));