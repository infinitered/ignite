const test = require('ava')
const mockery = require('mockery')
const { identity, join, indexOf } = require('ramda')

// turn on mocking
mockery.enable({ warnOnUnregistered: false })

// mock the printing that is done in header
mockery.registerMock('gluegun', {
  print: {
    info: text => infos.push(text),
    colors: { red: identity, yellow: identity }
  }
})

// now we can bring in header
const header = require('../../src/brand/header')

// our mock will be pushing print statements here
let infos

// clear before running
test.before(() => { infos = [] })

test('contains our URL', t => {
  header()
  const fullText = join('', infos)
  t.not(-1, indexOf('https://infinite.red/ignite', fullText))
})
