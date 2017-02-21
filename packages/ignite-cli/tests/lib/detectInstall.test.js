const test = require('ava')
const filesystem = require('fs-jetpack')
const detectInstall = require('../../src/lib/detectInstall')
const path = require('path')

test('detects npm modules', async t => {
  const actual = detectInstall({
    filesystem,
    parameters: { second: 'something' }
  })
  const expected = { moduleName: 'ignite-something', type: 'npm' }
  t.deepEqual(actual, expected)
})

test('won\'t double prefix', async t => {
  const actual = detectInstall({
    filesystem,
    parameters: { second: 'ignite-something' }
  })
  const expected = { moduleName: 'ignite-something', type: 'npm' }
  t.deepEqual(actual, expected)
})

test('detects plugins from a full path', async t => {
  const moduleName = 'ignite-valid-plugin'
  const directory = path.resolve(`${__dirname}/../fixtures/${moduleName}`)
  const actual = detectInstall({
    filesystem,
    parameters: { second: directory }
  })
  const expected = { type: 'directory', moduleName, directory }
  t.deepEqual(actual, expected)
})

test('detects plugins from a relative path', async t => {
  const moduleName = 'ignite-valid-plugin'
  const directory = `tests/fixtures/${moduleName}`
  const actual = detectInstall({
    filesystem,
    parameters: { second: directory }
  })
  const expected = { type: 'directory', moduleName, directory }
  t.deepEqual(actual, expected)
})

test('detects invalid plugin directories', async t => {
  const moduleName = 'ignite-invalid-plugin'
  const actual = detectInstall({
    filesystem,
    parameters: { second: moduleName }
  })
  const expected = { type: 'npm', moduleName }
  t.deepEqual(actual, expected)
})
