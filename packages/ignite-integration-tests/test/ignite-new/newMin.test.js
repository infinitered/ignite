const test = require('ava')
const execa = require('execa')
const jetpack = require('fs-jetpack')

const VERSION = jetpack.read('../../ignite-cli/package.json', 'json').version
const RUN_DIR = 'out/new'
const BACK_DIR = '../..'
const IGNITE = '/usr/local/bin/ignite'
const APP = 'IgniteApp'
const PACKAGE_JSON = `${APP}/package.json`
const IGNITE_JSON = `${APP}/ignite/ignite.json`

// create a fresh ignited app with --min
test.before(async () => {
  // jetpack.remove(RUN_DIR)
  // jetpack.dir(RUN_DIR)
  // process.chdir(RUN_DIR)
  // jetpack.write('package.json', { name: 'integration-test', version: '1.0.0' })
  // await execa(IGNITE, ['new', APP, '--min']).stdout.pipe(process.stdout)
  // console.dir(r)
})

// always clean up
test.after.always(() => {
  process.chdir(BACK_DIR)
  // jetpack.remove(RUN_DIR)
})

test.only('app directory', async t => {
  jetpack.remove(RUN_DIR)
  jetpack.dir(RUN_DIR)
  process.chdir(RUN_DIR)
  jetpack.write('package.json', { name: 'integration-test', version: '1.0.0' })
  t.is(jetpack.exists('package.json'), 'file')
  const r = await execa(IGNITE, ['new', APP, '--min'])
  t.is(r, true)
  // t.is(jetpack.exists(`${APP}/node_modules/react-native`), 'dir')
})

test('ignite plugins', async t => {
  const ignitePlugins = jetpack
    .cwd(`${APP}/node_modules`)
    .find({ matching: 'ignite-*', directories: true, recursive: false })

  t.deepEqual(ignitePlugins, ['ignite-basic-generators', 'ignite-minimal-app-template'])
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
    'createdWith': VERSION,
    'generators': {
      'component': 'ignite-basic-generators',
      'container': 'ignite-basic-generators',
      'listview': 'ignite-basic-generators',
      'redux': 'ignite-basic-generators',
      'saga': 'ignite-basic-generators',
      'screen': 'ignite-basic-generators'
    }
  }
  t.deepEqual(actual, expected)
})
