import fs from 'fs'
import Shell from 'shelljs'
import colors from 'colors/safe'
import R from 'ramda'

/**
 * A green checkmark
 */
const check = colors.green('✔︎')

/**
 * A red x.
 */
const xmark = colors.red('𝗫')

// Get ignite config file
export const getConfig = () => {
  try {
    return require(`${Shell.pwd()}/.ignite`)
  } catch (e) {
    return null
  }
}

export const startStep = (title, generator) => {
  generator.spinner.start()
  generator.spinner.text = title

  return {
    finish: (retCode = 0) => {
      generator.spinner.stop()
      if (retCode === 0) {
        generator.log(`${check} ${title}`)
      } else {
        generator.log(`${xmark} ${title}`)
      }
    }
  }
}

// Use this sparingly, as file contents are fickle!
export const insertInFile = (theFile, theFind, theInsert, insertAfter = true) => {
  // read full file - Not a great idea if we ever touch large files
  let data = fs.readFileSync(theFile, 'utf-8')
  let newContents = ''
  // get the full line of first occurance
  let finder = new RegExp(`.*${theFind}.*`, '')
  let matches = data.match(finder)
  // Quick error check
  if (matches.length === 0) throw new Error(`'${theFind}' was not found in file.`)

  // insert contents into file
  if (insertAfter) {
    newContents = data.replace(finder, `${matches[0]}\n${theInsert}`)
  } else {
    newContents = data.replace(finder, `${theInsert}\n${matches[0]}`)
  }

  // overwrite file with modified contents
  fs.writeFileSync(theFile, newContents, 'utf-8')
}

export const replaceInFile = (theFile, theFind, theReplace) => {
  // read full file - Not a great idea if we ever touch large files
  let data = fs.readFileSync(theFile, 'utf-8')
  // get the full line of first occurance
  let finder = new RegExp(`.*${theFind}.*`, '')
  let matches = data.match(finder)
  // Quick error check
  if (matches.length === 0) throw new Error(`'${theFind}' was not found in file.`)

  // replace contents
  const newContents = data.replace(finder, `${theReplace}`)

  // overwrite file with modified contents
  fs.writeFileSync(theFile, newContents, 'utf-8')
}

export const isInFile = (theFile, theFind) => {
  // read full file - Not a great idea if we ever touch large files
  let data = fs.readFileSync(theFile, 'utf-8')
  // get the full line of first occurance
  let finder = new RegExp(`.*${theFind}.*`, '')
  let matches = data.match(finder)
  // Quick error check
  return matches || 0
}

/* ***********************************************************
* createFiles: Copy template files for generator.
* context: normally just 'this'.
* config: Pass an object that looks something like:
*  { templatePath: 'some-file-name.js',
*      destinationPath: 'folder-name',
*      test: true,
*      style: false }
*************************************************************/

export const createFiles = (context, config) => {
  const projectUsesTests = R.path(['options', 'testing'], getConfig())
  let [appPath, testPath, jestPath] = ['./App/', './Tests/', './__tests__/']
  let dest = R.prop('destinationPath', config)
  let filename = R.split('.', R.prop('templatePath', config))[0]
  let initFilename = R.toUpper(R.head(filename)) + R.slice(1, Infinity, filename) // ie. Initial Letter Capitalized

  const copyFile = (obj) => context.fs.copyTpl(
    context.templatePath(obj.templatePath),
    context.destinationPath(obj.destinationPath + context.name + obj.ext),
    { name: context.name }
  )

  // Create the App versions of the template.
  copyFile(
    R.merge(config,
      {'destinationPath': appPath + dest + '/',
        'ext': initFilename + '.js'}
    )
  )

  // Followed by the Style, if requested
  if (R.prop('style', config) === true) {
    copyFile(
      R.merge(config, {'destinationPath': appPath + dest + '/Styles/',
        'ext': initFilename + 'Style.js',
        'templatePath': filename + '.style.template'})
    )
  }
  // And the tests!
  if (R.prop('test', config) === true && projectUsesTests !== undefined) {
    if (projectUsesTests === 'ava') {
      copyFile(
        R.merge(config, {'destinationPath': testPath + dest + '/',
          'ext': initFilename + 'Test.js',
          'templatePath': filename + '.ava.template'})
      )
    } else {
      // project uses jest. Mocha support coming in a future release! :)
      copyFile(
        R.merge(config, {'destinationPath': jestPath + dest + '/',
          'ext': initFilename + 'Test.js',
          templatePath: filename + '.jest.template'})
      )
    }
  }
}
