const test = require('ava')
const extension = require('../../src/extensions/ignite/findIgnitePlugins')

test('has the right interface', t => {
  t.is(typeof extension, 'function')
  const context = { filesystem: { separator: '/' } }
  const findIgnitePlugin = extension(null, null, context)
  t.is(typeof findIgnitePlugin, 'function')
})

test('plugin-less', t => {
  const context = {
    filesystem: { separator: '/' },
    runtime: {
      plugins: []
    }
  }
  const findIgnitePlugin = extension(null, null, context)
  t.deepEqual(findIgnitePlugin(), [])
})

test('skips non-ignite plugins', t => {
  const context = {
    filesystem: { separator: '/' },
    runtime: {
      plugins: [{ name: 'x', directory: 'y' }]
    }
  }
  const findIgnitePlugin = extension(null, null, context)
  t.deepEqual(findIgnitePlugin(), [])
})

test('finds ignite- prefixed plugins', t => {
  const context = {
    filesystem: { separator: '/' },
    runtime: {
      plugins: [{ name: 'ignite-foo', directory: 'y' }]
    }
  }
  const findIgnitePlugin = extension(null, null, context)
  t.deepEqual(findIgnitePlugin(), [{ name: 'ignite-foo', directory: 'y' }])
})

test('finds project plugins', t => {
  const dir = `${process.cwd()}/ignite/plugins/y`
  const context = {
    filesystem: { separator: '/' },
    runtime: {
      plugins: [{ name: 'x', directory: dir }]
    }
  }
  const findIgnitePlugin = extension(null, null, context)
  t.deepEqual(findIgnitePlugin(), [{ name: 'x', directory: dir }])
})
