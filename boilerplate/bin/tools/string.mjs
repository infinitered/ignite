/**
 * @param {string} str
 * @return {string}
 * @see https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
 */
export const camelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, "")
}

/**
 * @param file {string} contents of the file
 * @param replaceValues {Object.<string,string>} key value pairs to replace in the file
 */
export const prettier = (file, replaceValues = {}) =>
  Object.entries(replaceValues)
    .reduce((file, [key, value]) => file.replace(new RegExp(key, "g"), value), file)
    .trim() + "\n"
