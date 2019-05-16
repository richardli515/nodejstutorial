// first line is blocking 2nd line
// console.log('before');
// console.log('after');

// Asynchronous
console.log('before');
getUser(1, user => {
    // console.log('user', user);
    // get the repos
    getRepositories(user.gitHubUsername, repos => {
        console.log('repos: ', repos);
    });
});
console.log('after');

// Synchronous
// console.log('before');
// const user = getUser(1);
// const repo = getRepositories(user);
// console.log('after');

// anonymous to named
console.log('before');
getUser(1, getRepositories1);
console.log('after');

function getRepositories1(user){
    getRepositories(user.gitHubUsername, getCommits1);
}
function getCommits1(repos) {
    getCommits(repos, displayCommits);
}
function displayCommits(commits) {
    console.log(commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({id:id, gitHubUsername: 'qian'});
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(()=>{
        console.log('calling github api...');
        callback(['repo1', 'repo2', 'repo3']);
    },2000)
}

function getCommits(repos, callback) {
    setTimeout(()=>{
        console.log('calling github api...');
        callback(['commit1', 'commit2', 'commit3']);
    },2000)
}