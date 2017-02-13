const add = async function (context) {
  // examples of generated screens
  await context.ignite.addScreenExamples([
    {
      title: 'Row Example', 
      screen: 'examples/RowExample.js', 
      ancillary: ['examples/Styles/RowExampleStyle.js']
    },{
      title: 'Grid Example', 
      screen: 'examples/GridExample.js', 
      ancillary: ['examples/Styles/GridExampleStyle.js']
    },{
      title: 'Sections Example', 
      screen: 'examples/SectionExample.js', 
      ancillary: ['examples/Styles/SectionExampleStyle.js']
    }
  ])
}

const remove = async function (context) {
  // No-op -- we are generator-only.
}

module.exports = { add, remove }
