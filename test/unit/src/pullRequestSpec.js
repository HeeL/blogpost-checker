const pullRequest = require('../../../src/pullRequest');
const axios = require('axios');

const createContext = (action, diffUrl = '') => ({
  payload: {
    action,
    pull_request: {
      diff_url: diffUrl,
      head: { sha: '' }
    },
  },
  repo: () => {},
  github: { repos: { createStatus: () => {} } }
});

describe('pullRequest handler', () => {
  describe('fetch', () => {
    it('fetches a diff url`', () => {
      const getStub = jest.fn().mockReturnValue(Promise.resolve({ data: '' }));
      axios.get = getStub;
      const diffUrl = 'diff-url';
      const context = createContext('synchronize', diffUrl);
      pullRequest(context);

      expect(getStub).toHaveBeenCalledTimes(1);
      expect(getStub).toHaveBeenCalledWith(diffUrl);
    });
  });
});
