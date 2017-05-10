const test = require('ava')
const filesystem = require('fs-jetpack')
const detectInstall = require('../../../src/lib/detectInstall')
const path = require('path')
const mockFs = require('mock-fs')

// unhook the fs mocks
test.afterEach.always(mockFs.restore)

test('detects npm modules', async t => {
  const actual = detectInstall({
    filesystem,
    parameters: { second: 'something' }
  })
  const expected = { moduleName: 'ignite-something', type: 'npm' }
  t.deepEqual(actual, expected)
})

test("won't double prefix", async t => {
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
  const directory = `${process.cwd()}/tests/fast/fixtures/${moduleName}`
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

/**
 * 🚨 SUPER DANGER SAUCE 🚨
 *
 * This test has a serial function on it.  That means, AVA will run this first
 * before the other tests.  The reason why is because mockFs changes the environment.
 * And the other test expects the environment to be sane.
 *
 * Both tests are legit, it's just they can't be run in parallel.
 *
 * Slow clap standing ovation to AVA for having test.serial!
 */
test.serial('plugins from a relative directory that is an override', async t => {
  const moduleName = 'ignite-some-plugin'

  // pretend we have a directory with a plugin
  mockFs({
    'override-land': {
      'ignite-some-plugin': {
        'package.json': `{ "name": "ignite-some-plugin" }`
      }
    }
  })

  // we're looking for the override version
  const expected = {
    type: 'directory',
    moduleName,
    override: true,
    directory: 'override-land/ignite-some-plugin'
  }

  // detect
  const actual = detectInstall({
    filesystem,
    parameters: { second: moduleName },
    ignite: { pluginOverrides: ['override-land'] }
  })

  t.deepEqual(actual, expected)
})

test('plugins from a absolute directory that is an override', async t => {
  const fixturesPath = path.resolve(`${__dirname}/../fixtures`)

  // we're looking for the override version
  const expected = {
    type: 'directory',
    moduleName: 'ignite-valid-plugin',
    override: true,
    directory: `${fixturesPath}/ignite-valid-plugin`
  }

  // detect
  const actual = detectInstall({
    filesystem,
    parameters: { second: 'valid-plugin' },
    ignite: { pluginOverrides: [fixturesPath] }
  })

  t.deepEqual(actual, expected)
})
