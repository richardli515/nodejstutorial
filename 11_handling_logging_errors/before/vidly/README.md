Error handling and logging

Register error handling middleware after all routes.
Use async wrapper to catch.
Use express-async-errors to monkey patch. Only need to import at index.js.

Winston to log
Winston is a transport, a storage device for logs
Console file http
Mongodb couchdb redis loggly

4.0.0-Rc1: release candidate


Logging levels:
Error,warn,info,verbose,debug,silly

The error middleware in Express only catches exceptions in the request processing pipeline. Any errors happening during the application startup (eg connecting to MongoDB) will be invisible to Express. 

Handle uncaught exception
sync:
process.on('uncaughtException', (ex) => {
 winston.error(ex.message, ex);
 ProcessingInstruction.exit(1);
})
async:
process.on('unhandledRejection', (ex) => {
 winston.error(ex.message, ex);
 process.exit(1);
})

Winston can handle sync but need to throw async:
winston.handleExceptions( new winston.transports.File({ filename: 'uncaughtexceptions.log'}));
process.on('unhandledRejection', (ex) => {
 throw ex;
})

As a best practice, in the event handlers you pass to process.on(), you should log the exception and exit the process, because your process may be in an unclean state and it may result in more issues in the future. It’s better to restart the process in a clean state. In production, you can use a process manager to automatically restart a Node process. 