module.exports = (plugin, command, context) => {
  /**
   * Conditionally inserts a string into a file before or after another string.
   * TODO: Move to infinitered/gluegun eventually? Plugin or core?
   *
   * @param {string}  file            File to be patched
   * @param {Object}  opts            Options
   * @param {string}  opts.before     Insert before this string
   * @param {string}  opts.after      Insert after this string
   * @param {string}  opts.insert     String to be inserted
   * @param {string}  opts.match      Skip if this string exists already
   *
   * @example
   *   patchInFile('thing.js', { before: 'bar', insert: 'foo' })
   *
   */
  function patchInFile (file, opts) {
    const { patching } = context
    if (!patching.isInFile(file, opts.match || opts.insert)) {
      patching.insertInFile(
        file,
        opts.before || opts.after,
        opts.insert,
        !!opts.after
      )
    }
  }

  return patchInFile
}
