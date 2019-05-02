const extension = require('../../../src/extensions/ignite/find-ignite-plugins').default
const path = require('path')

test('has the right interface', () => {
  expect(typeof extension).toBe('function')
  const toolbox = { filesystem: { separator: path.sep } }
  const findIgnitePlugin = extension(toolbox)
  expect(typeof findIgnitePlugin).toBe('function')
})

test('plugin-less', () => {
  const toolbox = {
    filesystem: { separator: path.sep },
    runtime: {
      plugins: [],
    },
  }
  const findIgnitePlugin = extension(toolbox)
  expect(findIgnitePlugin()).toEqual([])
})

test('skips non-ignite plugins', () => {
  const toolbox = {
    filesystem: { separator: path.sep },
    runtime: {
      plugins: [{ name: 'x', directory: 'y' }],
    },
  }
  const findIgnitePlugin = extension(toolbox)
  expect(findIgnitePlugin()).toEqual([])
})

test('finds ignite- prefixed plugins', () => {
  const toolbox = {
    filesystem: { separator: path.sep },
    runtime: {
      plugins: [{ name: 'ignite-foo', directory: 'y' }],
    },
  }
  const findIgnitePlugin = extension(toolbox)
  expect(findIgnitePlugin()).toEqual([{ name: 'ignite-foo', directory: 'y' }])
})

test('finds project plugins', () => {
  const dir = `${process.cwd()}${path.sep}ignite${path.sep}plugins${path.sep}y`
  const toolbox = {
    filesystem: { separator: path.sep },
    runtime: {
      plugins: [{ name: 'x', directory: dir }],
    },
  }
  const findIgnitePlugin = extension(toolbox)
  expect(findIgnitePlugin()).toEqual([{ name: 'x', directory: dir }])
})
