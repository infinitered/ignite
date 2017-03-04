module.exports = (plugin, command, context) => {
  /**
   * Remove example screens from dev screens.
   *
   * @param {Array} files - Array of Screens and properties
   *
   * example:
   * removeScreenExamples([
   *   {screen: 'Row.js', ancillary: ['file1', 'file2']},
   *   {screen: 'Grid.js', ancillary: ['file']},
   *   {screen: 'Section.js', ancillary: ['file']},
   * ])
   */
  // DEPRECATED as of 3/2/17 as part of Ignite 2 Beta (https://github.com/infinitered/ignite/issues/636)
  async function removeScreenExamples (files) {
    const { ignite, print } = context
    print.warning('DEPRECATION_WARNING: Heads up! `ignite.removeScreenExamples` is deprecated. Please use `ignite.removePluginScreenExamples` instead.')
    ignite.removePluginScreenExamples(files)
  }

  return removeScreenExamples
}
