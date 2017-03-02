module.exports = (plugin, command, context) => {
  /**
   * Generates an example for use with the dev screens.
   *
   * @param {string} fileName - The js file to create. (.ejs will be appended to pick up the template.)
   * @param {Object} props - The properties to use for template expansion.
   */
  async function addPluginComponentExample (fileName, props = {}) {
    const { filesystem, patching, ignite, print, template } = context
    const { ignitePluginPath } = ignite
    const config = ignite.loadIgniteConfig()

    // do we want to use examples in the classic format?
    if (config.examples === 'classic') {
      const spinner = print.spin(`▸ adding component example`)

      // generate the file
      const templatePath = ignitePluginPath()
        ? `${ignitePluginPath()}/templates`
        : `templates`
      template.generate({
        directory: templatePath,
        template: `${fileName}.ejs`,
        target: `ignite/Examples/Components/${fileName}`,
        props
      })

      // adds reference to usage example screen (if it exists)
      const destinationPath = `${process.cwd()}/ignite/DevScreens/PluginExamplesScreen.js`
      if (filesystem.exists(destinationPath)) {
        patching.insertInFile(
          destinationPath,
          'import ExamplesRegistry',
          `import '../Examples/Components/${fileName}'`
        )
      }
      spinner.stop()
    }
  }

  return addPluginComponentExample
}
