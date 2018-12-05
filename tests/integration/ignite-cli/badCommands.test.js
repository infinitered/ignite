const { system } = require('gluegun')
const { contains } = require('ramda')

const IGNITE = './bin/ignite'

test('unknown command', async () => {
  const result = await system.spawn(`${IGNITE} OMGWTFBBQ`)
  expect(result.status).toBe(0)
  expect(contains('ignite \'OMGWTFBBQ\' is not a command', result.stdout)).toBe(true)
})

test('unknown emoji command', async () => {
  const result = await system.spawn(`${IGNITE} 💩`)
  expect(result.status).toBe(0)
  expect(contains('ignite \'💩\' is not a command', result.stdout)).toBe(true)
})
