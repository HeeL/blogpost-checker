const axios = require('axios');
const R = require('ramda');
const setPullRequestState = require('./setPullRequestState');
const isPublishDateValid = require('./isPublishDateValid');

module.exports = async (robot, context) => {
  if (context.payload.action === 'synchronize') {
    axios.get(context.payload.pull_request.diff_url)
      .then(R.prop('data'))
      .then(isPublishDateValid)
      .then(setPullRequestState.bind(null, context));
  }
};
