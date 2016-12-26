const vectorComponentExample = 'blah.js'

const add = async function (context) {
  const { print, filesystem, parameters, prompt, ignite } = context
  const { info, warning, success, checkmark, error, debug } = print
  console.log('Adding Ignite Vector Icons')

  // ideal
  // // knows to add via npm/yarn with visual
  ignite.addModule('react-native-vector-icons')
  // // copy examples - if examples are live
  // ignite.addComponentExample(vectorComponentExample)
}

const remove = async function (context) {
  console.log('Removing Ignite Vector Icons')

  // ideal
  ignite.removeModule('react-native-vector-icons')
  // // remove examples
  // ignite.removeComponentExample(vectorComponentExample)
}

module.exports = { add, remove }
