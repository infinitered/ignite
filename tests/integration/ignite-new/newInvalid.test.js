const test = require('ava')
const execa = require('execa')
const jetpack = require('fs-jetpack')

const RUN_DIR = 'out/new'
const BACK_DIR = '../..'
const IGNITE = '../../bin/ignite'

test.before(() => {
  jetpack.dir(RUN_DIR)
  process.chdir(RUN_DIR)
})

test.after.always(() => {
  process.chdir(BACK_DIR)
  jetpack.remove(RUN_DIR)
})

test('requires a name', async t => {
  try {
    await execa(IGNITE, ['new'])
    t.fail()
  } catch (err) {
    t.is(err.stdout, 'ignite new <projectName>\n\nProject name is required\n')
    t.is(err.code, 5)
  }
})

test(`doesn't allow kebab-case`, async t => {
  try {
    await execa(IGNITE, ['new', 'chicken-kebab'])
    t.fail()
  } catch (err) {
    t.is(err.stdout, 'Please use camel case for your project name. Ex: ChickenKebab\n')
    t.is(err.code, 5)
  }
})

