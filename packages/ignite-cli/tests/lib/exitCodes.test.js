const test = require('ava')
const exitCodes = require('../../src/lib/exitCodes')
const { values, sortBy, identity, pipe, uniq, length } = require('ramda')
const { rangeStep } = require('ramdasauce')

test('we start at 0 and work our way up', t => {
  const actual = pipe(values, sortBy(identity))(exitCodes)
  const expected = rangeStep(1, 0, actual.length - 1)
  t.deepEqual(actual, expected)
})

test('no dupes', t => {
  const actual = pipe(values, uniq, length)(exitCodes)
  const expected = pipe(values, length)(exitCodes)
  t.deepEqual(actual, expected)
})
