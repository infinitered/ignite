module.exports = (plugin, command, context) => {
  /**
   * Removes the component example.
   */
  function removePluginComponentExample (fileName) {
    const { filesystem, patching, print } = context
    print.info(`    ${print.checkmark} removing component example`)
    // remove file from Components/Examples folder
    filesystem.remove(
      `${process.cwd()}/ignite/Examples/Components/${fileName}`
    )
    // remove reference in usage example screen (if it exists)
    const destinationPath = `${process.cwd()}/ignite/DevScreens/PluginExamplesScreen.js`
    if (filesystem.exists(destinationPath)) {
      patching.replaceInFile(
        destinationPath,
        `import '../Examples/Components/${fileName}`,
        ''
      )
    }
  }

  return removePluginComponentExample
}
