const test = require('ava')
const execa = require('execa')
const { contains } = require('ramda')

const IGNITE = './bin/ignite'

test('unknown command', async t => {
  const result = await execa(IGNITE, ['OMGWTFBBQ'])
  t.is(result.code, 0)
  t.true(contains('ignite \'OMGWTFBBQ\' is not a command', result.stdout))
})

test('unknown emoji command', async t => {
  const result = await execa(IGNITE, ['💩'])
  t.is(result.code, 0)
  t.true(contains('ignite \'💩\' is not a command', result.stdout))
})
