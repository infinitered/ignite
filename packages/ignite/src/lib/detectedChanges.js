const { keys, intersection, reduce, concat } = require('ramda')

// used for changes warnings
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
