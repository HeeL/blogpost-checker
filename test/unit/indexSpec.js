const index = require('../../index');
const pullRequestHandler = require('../../src/pullRequest');

it('handles pull request open and synchronize', () => {
  const expectedListeners = ['pull_request.opened', 'pull_request.synchronize'];
  const robot = { on: jest.fn() };
  index(robot);

  expect(robot.on).toHaveBeenCalledTimes(1);
  expect(robot.on).toHaveBeenCalledWith(expectedListeners, pullRequestHandler);
});
