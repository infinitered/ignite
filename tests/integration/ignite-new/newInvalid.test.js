const { system } = require('gluegun')
const tempy = require('tempy')
const { contains } = require('ramda')

const IGNITE = `${process.cwd()}/bin/ignite`

jest.setTimeout(30 * 1000)

const originalDir = process.cwd()

beforeEach(() => {
  const tempDir = tempy.directory()
  process.chdir(tempDir)
})

afterEach(() => {
  process.chdir(originalDir)
})

test('requires a name', async done => {
  const result = await system.spawn(IGNITE + ' new')
  expect(result.stdout.toString()).toBe('ignite new <projectName>\n\nProject name is required\n')
  expect(result.status).toBe(5)
  done()
})

test(`doesn't allow kebab-case`, async done => {
  const result = await system.spawn(IGNITE + ' new chicken-kebab')
  expect(result.stdout.toString()).toBe('Please use camel case for your project name. Ex: ChickenKebab\n')
  expect(result.status).toBe(5)
  done()
})

test(`doesn't allow 'ignite'`, async done => {
  const result = await system.spawn(IGNITE + ' new ignite')
  expect(result.stdout.toString()).toBe(
    'Hey...that\'s my name! Please name your project something other than \'ignite\'.\n'
  )
  expect(result.status).toBe(5)
  done()
})

test('numeric project name', async done => {
  const result = await system.spawn(IGNITE + ' new 123456')
  expect(result.status).toBe(5)
  expect(contains('Please use at least one non-numeric', result.stdout.toString())).toBe(true)
  done()
})

test('project name starting with a number', async done => {
  const result = await system.spawn(IGNITE + ' new 1foo')
  expect(result.status).toBe(5)
  expect(
    contains('The project name can only contain alphanumeric characters and underscore, but must not begin with a number.', result.stdout.toString())
  ).toBe(true)
  done()
})
