const axios = require('axios');
const setPullRequestState = require('./setPullRequestState');

module.exports = async (robot, context) => {
  if (context.payload.action === 'synchronize') {
    axios.get(context.payload.pull_request.diff_url)
      .then(() => {
        const success = true;
        setPullRequestState(context, success);
      });
  }
};
