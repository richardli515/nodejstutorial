const p = new Promise((resolve, reject) => {
    // Kick off some async work
    // ...
    setTimeout(() => {
        // pending => resolved, fulfilled
        // resolve(1); 
        // pending => rejected
        reject(new Error('test message'));
    }, 2000);
});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));