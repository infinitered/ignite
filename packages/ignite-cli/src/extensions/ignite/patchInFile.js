const jetpack = require('fs-jetpack')

module.exports = (plugin, command, context) => {
  /**
   * Conditionally places a string into a file before or after another string.
   * TODO: Move to infinitered/gluegun eventually? Plugin or core?
   *
   * @param {string}   file            File to be patched
   * @param {Object}   opts            Options
   * @param {string}   opts.before     Insert before this string
   * @param {string}   opts.after      Insert after this string
   * @param {string}   opts.replace    Replace this string
   * @param {string}   opts.insert     String to be inserted
   * @param {string}   opts.delete     Delete this string
   * @param {boolean}  opts.force      Write even if it already exists
   *
   * @example
   *   patchInFile('thing.js', { before: 'bar', insert: 'foo' })
   *
   */
  function patchInFile (file, opts) {
    const { patching } = context

    const data = jetpack.read(file, 'utf8')

    // If the file already has insert, no-op unless forced
    // stops accidental double inserts unless you're sure you want that
    if (data.includes(opts.insert) && !opts.force) return

    // delete <string> is the same as replace <string> + insert ''
    const replaceString = opts.delete || opts.replace
    const newString = opts.insert || ''

    if (replaceString) {
      if (data.includes(replaceString)) {
        // Replace matching string with new string
        const newContents = data.replace(replaceString, `${newString}`)
        jetpack.write(file, newContents, { atomic: true })
      } else {
        console.warn(`${replaceString} not found`)
      }
    } else {
      // Insert before/after a particular string
      patching.insertInFile(
        file,
        opts.before || opts.after,
        newString,
        !!opts.after
      )
    }
  }

  return patchInFile
}
