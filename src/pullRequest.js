const axios = require('axios');

module.exports = async (robot, context) => {
  if (context.payload.action === 'synchronize') {
    axios.get(context.payload.pull_request.diff_url)
      .then(robot.log);
  }
};
