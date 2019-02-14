const detectedChanges = require('../../../src/lib/detected-changes').default

test('empty objects', () => {
  const actual = detectedChanges({}, {})
  const expected = []
  expect(actual).toEqual(expected)
})

test('objects with same keys', () => {
  const actual = detectedChanges({ x: 1 }, { x: 1 })
  const expected = []
  expect(actual).toEqual(expected)
})

test('left side empty', () => {
  const actual = detectedChanges({}, { x: 1 })
  const expected = []
  expect(actual).toEqual(expected)
})

test('right side empty', () => {
  const actual = detectedChanges({ x: 1 }, {})
  const expected = []
  expect(actual).toEqual(expected)
})

test('different keys', () => {
  const actual = detectedChanges({ x: 1 }, { y: 1 })
  const expected = []
  expect(actual).toEqual(expected)
})

test('when the value changes', () => {
  const actual = detectedChanges({ x: 1 }, { x: 2 })
  const expected = ["'x'"]
  expect(actual).toEqual(expected)
})
