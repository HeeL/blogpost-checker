const index = require('../index');
const pullRequest = require('../src/pullRequest');

it('logs out robot success message on start', () => {
  const robot = { log: jest.fn(), on: jest.fn() }
  index(robot);

  expect(robot.log).toHaveBeenCalledTimes(1)
});

it('handles pull request', () => {
  const robot = { log: jest.fn(), on: jest.fn() }
  index(robot);

  expect(robot.on).toHaveBeenCalledTimes(1)
  expect(robot.on).toHaveBeenCalledWith('pull_request', pullRequest);
});
