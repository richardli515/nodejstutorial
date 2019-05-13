// const logger = require('./logger');

// logger('message');
//path module
const path = require('path');
var pathObj = path.parse(__filename);
console.log(pathObj); 

//os module
const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

//fs module
const fs = require('fs');
const files = fs.readdirSync('./');
console.log(files);
fs.readdir('./', function(err, files){
    if (err) console.log('Error', err);
    else console.log('Result', files);
})

//event module
const EventEmitter = require('events');
const emitter = new EventEmitter();
// register a listener
// order matters. event emitter calls listener synchronously.
emitter.on('messageLogged', function(){
    console.log('Listener called');
})
// raise an event
emitter.emit('messageLogged');

// event arguments
emitter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
})
emitter.emit('messageLogged', { id: 1, url: 'http://'});

// extending event emitter
const Logger = require('./logger');
const logger = new Logger();
logger.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
})
logger.log('message');

// http module
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/'){
        res.write('hello world');
        res.end();
    }

    if (req.url === '/api/courses'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
})

server.listen(3000);

console.log('Listening on port 3000...');



