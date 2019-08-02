const { system, filesystem } = require('gluegun')

const IGNITE = filesystem.path(`${__dirname}/../../../bin/ignite`)

test('unknown command', async done => {
  const result = await system.spawn(`${IGNITE} OMGWTFBBQ`)
  expect(result.status).toBe(0)
  expect(result.stdout.toString()).toContain("ignite 'OMGWTFBBQ' is not a command")
  done()
})

test('unknown emoji command', async done => {
  const result = await system.spawn(`${IGNITE} 💩`)
  expect(result.status).toBe(0)
  expect(result.stdout.toString()).toContain("ignite '💩' is not a command")
  done()
})
