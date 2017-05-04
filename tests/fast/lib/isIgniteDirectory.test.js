const test = require('ava')
const isIgniteDirectory = require('../../../src/lib/isIgniteDirectory')
const mockFs = require('mock-fs')

// unhook the fs mocks
test.afterEach.always(mockFs.restore)

test('bad inputs', t => {
  t.false(isIgniteDirectory())
  t.false(isIgniteDirectory(null))
  t.false(isIgniteDirectory(1))
  t.false(isIgniteDirectory([]))
  t.false(isIgniteDirectory({}))
  t.false(isIgniteDirectory(true))
})

test('missing directory', t => {
  t.false(isIgniteDirectory('omgnothing'))
})

test('invalid folder structure', t => {
  mockFs({
    'missingfile': { 'ignite': { } },
    'blank': { 'ignite': { 'ignite.json': '' } },
    'string': { 'ignite': { 'ignite.json': 'x' } },
    'empty': { 'ignite': { 'ignite.json': '' } },
    'array': { 'ignite': { 'ignite.json': [] } },
    'number': { 'ignite': { 'ignite.json': 4 } }
  })
  t.false(isIgniteDirectory('missingfile'))
  t.false(isIgniteDirectory('blank'))
  t.false(isIgniteDirectory('string'))
  t.false(isIgniteDirectory('empty'))
  t.false(isIgniteDirectory('array'))
  t.false(isIgniteDirectory('number'))
})

// but this one right here works is legit
test('empty object ignite.json', t => {
  mockFs({ 'ignite': { 'ignite.json': '{}' } })
  t.true(isIgniteDirectory('.'))
})
