const NPM_MODULE_NAME = 'react-native-animatable'
const EXAMPLE_FILE = 'animatableExample.js'

/**
 * Add ourself to the project.
 */
const add = async function (context) {
  const { ignite } = context

  // install a npm module
  await ignite.addModule(NPM_MODULE_NAME)

  // copy the example file (if examples are turned on)
  await ignite.addComponentExample(EXAMPLE_FILE, { title: 'Animatable' })
}

/**
 * Remove ourself from the project.
 */
const remove = async function (context) {
  const { ignite } = context

  // remove the npm module
  await ignite.removeModule(NPM_MODULE_NAME)

  // remove the component example
  await ignite.removeComponentExample(EXAMPLE_FILE)
}

/**
 * Expose an ignite plugin interface.
 */
module.exports = { add, remove }
