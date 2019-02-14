/**
 * Returns a list of keys whose values have changed.
 */
export default (oldObject: Object, newObject: Object): string[] => {
  const { keys, intersection, reduce, concat } = require('ramda')
  let oldKeys = keys(oldObject)
  let newKeys = keys(newObject)
  const inter = intersection(oldKeys, newKeys)
  return reduce(
    (acc, k) => {
      if (oldObject[k] !== newObject[k]) {
        return concat([`'${k}'`], acc)
      }
      return acc
    },
    [],
    inter,
  )
}
