const pullRequest = require('../../src/pullRequest');
const axios = require('axios');

const defaultRobot = { log: jest.fn() };

describe('pullRequest handler', () => {
  describe('fetch', () => {
    it('fetches a diff url for action `synchronize`', () => {
      const getStub = jest.fn().mockReturnValue(Promise.resolve());
      axios.get = getStub;
      const diffUrl = 'diff-url';
      const context = {
        payload: {
          action: 'synchronize',
          pull_request: { diff_url: diffUrl },
        },
      };
      pullRequest(defaultRobot, context);

      expect(getStub).toHaveBeenCalledTimes(1);
      expect(getStub).toHaveBeenCalledWith(diffUrl);
    });

    it('DOES NOT fetches actions that are different from `synchronize`', () => {
      axios.get = jest.fn();
      const context = { payload: { action: 'synchronize2' } };
      pullRequest(defaultRobot, context);

      expect(axios.get).toHaveBeenCalledTimes(0);
    });
  });
});
