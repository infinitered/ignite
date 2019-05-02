const { system, filesystem } = require('gluegun')
const tempy = require('tempy')

const IGNITE = filesystem.path(`${__dirname}/../../../bin/ignite`)

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
  expect(result.stdout.toString()).toContain('ignite new <projectName>')
  expect(result.stdout.toString()).toContain('Project name is required')
  expect(result.status).toBe(5)
  done()
})

test(`doesn't allow kebab-case`, async done => {
  const result = await system.spawn(IGNITE + ' new chicken-kebab')
  expect(result.stdout.toString()).toContain('Please use camel case for your project name. Ex: ChickenKebab')
  expect(result.status).toBe(5)
  done()
})

test(`doesn't allow 'ignite'`, async done => {
  const result = await system.spawn(IGNITE + ' new ignite')
  expect(result.stdout.toString()).toContain(
    "Hey...that's my name! Please name your project something other than 'ignite'.",
  )
  expect(result.status).toBe(5)
  done()
})

test('numeric project name', async done => {
  const result = await system.spawn(IGNITE + ' new 123456')
  expect(result.status).toBe(5)
  expect(result.stdout.toString()).toContain('Please use at least one non-numeric')
  done()
})

test('project name starting with a number', async done => {
  const result = await system.spawn(IGNITE + ' new 1foo')
  expect(result.status).toBe(5)
  expect(result.stdout.toString()).toContain(
    'The project name can only contain alphanumeric characters and underscore, but must not begin with a number.',
  )
  done()
})
