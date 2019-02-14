import showPluginDirectory from '../lib/show-plugin-directory'

module.exports = {
  alias: ['s'],
  description: 'Searches known Ignite plugins',
  run: showPluginDirectory,
}
