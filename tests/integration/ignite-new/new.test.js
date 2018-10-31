const test = require('ava')
const execa = require('execa')
const tempy = require('tempy')
const jetpack = require('fs-jetpack')

const IGNITE = `${process.cwd()}/bin/ignite`
const APP_DIR = 'Foo'

test.before(t => {
  const tempDir = tempy.directory()
  process.chdir(tempDir)
})

test('spins up a min app and performs various checks', async (t) => {
  await execa(IGNITE, ['new', APP_DIR, '--min', '-b', 'ignite-ir-boilerplate-andross'])
  process.chdir(APP_DIR)

  // check the contents of ignite/ignite.json
  const igniteJSON = jetpack.read('ignite/ignite.json')
  t.is(typeof igniteJSON, 'string')
  t.regex(igniteJSON, /"generators": {/)

  // check the Containers/App.js file
  const appJS = jetpack.read('App/Containers/App.js')
  t.regex(appJS, /class App extends Component {/)

  // run ignite g component
  await execa(IGNITE, ['g', 'component', 'Test'])
  t.is(jetpack.inspect('App/Components/Test.js').type, 'file')

  // spork a screen and edit it
  await execa(IGNITE, ['spork', 'component.ejs'])
  const sporkedFile = 'ignite/Spork/ignite-ir-boilerplate-andross/component.ejs'
  await jetpack.write(sporkedFile, 'SPORKED!')
  t.is(jetpack.inspect(sporkedFile).type, 'file')
  await execa(IGNITE, ['generate', 'component', 'Sporkified'])
  t.is(jetpack.read('App/Components/Sporkified.js'), 'SPORKED!')

  // TODO: add more end-to-end tests here
})
