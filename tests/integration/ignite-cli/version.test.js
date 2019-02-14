const { system, filesystem } = require('gluegun')

const IGNITE = filesystem.path(`${__dirname}/../../../bin/ignite`)
const VERSION = filesystem.read('./package.json', 'json').version

test('ignite -v', async () => {
  const result = await system.spawn(`${IGNITE} -v`)
  expect(result.stdout.toString()).toContain(VERSION)
})

test('ignite --v', async () => {
  const result = await system.spawn(`${IGNITE} --v`)
  expect(result.stdout.toString()).toContain(VERSION)
})

test('ignite -version', async () => {
  const result = await system.spawn(`${IGNITE} -version`)
  expect(result.stdout.toString()).toContain(VERSION)
})

test('ignite --version', async () => {
  const result = await system.spawn(`${IGNITE} --version`)
  expect(result.stdout.toString()).toContain(VERSION)
})

test('ignite version', async () => {
  const result = await system.spawn(`${IGNITE} version`)
  expect(result.stdout.toString()).toContain(VERSION)
})
