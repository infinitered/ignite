import { filesystem } from "gluegun"
import * as tempy from "tempy"
import { run, runIgnite, spawnIgniteAndPrintIfFail } from "../_test-helpers"

const APP_NAME = "Foo"
const originalDir = process.cwd()

describe(`ignite new with expo-router`, () => {
  describe(`ignite new ${APP_NAME} --debug --packager=bun --install-deps=true --experimental=expo-router --state=mst --yes`, () => {
    let tempDir: string
    let result: string
    let appPath: string

    beforeAll(async () => {
      tempDir = tempy.directory({ prefix: "ignite-" })
      result = await spawnIgniteAndPrintIfFail(
        `new ${APP_NAME} --debug --packager=bun --install-deps=true --experimental=expo-router --state=mst --yes`,
        {
          pre: `cd ${tempDir}`,
          post: `cd ${originalDir}`,
          outputFileName: "ignite-new-router-bun.txt",
        },
      )
      appPath = filesystem.path(tempDir, APP_NAME)
    })

    afterAll(() => {
      // console.log(tempDir) // uncomment for debugging, then run `code <tempDir>` to see the generated app
      filesystem.remove(tempDir) // clean up our mess
    })

    it("should convert to Expo Router with MST", async () => {
      expect(result).toContain("--state=mst")

      // make sure src/navigators, src/screens, app/, app.tsx is gone
      const dirs = filesystem.list(appPath)
      expect(dirs).toContain("src")
      expect(dirs).not.toContain("app")
      expect(dirs).not.toContain("app.tsx")
      expect(dirs).not.toContain("src/screens")
      expect(dirs).not.toContain("src/navigators")

      // check the contents of ignite/templates
      const templates = filesystem.list(`${appPath}/ignite/templates`)
      expect(templates).toContain("component")
      expect(templates).toContain("model")
      expect(templates).toContain("screen")
      expect(templates).not.toContain("navigator")

      // inspect that destinationDir has been adjusted
      const modelTpl = filesystem.read(`${appPath}/ignite/templates/model/NAME.ts.ejs`)
      expect(modelTpl).not.toContain("destinationDir: app/models")
      expect(modelTpl).toContain("destinationDir: src/models")

      const modelTestTpl = filesystem.read(`${appPath}/ignite/templates/model/NAME.test.ts.ejs`)
      expect(modelTestTpl).not.toContain("destinationDir: app/models")
      expect(modelTestTpl).toContain("destinationDir: src/models")

      const componentTpl = filesystem.read(`${appPath}/ignite/templates/component/NAME.tsx.ejs`)
      expect(componentTpl).not.toContain("app/components")
      expect(componentTpl).toContain("src/components")

      // check entry point
      const packageJson = filesystem.read(`${appPath}/package.json`)
      expect(packageJson).toContain("expo-router/entry")
      expect(packageJson).not.toContain("AppEntry.js")

      // check plugin in app.json
      // check typedRoutes is turned on
      const appJson = filesystem.read(`${appPath}/app.json`)
      expect(appJson).toContain("expo-router")
      expect(appJson).toContain("typedRoutes")

      // check ReactotronConfig for router.back etc
      const reactotronConfig = filesystem.read(`${appPath}/src/devtools/ReactotronConfig.ts`)
      expect(reactotronConfig).toContain("router.back()")
      expect(reactotronConfig).not.toContain("navigate(")
      expect(reactotronConfig).not.toContain("react-navigation")
      expect(reactotronConfig).not.toContain("reset navigation state")

      // make sure _layout sets up initial root store
      const rootLayout = filesystem.read(`${appPath}/src/app/_layout.tsx`)
      expect(rootLayout).toContain("useInitialRootStore")

      // make sure index has observer
      const rootIndex = filesystem.read(`${appPath}/src/app/index.tsx`)
      expect(rootIndex).toContain("observer")
    })

    it("should pass test, lint, and compile checks", async () => {
      const runOpts = {
        pre: `cd ${appPath}`,
        post: `cd ${originalDir}`,
      }
      // #region Assert package.json Scripts Can Be Run
      // run the tests; if they fail, run will raise and this test will fail
      await run(`bun run test`, runOpts)
      await run(`bun run lint`, runOpts)
      await run(`bun run compile`, runOpts)
      expect(await run("git diff HEAD --no-ext-diff", runOpts)).toBe("")
    })
  })

  describe(`ignite new ${APP_NAME} --debug --packager=bun --install-deps=false --experimental=expo-router --state-none --yes`, () => {
    let tempDir: string
    let result: string
    let appPath: string

    beforeAll(async () => {
      tempDir = tempy.directory({ prefix: "ignite-" })
      result = await runIgnite(
        `new ${APP_NAME} --debug --packager=bun --install-deps=false --experimental=expo-router --state=none --remove-demo --yes`,
        {
          pre: `cd ${tempDir}`,
          post: `cd ${originalDir}`,
        },
      )
      appPath = filesystem.path(tempDir, APP_NAME)
    })

    afterAll(() => {
      // console.log(tempDir) // uncomment for debugging, then run `code <tempDir>` to see the generated app
      filesystem.remove(tempDir) // clean up our mess
    })

    it("should convert to Expo Router without MST", async () => {
      expect(result).toContain("--state=none")
      expect(result).not.toContain("Setting --state=mst")

      // check the contents of ignite/templates
      const templates = filesystem.list(`${appPath}/ignite/templates`)
      expect(templates).toContain("component")
      expect(templates).toContain("screen")
      expect(templates).not.toContain("model")
      expect(templates).not.toContain("navigator")

      // same as with MST but..
      // make sure _layout doesn't have mention of rehydrating root store
      const rootLayout = filesystem.read(`${appPath}/src/app/_layout.tsx`)
      expect(rootLayout).not.toContain("useInitialRootStore")

      // make sure index does not have observer
      const rootIndex = filesystem.read(`${appPath}/src/app/index.tsx`)
      expect(rootIndex).not.toContain("observer")
    })
  })
})
