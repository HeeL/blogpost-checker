const pullRequest = require('./src/pullRequest');
const healthcheckPing = require('healthcheck-ping');

module.exports = (robot) => {
  robot.log('Yay, the app was loaded!');

  const app = robot.route();
  app.use(healthcheckPing('_health'));

  robot.on(['pull_request.opened', 'pull_request.synchronize'], pullRequest);
};
