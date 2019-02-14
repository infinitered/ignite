import showPluginDirectory from '../lib/show-plugin-directory'

module.exports = {
  alias: ['ls'],
  description: 'Lists known Ignite plugins.',
  run: showPluginDirectory,
}
