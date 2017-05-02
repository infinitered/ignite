const { keys, intersection, reduce, concat } = require('ramda')

/**
 * Returns a list of keys whose values have changed.
 *
 * @param {Object} oldObject The original version.
 * @param {Object} newObject The new version.
 * @return {Array[String]} A list of keys with single quotes around them.
 */
const detectedChanges = (oldObject, newObject) => {
  let oldKeys = keys(oldObject)
  let newKeys = keys(newObject)
  const inter = intersection(oldKeys, newKeys)
  return reduce((acc, k) => {
    if (oldObject[k] !== newObject[k]) {
      return concat([`'${k}'`], acc)
    }
    return acc
  }, [], inter)
}

module.exports = detectedChanges
