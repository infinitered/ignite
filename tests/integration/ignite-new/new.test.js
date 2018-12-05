const { system } = require('gluegun')
const tempy = require('tempy')
const jetpack = require('fs-jetpack')

const IGNITE = `${process.cwd()}/bin/ignite`
const APP_DIR = 'Foo'

jest.setTimeout(90 * 1000)

const originalDir = process.cwd()
const tempDir = tempy.directory()

// beforeEach(() => process.chdir(tempDir))
// afterEach(() => process.chdir(originalDir))

test('spins up a min app and performs various checks', async done => {
  await system.spawn(`cd ${tempDir} && ${IGNITE} new ${APP_DIR} --min -b ignite-ir-boilerplate-andross`)
  // process.chdir(APP_DIR)

  // check the contents of ignite/ignite.json
  const igniteJSON = jetpack.read(`${tempDir}/ignite/ignite.json`)
  expect(typeof igniteJSON).toBe('string')
  expect(igniteJSON).toMatch(/"generators": {/)

  // check the Containers/App.js file
  const appJS = jetpack.read(`${tempDir}/App/Containers/App.js`)
  expect(appJS).toMatch(/class App extends Component {/)

  // run ignite g component
  await system.spawn(`${IGNITE} g component Test`)
  expect(jetpack.inspect('App/Components/Test.js').type).toBe('file')

  // spork a screen and edit it
  await system.spawn(`cd ${tempDir} && ${IGNITE} spork component.ejs`)
  const sporkedFile = `${tempDir}/ignite/Spork/ignite-ir-boilerplate-andross/component.ejs`
  await jetpack.write(sporkedFile, 'SPORKED!')
  expect(jetpack.inspect(sporkedFile).type).toBe('file')
  await system.spawn(`cd ${tempDir} && ${IGNITE} generate component Sporkified`)
  expect(jetpack.read('App/Components/Sporkified.js')).toBe('SPORKED!')

  done()

  // TODO: add more end-to-end tests here
})
