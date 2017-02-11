const test = require('ava')
const detectedChanges = require('../../src/lib/detectedChanges')

test('empty objects', t => {
  const actual = detectedChanges({}, {})
  const expected = []
  t.deepEqual(actual, expected)
})

test('objects with same keys', t => {
  const actual = detectedChanges({x: 1}, {x: 1})
  const expected = []
  t.deepEqual(actual, expected)
})

test('left side empty', t => {
  const actual = detectedChanges({}, {x: 1})
  const expected = []
  t.deepEqual(actual, expected)
})

test('right side empty', t => {
  const actual = detectedChanges({x: 1}, {})
  const expected = []
  t.deepEqual(actual, expected)
})

test('different keys', t => {
  const actual = detectedChanges({x: 1}, {y: 1})
  const expected = []
  t.deepEqual(actual, expected)
})

test('when the value changes', t => {
  const actual = detectedChanges({x: 1}, {x: 2})
  const expected = ['\'x\'']
  t.deepEqual(actual, expected)
})
