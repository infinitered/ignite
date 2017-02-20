const test = require('ava')
const mockery = require('mockery')
const MockGluegunBuilder = require('./_mockGluegunBuilder')

// fake data
let mockGluegunBuilder = new MockGluegunBuilder()

// turn on mocking
mockery.enable({ warnOnUnregistered: false })

// mock gluegun
mockery.registerMock('gluegun', {
  build: () => mockGluegunBuilder
})

// our cli
const cli = require('../../src/cli/cli')

test('ignite --version or -v', async t => {
  t.plan(4)

  // our fake runtime
  mockGluegunBuilder.onCreateRuntime(builderProps => ({
    run: runArgs => {
      // gluegun should try to call the version command
      t.deepEqual(runArgs, { rawCommand: 'version' })
      return {}
    }
  }))

  // all the ways to request the version via the non-command method
  await cli([null, null, '--version'])
  await cli([null, null, '--v'])
  await cli([null, null, '-version'])
  await cli([null, null, '-v'])
})
