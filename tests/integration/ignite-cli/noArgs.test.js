const { system, filesystem } = require('gluegun')

const IGNITE = filesystem.path(`${__dirname}/../../../bin/ignite`)

// shouldn't take longer than 2 seconds
beforeEach(() => jest.setTimeout(2000))

test('with no arguments', async () => {
  const result = await system.spawn(`${IGNITE}`)
  expect(result.status).toBe(0)
  expect(result.stdout).toContain('https://infinite.red/ignite')
})
