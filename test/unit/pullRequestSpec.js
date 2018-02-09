const pullRequest = require('../../src/pullRequest');
const axios = require('axios');

const defaultRobot = { log: jest.fn() };

it('fetches a diff url for actions `created`', () => {
    const getStub = jest.fn().mockReturnValue(Promise.resolve());
    axios.get = getStub;
    const diffUrl = 'diff-url';
    const context = {
        action: 'created',
        payload: { pull_request: { diff_url: diffUrl } }
    };
    pullRequest(context, defaultRobot);

    expect(getStub).toHaveBeenCalledTimes(1);
    expect(getStub).toHaveBeenCalledWith(diffUrl);
});

it('fetches a diff url for actions `edited`', () => {
    const getStub = jest.fn().mockReturnValue(Promise.resolve());
    axios.get = getStub;
    const diffUrl = 'foo-bar-url';
    const context = {
        action: 'edited',
        payload: { pull_request: { diff_url: diffUrl } }
    };
    pullRequest(context, defaultRobot);

    expect(getStub).toHaveBeenCalledTimes(1);
    expect(getStub).toHaveBeenCalledWith(diffUrl);
});

it('DOES NOT fetches actions that are different from `created` or `edited`', () => {
    axios.get = jest.fn();
    const context = { action: 'created2' };
    pullRequest(context, defaultRobot);

    expect(axios.get).toHaveBeenCalledTimes(0);
});
