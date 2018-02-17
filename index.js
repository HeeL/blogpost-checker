const pullRequest = require('./src/pullRequest');

module.exports = robot => robot.on(['pull_request.opened', 'pull_request.synchronize'], pullRequest);
