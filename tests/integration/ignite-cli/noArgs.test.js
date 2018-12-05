const { system } = require('gluegun')
const { contains } = require('ramda')

const IGNITE = './bin/ignite'

test('with no arguments', async () => {
  const result = await system.spawn(`${IGNITE}`)
  expect(result.status).toBe(0)
  expect(contains('https://infinite.red/ignite', result.stdout)).toBe(true)
})
