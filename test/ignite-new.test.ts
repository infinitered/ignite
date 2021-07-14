import { filesystem } from "gluegun"
import * as tempy from "tempy"
import { run, runIgnite, runError } from "./_test-helpers"

const APP_NAME = "Foo"
const EXPO_APP_NAME = "Bar"

const originalDir = process.cwd()
let tempDir: string

beforeEach(() => {
  tempDir = tempy.directory()
  process.chdir(tempDir)
})

afterEach(() => {
  process.chdir(originalDir)
  filesystem.remove(tempDir) // clean up our mess
})

describe("Checking for ignite. 🪔", () => {
  test(`ignite new (no name)`, async (done) => {
    const result = await runError(`new`)
    expect((result as any).stdout).toContain(`Project name is required`)
    done()
  })
})

describe("Igniting new app! 🔥\nGo get a coffee or something. This is gonna take a while.", () => {
  test(`ignite new ${APP_NAME}`, async (done) => {
    const result = await runIgnite(`new ${APP_NAME}`)

    expect(result).toContain(`Using ignite-cli`)
    expect(result).toContain(`Ignite CLI ignited ${APP_NAME}`)

    // now let's examine the spun-up app
    process.chdir(APP_NAME)

    const dirs = filesystem.list(`.`)
    expect(dirs).toContain("ios")
    expect(dirs).toContain("android")
    expect(dirs).toContain("app")

    await testSpunUpApp()

    // we're done!
    process.chdir("..")
    done()
  })
})

describe("Igniting new expo app! 🔥\nRemember how long that last one took? We're gonna do it again.", () => {
  test(`ignite new ${EXPO_APP_NAME} --expo`, async (done) => {
    const result = await runIgnite(`new ${EXPO_APP_NAME} --expo`)

    expect(result).toContain(`Using expo-cli`)
    expect(result).toContain(`Ignite CLI ignited ${EXPO_APP_NAME}`)

    // now let's examine the spun-up app
    process.chdir(EXPO_APP_NAME)

    const dirs = filesystem.list(`.`)
    expect(dirs).not.toContain("ios")
    expect(dirs).not.toContain("android")
    expect(dirs).toContain("app")

    await testSpunUpApp()

    // we're done!
    process.chdir("..")
    done()
  })
})

async function testSpunUpApp() {
  // run typescript
  let resultTS
  try {
    resultTS = await run(`yarn compile`)
  } catch (e) {
    resultTS = e.stdout
    console.error(resultTS) // This will only show if you run in --verbose mode.
  }
  expect(resultTS).not.toContain("error")

  // check the contents of ignite/templates
  const templates = filesystem.list(`./ignite/templates`)
  expect(templates).toContain("component")
  expect(templates).toContain("model")
  expect(templates).toContain("screen")

  // check the basic contents of package.json
  const igniteJSON = filesystem.read(`./package.json`, "json")
  expect(igniteJSON).toHaveProperty("scripts")
  expect(igniteJSON).toHaveProperty("dependencies")
  expect(igniteJSON).toHaveProperty("detox.configurations")

  // check the app.tsx file
  const appJS = filesystem.read(`./app/app.tsx`)
  expect(appJS).toContain("export default App")
  expect(appJS).toContain("RootStore")

  // now lets test generators too, since we have a properly spun-up app!
  // components
  const componentGen = await runIgnite(`generate component WompBomp`)
  expect(componentGen).toContain(`app/components/womp-bomp/womp-bomp.tsx`)
  expect(filesystem.list(`${process.cwd()}/app/components`)).toContain("womp-bomp")
  expect(filesystem.read(`${process.cwd()}/app/components/womp-bomp/womp-bomp.tsx`)).toContain(
    "export const WompBomp",
  )

  // models
  const modelGen = await runIgnite(`generate model mod-test`)
  expect(modelGen).toContain(`app/models/mod-test/mod-test.ts`)
  expect(modelGen).toContain(`app/models/mod-test/mod-test.test.ts`)
  expect(filesystem.list(`${process.cwd()}/app/models`)).toContain("mod-test")
  expect(filesystem.read(`${process.cwd()}/app/models/mod-test/mod-test.ts`)).toContain(
    "export const ModTestModel",
  )
  expect(filesystem.read(`${process.cwd()}/app/models/index.ts`)).toContain(
    `export * from "./mod-test/mod-test"`,
  )

  // screens
  const screenGen = await runIgnite(`generate screen bowser-screen --skip-index-file`)
  expect(screenGen).toContain(`Stripping Screen from end of name`)
  expect(screenGen).toContain(`app/screens/bowser/bowser-screen.tsx`)
  expect(filesystem.list(`${process.cwd()}/app/screens/bowser`)).toContain("bowser-screen.tsx")
  expect(filesystem.read(`${process.cwd()}/app/screens/bowser/bowser-screen.tsx`)).toContain(
    "export const BowserScreen",
  )
  expect(filesystem.read(`${process.cwd()}/app/screens/index.ts`)).not.toContain(
    `export * from "./bowser/bowser-screen"`,
  )

  // commit the change
  await run(`git add ./app/models ./app/components && git commit -m "generated test components"`)

  // run the tests; if they fail, run will raise and this test will fail
  await run(`yarn test --updateSnapshot`)
  await run(`yarn lint`)
  await run(`yarn compile`)
  expect(await run("git diff HEAD")).toEqual("")
}
