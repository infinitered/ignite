const packageExtract = require('../../../src/lib/package-extract').default

test('detects npm modules', async () => {
  const actual = packageExtract('something')
  const expected = { name: 'something', scoped: false, version: undefined }
  expect(actual).toEqual(expected)
})

test('detects npm modules with versions', async () => {
  const actual = packageExtract('something@2.0.4-beta.1')
  const expected = { name: 'something', scoped: false, version: '2.0.4-beta.1' }
  expect(actual).toEqual(expected)
})

test('detects scoped npm modules', async () => {
  const actual = packageExtract('something/anything')
  const expected = { name: 'something/anything', scoped: true, version: undefined }
  expect(actual).toEqual(expected)
})

test('detects scoped npm modules with versions', async () => {
  const actual = packageExtract('something/anything@17.3.2')
  const expected = { name: 'something/anything', scoped: true, version: '17.3.2' }
  expect(actual).toEqual(expected)
})

test('detects @-prefixed scoped npm modules', async () => {
  const actual = packageExtract('@something/anything')
  const expected = { name: '@something/anything', scoped: true, version: undefined }
  expect(actual).toEqual(expected)
})

test('detects @-prefixed scoped npm modules with versions', async () => {
  const actual = packageExtract('@something/anything@4.8.2')
  const expected = { name: '@something/anything', scoped: true, version: '4.8.2' }
  expect(actual).toEqual(expected)
})
