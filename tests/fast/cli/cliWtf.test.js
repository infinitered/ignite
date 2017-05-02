const test = require('ava')
const mockery = require('mockery')
const MockGluegunBuilder = require('./_mockGluegunBuilder')

let mockGluegunBuilder = new MockGluegunBuilder()
let printWtf

// turn on mocking
mockery.enable({ warnOnUnregistered: false })

// mock the gluegun & printWtf
mockery.registerMock('gluegun', {
  build: () => mockGluegunBuilder,
  printWtf: context => { printWtf = context }
})

// our cli
const cli = require('../../../src/cli/cli')

test('ignite', async t => {
  const mockRuntime = { whatever: 69 }

  // fake the gluegun runtime
  mockGluegunBuilder.onCreateRuntime(builderProps => mockRuntime)

  // enter wtf mode
  await cli([null, null, '--wtf'])

  // printWtf() was called with the run context
  t.deepEqual(printWtf, mockRuntime)
})
