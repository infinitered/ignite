const filesystem = require('fs-jetpack')
const detectInstall = require('../../../src/lib/detectInstall')
const path = require('path')

test('detects npm modules', async () => {
  const actual = detectInstall({
    filesystem,
    parameters: { second: 'something' }
  })
  const expected = { moduleName: 'ignite-something', type: 'npm', version: null }
  expect(actual).toEqual(expected)
})

test("won't double prefix", async () => {
  const actual = detectInstall({
    filesystem,
    parameters: { second: 'ignite-something' }
  })
  const expected = { moduleName: 'ignite-something', type: 'npm', version: null }
  expect(actual).toEqual(expected)
})

test('removes @ version', async () => {
  const actual = detectInstall({
    filesystem,
    parameters: { second: 'ignite-something@">=2.0.0"' }
  })
  const expected = { moduleName: 'ignite-something', type: 'npm', version: '">=2.0.0"' }
  expect(actual).toEqual(expected)
})

test('detects plugins from a full path', async () => {
  const moduleName = 'ignite-valid-plugin'
  const directory = path.resolve(`${__dirname}/../fixtures/${moduleName}`)
  const actual = detectInstall({
    filesystem,
    parameters: { second: directory }
  })
  const expected = { type: 'directory', moduleName, directory }
  expect(actual).toEqual(expected)
})

test('detects plugins from a relative path', async () => {
  const moduleName = 'ignite-valid-plugin'
  const directory = `${process.cwd()}${path.sep}tests${path.sep}fast${path.sep}fixtures${path.sep}${moduleName}`
  const actual = detectInstall({
    filesystem,
    parameters: { second: directory }
  })
  const expected = { type: 'directory', moduleName, directory }
  expect(actual).toEqual(expected)
})

test('detects invalid plugin directories', async () => {
  const moduleName = 'ignite-invalid-plugin'
  const actual = detectInstall({
    filesystem,
    parameters: { second: moduleName }
  })
  const expected = { type: 'npm', moduleName, version: null }
  expect(actual).toEqual(expected)
})

