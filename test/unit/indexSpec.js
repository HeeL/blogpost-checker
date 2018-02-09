jest.mock('healthcheck-ping');

const index = require('../../index');
const healthcheckPingMock = require('healthcheck-ping');

function createRobotObject(routeStub) {
  const route = routeStub || (() => ({ use: jest.fn() }));
  return { log: jest.fn(), on: jest.fn(), route };
}

it('logs out robot success message on start', () => {
  const robot = createRobotObject();
  index(robot);

  expect(robot.log).toHaveBeenCalledTimes(1);
});

it('handles pull request', () => {
  const robot = createRobotObject();
  index(robot);

  expect(robot.on).toHaveBeenCalledTimes(1);
  const firstArgumentOfFunctionCall = robot.on.mock.calls[0][0];
  expect(firstArgumentOfFunctionCall).toEqual('pull_request');
});

it('uses healthcheck-ping middleware for exposing healthcheck route', () => {
  const useStub = jest.fn();
  const routeStub = jest.fn().mockReturnValue({ use: useStub });
  const robot = createRobotObject(routeStub);
  healthcheckPingMock.mockImplementation(() => 'foo-bar');
  index(robot);

  expect(robot.route).toHaveBeenCalledTimes(1);
  expect(healthcheckPingMock).toHaveBeenCalledWith('_health');
  expect(useStub).toHaveBeenCalledWith('foo-bar');
});
