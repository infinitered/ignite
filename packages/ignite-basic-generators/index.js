const screenExamples = [
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
]

const add = async function (context) {
  // examples of generated screens
  await context.ignite.addScreenExamples(screenExamples)
}

const remove = async function (context) {
  console.log('I got called')
  // remove screens
  await context.ignite.removeScreenExamples(screenExamples)
}

module.exports = { add, remove }
