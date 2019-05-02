import { IgniteToolbox } from '../../types'

export default (toolbox: IgniteToolbox) => {
  /**
   * Removes the component example.
   */
  function removePluginComponentExample(fileName: string) {
    const { filesystem, ignite, print } = toolbox
    print.info(`    ${print.checkmark} removing component example`)
    // remove file from Components/Examples folder
    filesystem.remove(`${process.cwd()}/ignite/Examples/Components/${fileName}`)
    // remove reference in usage example screen (if it exists)
    const destinationPath = `${process.cwd()}/ignite/DevScreens/PluginExamplesScreen.js`
    if (filesystem.exists(destinationPath)) {
      ignite.patching.replaceInFile(destinationPath, `import '../Examples/Components/${fileName}`, '')
    }
  }

  return removePluginComponentExample
}
