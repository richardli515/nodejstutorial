6. Async
Callback hell
Solution1: Anonymous to named
Solution2: promise

Object which holds the result of an async operation
Promise states: pending, fulfilled, rejected.

Promise chain .then().catch()

Settled promises: 
new Promise.resolve()
New Promise.reject()

Use await to await a promise so that we can use the result of function that returns promise.
Sometimes await makes it more clean than promise chains, but needs sync function wrapped and need to use try-catch block.