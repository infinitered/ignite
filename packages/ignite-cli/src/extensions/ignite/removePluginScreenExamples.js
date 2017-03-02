const { flatten, replace, reduce, map, takeLast, split } = require('ramda')
const path = require('path')

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
  async function removePluginScreenExamples (files) {
    const { filesystem, patching, ignite, print } = context
    const { ignitePluginPath } = ignite

    const config = ignite.loadIgniteConfig()

    // consider this being part of context.ignite
    const pluginName = takeLast(1, split(path.sep, ignitePluginPath()))[0]

    // currently only supporting 1 form of examples
    if (config.examples === 'classic') {
      const spinner = print.spin(`▸ removing screen examples`)

      // merge and flatten all dem files yo.
      let allFiles = reduce(
        (acc, v) => {
          acc.push(v.screen)
          if (v.ancillary) acc.push(v.ancillary)
          return flatten(acc)
        },
        [],
        files
      )

      // delete all files that were inserted
      map(
        fileName => {
          filesystem.removeAsync(
            `ignite/Examples/Containers/${pluginName}/${fileName}`
          )
        },
        allFiles
      )

      // delete screen, route, and buttons in PluginExamples (if exists)
      const destinationPath = `${process.cwd()}/ignite/DevScreens/PluginExamplesScreen.js`
      map(
        file => {
          // turn things like "examples/This File-Example.js" into "ThisFileExample"
          // for decent component names
          const exampleFileName = takeLast(1, split(path.sep, file.screen))[0]
          const componentName = replace(/.js|\s|-/g, '', exampleFileName)

          if (filesystem.exists(destinationPath)) {
            // remove screen import
            patching.replaceInFile(
              destinationPath,
              `import ${componentName} from '../Examples/Containers/${pluginName}/${file.screen}'`,
              ''
            )

            // remove screen route
            patching.replaceInFile(
              destinationPath,
              `  ${componentName}: {screen: ${componentName}, navigationOptions: {header: {visible: true}}},`,
              ''
            )

            // remove launch button
            patching.replaceInFile(
              destinationPath,
              `<RoundedButton.+${componentName}.+[\\s\\S].+\\s*<\\/RoundedButton>`,
              ''
            )
          } // if
        },
        files
      )

      spinner.stop()
    }
  }

  return removePluginScreenExamples
}
