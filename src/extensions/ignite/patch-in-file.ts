import { IgniteToolbox, IgnitePatchInFileOptions } from '../../types'

export default (toolbox: IgniteToolbox) => {
  const { filesystem } = toolbox

  /**
   * Conditionally places a string into a file before or after another string.
   *
   * @example
   *   patchInFile('thing.js', { before: 'bar', insert: 'foo' })
   *
   */
  function patchInFile(file: string, opts: IgnitePatchInFileOptions) {
    const { ignite } = toolbox

    if (!filesystem.exists(file)) return

    const data = filesystem.read(file, 'utf8')

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
        filesystem.write(file, newContents, { atomic: true })
      } else {
        console.warn(`${replaceString} not found`)
      }
    } else {
      // Insert before/after a particular string
      ignite.patching.insertInFile(file, opts.before || opts.after, newString, !!opts.after)
    }
  }

  return patchInFile
}
