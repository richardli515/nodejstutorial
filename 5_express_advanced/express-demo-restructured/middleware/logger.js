const log = function(req, res, next){
    const body = JSON.stringify(req.body);
    console.log(`Logging... body: ${body}`);
    next();
}

module.exports = log