const axios = require('axios');

module.exports = async (context, robot) => {
    if (['edited', 'created'].includes(context.action)) {
        axios.get(context.payload.pull_request.diff_url);
    }
};
  