const pullRequest = require('./src/pullRequest');

module.exports = (robot) => {
  robot.log('Yay, the app was loaded!');
  robot.on('pull_request', pullRequest);
};
