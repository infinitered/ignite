const { system, filesystem } = require('gluegun')

const IGNITE = filesystem.path(`${__dirname}/../../../bin/ignite`)

beforeEach(() => jest.setTimeout(30000))

test('with no arguments', async () => {
  const result = await system.spawn(`${IGNITE}`)
  expect(result.status).toBe(0)
  expect(result.stdout).toContain('https://infinite.red/ignite')
})
