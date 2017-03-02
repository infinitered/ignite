module.exports = (plugin, command, context) => {
  /**
   * Removes the component example.
   */
  // DEPRECATED as of 3/2/17 as part of Ignite 2 Beta (https://github.com/infinitered/ignite/issues/636)
  function removeComponentExample (fileName) {
    const { filesystem, patching, print, ignite } = context
    print.warning('DEPRECATION_WARNING: Heads up! `ignite.removeComponentExample` is deprecated. Please use `ignite.removePluginComponentExample` instead.')
    ignite.removePluginComponentExample(fileName)
  }

  return removeComponentExample
}
