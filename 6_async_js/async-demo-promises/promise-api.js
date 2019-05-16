// const p = Promise.resolve({id:1});
// p.then(result=>console.log(result));
// const p = Promise.reject(new Error('reason for rejection...'));
// p.catch(error=>console.log(error.message));

// running parallel promises
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1....');
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000);
});

// all() is in Promise class
// return a new promise when all the promises in the array are resolved
Promise.all([p1, p2])
    .then(result=>console.log(result))
    .catch(err => console.log('Error', err.message));

// race() return the first operation completed
Promise.race([p1, p2])
    .then(result=>console.log(result))
    .catch(err => console.log('Error', err.message));