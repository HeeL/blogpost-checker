const index = require('../index')

test('logs out success message for robot', () => {
  const robot = { log: jest.fn() }
  index(robot)

  expect(robot.log).toHaveBeenCalledTimes(1)
})
