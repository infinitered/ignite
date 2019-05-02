const exitCodes = require('../../../src/lib/exit-codes').default
const { values, sortBy, identity, pipe, uniq, length } = require('ramda')
const { rangeStep } = require('ramdasauce')

test('we start at 0 and work our way up', () => {
  const actual = pipe(
    values,
    sortBy(identity),
  )(exitCodes)
  const expected = rangeStep(1, 0, actual.length - 1)
  expect(actual).toEqual(expected)
})

test('no dupes', () => {
  const actual = pipe(
    values,
    uniq,
    length,
  )(exitCodes)
  const expected = pipe(
    values,
    length,
  )(exitCodes)
  expect(actual).toEqual(expected)
})
