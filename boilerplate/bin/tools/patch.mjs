/** @callback Replacement @param search {string} @returns {string} */
/**
 * Insert a string into a file based on a search string.
 * @param file {string} contents of the file
 * @param search {string} string to search for in the file
 * @param replacement {Replacement} callback to construct to replacement string
 * @returns {string} string with the replacement made
 */
export const insert = (file, search, replacement) => file.replace(search, replacement(search))

/**
 * @callback UpdateCallback
 * @param file {string} contents of the file
 * @returns {string} updated file contents
 */

/**
 *
 * @param filepath {string} path to the file to update
 * @param {...UpdateCallback} callbacks functions to update the contents of the file
 */
export const update = async (filepath, ...callbacks) => {
  const filecontent = await fs.readFile(filepath, "utf-8")
  const newfilecontent = callbacks.reduce((file, callback) => callback(file), filecontent)
  await fs.writeFile(filepath, newfilecontent)
}
