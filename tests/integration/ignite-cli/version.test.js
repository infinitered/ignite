const { system } = require('gluegun')
const jetpack = require('fs-jetpack')
const { trim } = require('ramda')

const IGNITE = './bin/ignite'
const VERSION = jetpack.read('./package.json', 'json').version

test('ignite -v', async () => {
  const result = await system.spawn(`${IGNITE} -v`)
  expect(trim(result.stdout.toString())).toBe(VERSION)
})

test('ignite --v', async () => {
  const result = await system.spawn(`${IGNITE} --v`)
  expect(trim(result.stdout.toString())).toBe(VERSION)
})

test('ignite -version', async () => {
  const result = await system.spawn(`${IGNITE} -version`)
  expect(trim(result.stdout.toString())).toBe(VERSION)
})

test('ignite --version', async () => {
  const result = await system.spawn(`${IGNITE} --version`)
  expect(trim(result.stdout.toString())).toBe(VERSION)
})

test('ignite version', async () => {
  const result = await system.spawn(`${IGNITE} version`)
  expect(trim(result.stdout.toString())).toBe(VERSION)
})
