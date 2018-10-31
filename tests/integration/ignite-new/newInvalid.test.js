const test = require('ava')
const execa = require('execa')
const tempy = require('tempy')
const { contains } = require('ramda')

const IGNITE = `${process.cwd()}/bin/ignite`

test.before(t => {
  const tempDir = tempy.directory()
  process.chdir(tempDir)
})

test('requires a name', async (t) => {
  try {
    const result = await execa(IGNITE, ['new'])
    t.fail('Blank name did not return an error.')
  } catch (err) {
    t.is(err.stdout, 'ignite new <projectName>\n\nProject name is required\n')
    t.is(err.code, 5)
  }
})

test(`doesn't allow kebab-case`, async (t) => {
  try {
    await execa(IGNITE, ['new', 'chicken-kebab'])
    t.fail('Kebab-case name did not return an error.')
  } catch (err) {
    t.is(err.stdout, 'Please use camel case for your project name. Ex: ChickenKebab\n')
    t.is(err.code, 5)
  }
})

test(`doesn't allow 'ignite'`, async (t) => {
  try {
    await execa(IGNITE, ['new', 'ignite'])
    t.fail('ignite name did not return an error.')
  } catch (err) {
    t.is(err.stdout, 'Hey...that\'s my name! Please name your project something other than \'ignite\'.\n')
    t.is(err.code, 5)
  }
})

test('numeric project name', async (t) => {
  try {
    await execa(IGNITE, ['new', '123456'])
    t.fail('Numeric-only name did not return an error.')
  } catch (err) {
    t.is(err.code, 5)
    t.true(contains('Please use at least one non-numeric', err.stdout))
  }
})

test('project name starting with a number', async (t) => {
  try {
    await execa(IGNITE, ['new', '1foo'])
    t.fail('Project name starting with a number did not fail.')
  } catch (err) {
    t.is(err.code, 5)
    t.true(contains('The project name can only contain alphanumeric characters and underscore, but must not begin with a number.', err.stdout))
  }
})
