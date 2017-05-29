const test = require('ava')
const execa = require('execa')
const { contains } = require('ramda')

const IGNITE = './bin/ignite'

test('with no arguments', async t => {
  const result = await execa(IGNITE)
  t.is(result.code, 0)
  t.false(result.failed)
  t.is(result.stderr, '')
  t.true(contains('https://infinite.red/ignite', result.stdout))
})
