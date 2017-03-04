module.exports = (plugin, command, context) => {
  /**
   * Generates example screens for in dev screens.
   *
   * @param {Array} files - Array of Screens and properties
   * @param {Object} props - The properties to use for template expansion.
   *
   * example:
   * addScreenExamples([
   *   {title: 'Row Example', screen: 'Row.js', ancillary: ['file1', 'file2']},
   *   {title: 'Grid Example', screen: 'Grid.js', ancillary: ['file']},
   *   {title: 'Section Example', screen: 'Section.js', ancillary: ['file']},
   * ])
   */
  // DEPRECATED as of 3/2/17 as part of Ignite 2 Beta (https://github.com/infinitered/ignite/issues/636)
  async function addScreenExamples (files, props = {}) {
    const { ignite, print } = context
    print.warning('DEPRECATION_WARNING: Heads up! `ignite.addScreenExamples` is deprecated. Please use `ignite.addPluginScreenExamples` instead.')
    ignite.addPluginScreenExamples(files, props)
  }

  return addScreenExamples
}
