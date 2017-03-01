const test = require('ava')
const execa = require('execa')
const jetpack = require('fs-jetpack')
const path = require('path')

const IGNITE = '../../../ignite-cli/bin/ignite'
const VERSION = jetpack.read('../ignite-cli/package.json', 'json').version
const RUN_DIR = 'out/new'
const BACK_DIR = '../..'
const APP = 'IgniteApp'
const PACKAGE_JSON = `${APP}/package.json`
const IGNITE_JSON = `${APP}/ignite/ignite.json`

// create a fresh ignited app with --min
test.before(async () => {
  jetpack.remove(RUN_DIR)
  jetpack.dir(RUN_DIR)
  process.chdir(RUN_DIR)
  await execa(IGNITE, ['new', APP, '--min'], {
    env: {
      IGNITE_PLUGIN_PATH: path.resolve(BACK_DIR, '..')
    }
  })
})

// always clean up
test.after.always(() => {
  process.chdir(BACK_DIR)
  jetpack.remove(RUN_DIR)
})

test('app directory', async t => {
  t.is(jetpack.exists(`${APP}/node_modules/react-native`), 'dir')
})

test('app tests', async t => {
  process.chdir(APP)
  try {
    const testResult = await execa('npm', ['test'])
    t.is(testResult.code, 0)
    t.is(testResult.failed, false)
  } catch (e) {
    t.fail(`app tests failed: ${e.message}`)
  } finally {
    process.chdir('..')
  }
})

test('ignite plugins', async t => {
  const ignitePlugins = jetpack
    .cwd(`${APP}/node_modules`)
    .find({ matching: 'ignite-*', directories: true, recursive: false })

  t.deepEqual(ignitePlugins, ['ignite-basic-generators'])
})

test('package.json', async t => {
  t.is(jetpack.exists(PACKAGE_JSON), 'file')
  const pkgJson = jetpack.read(PACKAGE_JSON, 'json')
  t.truthy(pkgJson)
  t.is(pkgJson.name, APP)
})

test('ignite/ignite.json', async t => {
  const actual = jetpack.read(IGNITE_JSON, 'json')
  const expected = {
    createdWith: VERSION,
    examples: 'none',
    generators: {
      component: 'ignite-basic-generators',
      container: 'ignite-basic-generators',
      listview: 'ignite-basic-generators',
      redux: 'ignite-basic-generators',
      saga: 'ignite-basic-generators',
      screen: 'ignite-basic-generators'
    }
  }
  t.deepEqual(actual, expected)
})
