import { reduce, flatten, takeLast, split, map, replace } from 'ramda'
import * as path from 'path'
import { IgniteToolbox, IgnitePluginScreenFile } from '../../types'

export default (toolbox: IgniteToolbox) => {
  /**
   * Generates example screens for in dev screens.
   *
   * example:
   * addScreenExamples([
   *   {title: 'Row Example', screen: 'Row.js', ancillary: ['file1', 'file2']},
   *   {title: 'Grid Example', screen: 'Grid.js', ancillary: ['file']},
   *   {title: 'Section Example', screen: 'Section.js', ancillary: ['file']},
   * ])
   */
  async function addPluginScreenExamples(files: IgnitePluginScreenFile[], props = Object) {
    const { filesystem, ignite, print, template } = toolbox
    const { ignitePluginPath } = ignite

    const config = ignite.loadIgniteConfig()
    // consider this being part of toolbox.ignite
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
        files,
      )

      // generate stamped copy of all template files
      const templatePath = ignitePluginPath() ? `${ignitePluginPath()}/templates` : `templates`
      const allFilesGen = allFiles.map(fileName => {
        let templateFile
        if (fileName.endsWith('.ejs')) {
          templateFile = fileName
        } else {
          print.warning(
            `DEPRECATION WARNING: addPluginScreenExample called with '${fileName}' and no .ejs extension. Add .ejs to your template filename when calling this function.`,
          )
          templateFile = `${fileName}.ejs`
        }

        const fileNameNoExt = path.basename(templateFile, '.ejs')

        return template.generate({
          directory: templatePath,
          template: templateFile,
          target: `ignite/Examples/Containers/${pluginName}/${fileNameNoExt}`,
          props,
        })
      })
      await Promise.all(allFilesGen)

      // insert screen, route, and buttons in PluginExamples (if exists)
      const destinationPath = `${process.cwd()}/ignite/DevScreens/PluginExamplesScreen.js`
      map(file => {
        // turn things like "examples/This File-Example.js" into "ThisFileExample"
        // for decent component names
        // TODO: check for collisions in the future
        const exampleFileName = takeLast(1, split(path.sep, file.screen))[0]
        const componentName = replace(/.js|\s|-/g, '', exampleFileName)

        if (filesystem.exists(destinationPath)) {
          // make sure we have RoundedButton
          ignite.patchInFile(destinationPath, {
            insert: `import RoundedButton from '../../App/Components/RoundedButton'`,
            after: 'import ExamplesRegistry',
          })

          // insert screen import
          ignite.patchInFile(destinationPath, {
            after: 'import ExamplesRegistry',
            insert: `import ${componentName} from '../Examples/Containers/${pluginName}/${file.screen}'`,
          })

          // insert screen route
          ignite.patchInFile(destinationPath, {
            insert: `  ${componentName}: {screen: ${componentName}, navigationOptions: {header: {visible: true}}},`,
            before: 'screen: PluginExamplesScreen',
          })

          // insert launch button
          ignite.patchInFile(destinationPath, {
            after: 'styles.screenButtons',
            insert: `
            <RoundedButton onPress={() => this.props.navigation.navigate('${componentName}')}>
              ${file.title}
            </RoundedButton>`,
          })
        } // if
      }, files)

      spinner.stop()
    }
  }

  return addPluginScreenExamples
}
