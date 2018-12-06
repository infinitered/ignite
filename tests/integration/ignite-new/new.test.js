const { system, filesystem } = require('gluegun')
const tempy = require('tempy')

const IGNITE = `${process.cwd()}/bin/ignite`
const APP_NAME = 'Foo'

jest.setTimeout(10 * 60 * 1000)

const originalDir = process.cwd()
const tempDir = tempy.directory()
const appDir = `${tempDir}/${APP_NAME}`
const opts = { cwd: appDir, stdio: 'inherit' }

// beforeEach(() => process.chdir(tempDir))
// afterEach(() => process.chdir(originalDir))

test('spins up a min app and performs various checks', async done => {
  await system.spawn(`${IGNITE} new ${APP_NAME} --min -b ignite-ir-boilerplate-andross --debug`, { cwd: tempDir, stdio: 'inherit' })
  // check the contents of ignite/ignite.json
  const igniteJSON = filesystem.read(`${appDir}/ignite/ignite.json`)
  expect(typeof igniteJSON).toBe('string')
  expect(igniteJSON).toMatch(/"generators": {/)

  // check the Containers/App.js file
  const appJS = filesystem.read(`${appDir}/App/Containers/App.js`)
  expect(appJS).toMatch(/class App extends Component {/)

  // run ignite g component
  await system.spawn(`${IGNITE} g component Test`, opts)
  expect(filesystem.inspect(`${appDir}/App/Components/Test.js`).type).toBe('file')

  // spork a screen and edit it
  await system.spawn(`${IGNITE} spork component.ejs`, opts)
  const sporkedFile = `${appDir}/ignite/Spork/ignite-ir-boilerplate-andross/component.ejs`
  await filesystem.write(sporkedFile, 'SPORKED!')
  expect(filesystem.inspect(sporkedFile).type).toBe('file')
  await system.spawn(`${IGNITE} generate component Sporkified`, opts)
  expect(filesystem.read(`${appDir}/App/Components/Sporkified.js`)).toBe('SPORKED!')

  done()

  // TODO: add more end-to-end tests here
})
