const screenExamples = [
  {
    title: 'Row Example',
    screen: 'examples/RowExample.js',
    ancillary: ['examples/Styles/RowExampleStyle.js']
  },
  {
    title: 'Grid Example',
    screen: 'examples/GridExample.js',
    ancillary: ['examples/Styles/GridExampleStyle.js']
  },
  {
    title: 'Sections Example',
    screen: 'examples/SectionExample.js',
    ancillary: ['examples/Styles/SectionExampleStyle.js']
  }
]

/**
 * Adds the screen examples.
 *
 * @param {any} context The gluegun context.
 */
async function add (context) {
  // examples of generated screens
  await context.ignite.addPluginScreenExamples(screenExamples)
}

/**
 * Removes the screen examples.
 *
 * @param {any} context The gluegun context.
 */
async function remove (context) {
  // remove screens
  await context.ignite.removePluginScreenExamples(screenExamples)
}

module.exports = {
  add, remove
}
