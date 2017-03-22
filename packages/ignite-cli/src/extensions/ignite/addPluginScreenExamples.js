const { reduce, flatten, takeLast, split, map, replace } = require('ramda')
const path = require('path')

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
  async function addPluginScreenExamples (files, props = {}) {
    const { filesystem, patching, ignite, print, template } = context
    const { ignitePluginPath } = ignite

    const config = ignite.loadIgniteConfig()
    // consider this being part of context.ignite
    const pluginName = takeLast(1, split(path.sep, ignitePluginPath()))[0]

    // currently only supporting 1 form of examples
    if (config.examples === 'classic') {
      const spinner = print.spin(`▸ adding screen examples`)

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

      // generate stamped copy of all template files
      const templatePath = ignitePluginPath()
        ? `${ignitePluginPath()}/templates`
        : `templates`
      map(
        fileName => {
          template.generate({
            directory: templatePath,
            template: `${fileName}.ejs`,
            target: `ignite/Examples/Containers/${pluginName}/${fileName}`,
            props
          })
        },
        allFiles
      )

      // insert screen, route, and buttons in PluginExamples (if exists)
      const destinationPath = `${process.cwd()}/ignite/DevScreens/PluginExamplesScreen.js`
      map(
        file => {
          // turn things like "examples/This File-Example.js" into "ThisFileExample"
          // for decent component names
          // TODO: check for collisions in the future
          const exampleFileName = takeLast(1, split(path.sep, file.screen))[0]
          const componentName = replace(/.js|\s|-/g, '', exampleFileName)

          if (filesystem.exists(destinationPath)) {

            // insert screen import
            patching.insertInFile(
              destinationPath,
              'import ExamplesRegistry',
              `import ${componentName} from '../Examples/Containers/${pluginName}/${file.screen}'`
            )

            // insert screen route
            patching.insertInFile(
              destinationPath,
              'screen: PluginExamplesScreen',
              `  ${componentName}: {screen: ${componentName}, navigationOptions: {header: {visible: true}}},`
            )

            // insert launch button
            patching.insertInFile(
              destinationPath,
              'styles.screenButtons',
              `
            <RoundedButton onPress={() => this.props.navigation.navigate('${componentName}')}>
              ${file.title}
            </RoundedButton>`
            )
          } // if
        },
        files
      )

      spinner.stop()
    }
  }

  return addPluginScreenExamples
}
