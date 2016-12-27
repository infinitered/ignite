const sourceFolder = `${process.cwd()}/node_modules/ignite-vector-icons/templates/`
const fileName = 'vectorExample.js'

const add = async function (context) {
  const { ignite } = context
  // knows to add via npm/yarn with visual
  ignite.addModule('react-native-vector-icons')
  // copy examples - if examples are live
  ignite.addComponentExample(sourceFolder, fileName)
}

const remove = async function (context) {
  const { print, ignite } = context
  ignite.removeModule('react-native-vector-icons')
  // remove examples
  ignite.removeComponentExample(vectorComponentExample)
}

module.exports = { add, remove }
