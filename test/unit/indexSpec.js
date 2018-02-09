const index = require('../../index');
const pullRequest = require('../../src/pullRequest');

it('logs out robot success message on start', () => {
  const robot = { log: jest.fn(), on: jest.fn() }
  index(robot);

  expect(robot.log).toHaveBeenCalledTimes(1)
});

it('handles pull request', () => {
  const robot = { log: jest.fn(), on: jest.fn() }
  index(robot);

  expect(robot.on).toHaveBeenCalledTimes(1)
  const firstArgumentOfFunctionCall = robot.on.mock.calls[0][0];
  expect(firstArgumentOfFunctionCall).toEqual('pull_request');
});
