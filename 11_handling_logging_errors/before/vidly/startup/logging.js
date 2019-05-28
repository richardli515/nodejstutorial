const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function(){
    // process.on('uncaughtException', (ex) => {
    //   winston.error(ex.message, ex);
    //   ProcessingInstruction.exit(1);
    // })

    winston.handleExceptions( 
        new winston.transports.Console({ colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughtexceptions.log'}));

    // process.on('unhandledRejection', (ex) => {
    //   winston.error(ex.message, ex);
    //   process.exit(1);
    // })

    process.on('unhandledRejection', (ex) => {
    throw ex;
    })

    winston.add(winston.transports.File, { filename:'logfile.log'});
    winston.add(winston.transports.MongoDB, {
    db:'mongodb://localhost/vidly',
    level: 'info'
    });

    // throw new Error('Something failed during startup.');
    const p = Promise.reject(new Error('Something failed miserably!'));
}