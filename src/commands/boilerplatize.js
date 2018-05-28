// @cliDescription Turns a valid react-native project into a boilerplatize.
// @cliAlias bz
// ----------------------------------------------------------------------------

const ignore = require('ignore')

const targetFolder = 'boilerplate/'
let projectName
let ignoredFiles = ignore().add([
  '.DS_Store',
  'boilerplate',
  '.git'
])

/**
 * @param {string} fileName - Name of the file we want to copy
 * @param {GluegunContext} context - the Gluegun context
 */
async function generateFile (relativePath, context) {
  const { filesystem, ignite } = context
  const absolutePath = `${filesystem.cwd()}/${relativePath}`

  const fileContent = filesystem.read(absolutePath)

  // Checking if file contains imports from the project
  const fileIncludesProjectName =
    fileContent.includes(`require('${projectName}`) ||
    fileContent.includes(`require("${projectName}`) ||
    fileContent.includes(`from '${projectName}/`) ||
    fileContent.includes(`from "${projectName}/`) ||
    fileContent.includes(`"${projectName}"`)

  if (fileIncludesProjectName) {
    if (relativePath === 'package.json') {
      const packageJSON = filesystem.read(absolutePath, 'json')
      delete packageJSON.dependencies.react
      delete packageJSON.dependencies['react-native']
      filesystem.write(`${targetFolder}${relativePath}.ejs`, packageJSON, { atomic: true })
    } else {
      filesystem.copy(absolutePath, `${targetFolder}${relativePath}.ejs`)
    }
    console.log(`Patching ${targetFolder}${relativePath}.ejs`)
    await ignite.patchInFile(`${targetFolder}${relativePath}.ejs`, { replace: new RegExp(projectName, 'g'), insert: '<% props.name %>' })
  } else {
    filesystem.copy(absolutePath, `${targetFolder}${relativePath}`)
  }
};

/**
 * @param {string} folderName - Name of the folder we want to list and copy
 * @param {GluegunContext} context - the Gluegun context
 */
async function listAndCopy (folderName, context, acceptedForSubdirectories = false) {
  const isFirstLoop = !folderName
  const { ignite, filesystem, print: { colors, info } } = context
  const relativeFolderPathExceptForRoot = isFirstLoop ? filesystem.cwd() : `${folderName}/`

  if (ignoredFiles.ignores(relativeFolderPathExceptForRoot)) {
    ignite.log(`Ignoring ${relativeFolderPathExceptForRoot}`)
    return
  }

  // handleiOSAndAndroidFolders()
  const files = await filesystem.list(relativeFolderPathExceptForRoot)

  for (let index = 0; index < files.length; index++) {
    const item = files[index]
    const srcItemRelativePath = `${folderName ? `${folderName}/` : ''}${item}`
    ignite.log(`Checking: ${srcItemRelativePath}`)

    if (ignoredFiles.ignores(srcItemRelativePath)) {
      ignite.log(`Ignoring ${srcItemRelativePath}`)
    } else {
      if (filesystem.exists(srcItemRelativePath) === 'dir') {
        let answer

        if (!acceptedForSubdirectories) {
          answer = await context.prompt.ask([
            {
              name: 'includeFolder',
              message: `Do you want to include the '${srcItemRelativePath}' folder in your boilerplate?`,
              type: 'radio',
              choices: ['Yes', 'Yes and all the subdirectories', 'No']
            }
          ])
        } else {
          answer = { includeFolder: 'Yes and all the subdirectories' }
        }

        if (answer.includeFolder.includes('Yes')) {
          filesystem.dir(`${targetFolder}${srcItemRelativePath}`)
          info(colors.green(`Creating directory: ${targetFolder}${srcItemRelativePath}`))
          await listAndCopy(srcItemRelativePath, context, answer.includeFolder === 'Yes and all the subdirectories')
        } else {
          info(colors.yellow(`Skipping directory: ${srcItemRelativePath}`))
        }
      } else {
        await generateFile(srcItemRelativePath, context)
      }
    }
  }
};

/**
 * @param {GluegunContext} context - the Gluegun context
 */
async function boilerplatize (context) {
  const { print: { colors, info }, ignite, filesystem } = context

  ignite.log('running boilerplatize command')

  // Get the project name out of package.json
  const packageJSON = filesystem.read(`${filesystem.cwd()}/package.json`, 'json')
  projectName = packageJSON.name

  // Read gitignore and filter comments and empty lines
  const gitignore = filesystem.read(`${filesystem.cwd()}/.gitignore`).split(filesystem.eol).filter((item) => item[0] !== '#' && item !== '')

  ignoredFiles.add(gitignore)

  if (filesystem.exists(`${targetFolder}`)) {
    info(colors.green(`Removing ${targetFolder}`))
    filesystem.remove(`${targetFolder}`)
  }

  info(colors.green(`Creating ${targetFolder}`))
  filesystem.dir(`${targetFolder}`)

  await listAndCopy(null, context)
}

module.exports = boilerplatize
