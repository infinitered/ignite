const { system, filesystem } = require('gluegun')
const tempy = require('tempy')
const stripANSI = require('strip-ansi')

const IGNITE = 'node ' + filesystem.path(`${__dirname}/../../../bin/ignite`)

const PLUGIN_NAME = 'foo'

jest.setTimeout(10 * 60 * 1000)

const originalDir = process.cwd()
const opts = { stdio: 'inherit' }

beforeEach(() => {
  const tempDir = tempy.directory()
  process.chdir(tempDir)
})

afterEach(() => {
  process.chdir(originalDir)
})

test('spins up an Ignite plugin with min options and performs various checks', async done => {
  const resultANSI = await system.run(`${IGNITE} plugin new ${PLUGIN_NAME} --min`, opts)
  const result = stripANSI(resultANSI)

  expect(result).toContain(`Creating new plugin: ignite-${PLUGIN_NAME}`)

  process.chdir(`./ignite-${PLUGIN_NAME}`)
  const dirs = filesystem.subdirectories('.')
  expect(dirs).toContain('test')
  expect(dirs).not.toContain('boilerplate')
  expect(dirs).not.toContain('commands')
  expect(dirs).not.toContain('templates')
  expect(filesystem.exists('package.json')).toBeTruthy()
  expect(filesystem.exists('plugin.js')).toBeTruthy()

  done()
})

test('spins up an Ignite plugin with max options and performs various checks', async done => {
  const resultANSI = await system.run(`${IGNITE} plugin new ${PLUGIN_NAME} --max`, opts)
  const result = stripANSI(resultANSI)

  expect(result).toContain(`Creating new plugin: ignite-${PLUGIN_NAME}`)

  process.chdir(`./ignite-${PLUGIN_NAME}`)
  const dirs = filesystem.subdirectories('.')
  expect(dirs).toContain('test')
  expect(dirs).toContain('boilerplate')
  expect(dirs).toContain('commands')
  expect(dirs).toContain('templates')
  expect(filesystem.exists('package.json')).toBeTruthy()
  expect(filesystem.exists('plugin.js')).toBeTruthy()

  await system.run(`yarn`)
  await system.run(`yarn format`)
  const testResults = await system.run(`yarn test`)
  expect(testResults).toContain(`4 tests passed`)

  done()
})
