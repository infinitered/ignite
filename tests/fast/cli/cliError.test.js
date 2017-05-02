const test = require('ava')
const mockery = require('mockery')
const MockGluegunBuilder = require('./_mockGluegunBuilder')

// fake data
let mockGluegunBuilder = new MockGluegunBuilder()
let printDebug

// turn on mocking
mockery.enable({ warnOnUnregistered: false })

// mock the header and gluegun
const noop = () => {}
mockery.registerMock('gluegun', {
  build: () => mockGluegunBuilder,
  print: {
    info: noop,
    debug: thing => { printDebug = thing }
  }
})

// our cli
const cli = require('../../../src/cli/cli')

test('ignite', async t => {
  const mockGluegunRunContext = {
    plugin: 'fake',
    command: 'fake',
    error: 'hello!'
  }
  const mockRuntime = {
    run: () => mockGluegunRunContext
  }

  mockGluegunBuilder.onCreateRuntime(builderProps => mockRuntime)

  // run version cuz it's easy to get through with minimial side effects
  await cli([null, null, 'version'])

  // the right thing flowed through print.debug
  t.is(printDebug, mockGluegunRunContext.error)
})
