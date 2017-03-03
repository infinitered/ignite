const test = require('ava')
const mockery = require('mockery')
const MockGluegunBuilder = require('./_mockGluegunBuilder')

// fake data
let mockGluegunBuilder = new MockGluegunBuilder()
let printCommands
let printHeader

// turn on mocking
mockery.enable({ warnOnUnregistered: false })

// mock the header and gluegun
const noop = () => {}
mockery.registerMock('../brand/header', () => { printHeader = true })
mockery.registerMock('gluegun', {
  build: () => mockGluegunBuilder,
  printCommands: context => { printCommands = context },
  print: { info: noop, debug: noop, colors: { magenta: noop } }
})

// our cli
const cli = require('../../src/cli/cli')

test('ignite', async t => {
  const mockGluegunRunContext = {}
  const mockRuntime = { run: () => mockGluegunRunContext }

  // fake the gluegun runtime
  mockGluegunBuilder.onCreateRuntime(builderProps => mockRuntime)

  // yesterday you said tomorrow!
  await cli([null, null, ''])

  // printCommands() was called with the run context
  t.deepEqual(printCommands, mockGluegunRunContext)

  // we printed the header
  t.truthy(printHeader)
})
