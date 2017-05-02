const test = require('ava')
const attach = require('../../../src/extensions/ignite.js')

test('has the right interface', t => {
  t.is(typeof attach, 'function')
  const plugin = null
  const command = null
  const context = {
    print: {},
    parameters: {
      options: {}
    },
    system: {
      which: () => true
    },
    filesystem: {
      separator: '/'
    }
  }
  const extension = attach(plugin, command, context)

  t.is(typeof extension.ignitePluginPath, 'function')
  t.is(typeof extension.setIgnitePluginPath, 'function')
  t.is(typeof extension.useYarn, 'boolean')
  t.is(typeof extension.findIgnitePlugins, 'function')
  t.is(typeof extension.addModule, 'function')
  t.is(typeof extension.removeModule, 'function')
  t.is(typeof extension.copyBatch, 'function')
  t.is(typeof extension.addPluginComponentExample, 'function')
  t.is(typeof extension.addPluginScreenExamples, 'function')
  t.is(typeof extension.removePluginComponentExample, 'function')
  t.is(typeof extension.removePluginScreenExamples, 'function')
  t.is(typeof extension.loadIgniteConfig, 'function')
  t.is(typeof extension.saveIgniteConfig, 'function')
  t.is(typeof extension.setIgniteConfig, 'function')
  t.is(typeof extension.removeIgniteConfig, 'function')
  t.is(typeof extension.setDebugConfig, 'function')
  t.is(typeof extension.removeDebugConfig, 'function')
  t.is(typeof extension.patchInFile, 'function')
  t.is(typeof extension.generate, 'function')
  t.is(typeof extension.log, 'function')
  t.is(typeof extension.version, 'string')
})
