import { filesystem } from "gluegun"
import * as tempy from "tempy"
import { runIgnite, runError, run } from "../_test-helpers"

const APP_NAME = "Foo"
const originalDir = process.cwd()

describe("ignite new", () => {
  describe("errors", () => {
    let tempDir: string

    beforeEach(() => {
      tempDir = tempy.directory({ prefix: "ignite-" })
    })

    afterEach(() => {
      filesystem.remove(tempDir) // clean up our mess
    })

    test(`invalid bundle id "thisisbad" throws expected error`, async () => {
      const result = await runError(`new BadBundleID --bundle thisisbad --yes`)
      expect((result as any).stdout).toContain(`Invalid Bundle Identifier.`)
    })
  })

  describe(`ignite new ${APP_NAME} --debug --packager=npm --yes --use-cache`, () => {
    let tempDir: string
    let result: string
    let appPath: string

    beforeAll(async () => {
      tempDir = tempy.directory({ prefix: "ignite-" })
      result = await runIgnite(`new ${APP_NAME} --debug --packager=npm --yes --use-cache`, {
        pre: `cd ${tempDir}`,
        post: `cd ${originalDir}`,
      })
      appPath = filesystem.path(tempDir, APP_NAME)
    })

    afterAll(() => {
      filesystem.remove(tempDir) // clean up our mess
    })

    it("should print success message", () => {
      // at some point this should probably be a snapshot?
      expect(result).toContain("Now get cooking! 🍽")
    })

    it("should have created expected directories", () => {
      // now let's examine the spun-up app
      const dirs = filesystem.list(appPath)
      expect(dirs).toContain("ios")
      expect(dirs).toContain("android")
      expect(dirs).toContain("app")

      // check the contents of ignite/templates
      const templates = filesystem.list(`${appPath}/ignite/templates`)
      expect(templates).toContain("component")
      expect(templates).toContain("model")
      expect(templates).toContain("screen")
      expect(templates).toContain("app-icon")
    })

    it("should have changed the android bundle id", () => {
      const androidPackageName = APP_NAME.toLowerCase()
      const mainAppJava = filesystem.read(
        `${appPath}/android/app/src/main/java/com/${androidPackageName}/MainApplication.java`,
      )
      expect(mainAppJava).toContain(`package com.${androidPackageName};`)
      const mainActivityJava = filesystem.read(
        `${appPath}/android/app/src/main/java/com/${androidPackageName}/MainActivity.java`,
      )
      expect(mainActivityJava).toContain(`package com.${androidPackageName};`)
    })

    it(`should have renamed all permutations of hello-world to ${APP_NAME}`, async () => {
      // react-native-rename doesn't always catch everything, so we need to check for
      // any instances and fail if it doesn't work
      await checkForLeftoverHelloWorld(appPath)
    })

    it("should have modified package.json to add scripts and dependencies", () => {
      const igniteJSON = filesystem.read(`${appPath}/package.json`, "json")
      expect(igniteJSON).toHaveProperty("scripts")
      expect(igniteJSON).toHaveProperty("dependencies")
    })

    it("should have created app.tsx with default export and RootStore", () => {
      const appJS = filesystem.read(`${appPath}/app/app.tsx`)
      expect(appJS).toContain("export default App")
      expect(appJS).toContain("RootStore")
    })

    it("should be able to use `generate` command and have pass output pass npm run test, npm run lint, and npm run compile scripts", async () => {
      // other common test operations
      const runOpts = {
        pre: `cd ${appPath}`,
        post: `cd ${originalDir}`,
      }

      // #region Assert Typescript Compiles With No Errors
      let resultTS: string
      try {
        resultTS = await run(`npm run compile`, runOpts)
      } catch (e) {
        resultTS = e.stdout
        console.error(resultTS) // This will only show if you run in --verbose mode.
      }
      expect(resultTS).not.toContain("error")
      // #endregion

      // #region Assert Generators Work
      // now lets test generators too, since we have a properly spun-up app!
      // components
      const componentGen = await runIgnite(`generate component womp-bomp`, runOpts)
      expect(componentGen).toContain(`app/components/WompBomp.tsx`)
      expect(filesystem.list(`${appPath}/app/components`)).toContain("WompBomp.tsx")
      expect(filesystem.read(`${appPath}/app/components/WompBomp.tsx`)).toContain(
        "export const WompBomp",
      )

      // models
      const modelGen = await runIgnite(`generate model mod-test`, runOpts)
      expect(modelGen).toContain(`app/models/ModTest.ts`)
      expect(modelGen).toContain(`app/models/ModTest.test.ts`)
      expect(filesystem.list(`${appPath}/app/models`)).toContain("ModTest.ts")
      expect(filesystem.read(`${appPath}/app/models/ModTest.ts`)).toContain(
        "export const ModTestModel",
      )
      expect(filesystem.read(`${appPath}/app/models/index.ts`)).toContain(
        `export * from "./ModTest"`,
      )

      // screens
      const screenGen = await runIgnite(`generate screen bowser-screen --skip-index-file`, runOpts)
      expect(screenGen).toContain(`Stripping Screen from end of name`)
      expect(screenGen).toContain(`app/screens/BowserScreen.tsx`)
      expect(filesystem.list(`${appPath}/app/screens`)).toContain("BowserScreen.tsx")
      expect(filesystem.read(`${appPath}/app/screens/BowserScreen.tsx`)).toContain(
        "export const BowserScreen",
      )
      expect(filesystem.read(`${appPath}/app/screens/index.ts`)).not.toContain(
        `export * from "./BowserScreen"`,
      )

      // app-icons
      const allAppIcons = ["android", "ios", "expo"].reduce((acc: string[], type) => {
        const searchPath = {
          android: "android/app/src/main/res",
          ios: "ios",
          expo: "assets/images",
        }[type] as string

        const matchString = {
          android: "ic_launch*.png",
          ios: `Icon-*.png`,
          expo: "app-icon*.png",
        }[type]

        try {
          const iconsMatches = filesystem.find(filesystem.path(appPath, searchPath), {
            directories: false,
            files: true,
            matching: matchString,
          })

          return [...acc, ...iconsMatches]
        } catch (error) {
          return acc
        }
      }, [])

      allAppIcons.forEach((i) => {
        expect(filesystem.exists(i) === "file").toBe(true)
        filesystem.remove(i)
        expect(filesystem.exists(i) === "file").toBe(false)
      })

      const appIconGen = await runIgnite(
        `generate app-icon all --skip-source-equality-validation`,
        runOpts,
      )

      expect(appIconGen).toContain(`Generating Expo app icons...`)

      const iosProjectExists = filesystem.exists(filesystem.path(appPath, "ios"))
      const androidProjectExists = filesystem.exists(filesystem.path(appPath, "android"))

      if (androidProjectExists) {
        expect(appIconGen).toContain(`Generating Android app icons...`)
      } else {
        expect(appIconGen).toContain(`No output directory found for "Android"`)
      }

      if (iosProjectExists) {
        expect(appIconGen).toContain(`Generating iOS app icons...`)
      } else {
        expect(appIconGen).toContain(`No output directory found for "iOS"`)
      }

      allAppIcons.forEach((i) => {
        expect(filesystem.exists(i) === "file").toBe(true)
      })

      const inputFiles = filesystem.find(`${appPath}/ignite/templates/app-icon`, {
        directories: false,
        files: true,
        matching: "*.png",
      })

      inputFiles.forEach((i) => {
        expect(filesystem.exists(i) === "file").toBe(true)
        filesystem.remove(i)
        expect(filesystem.exists(i) === "file").toBe(false)
      })

      await runIgnite(`generate --update`, runOpts)

      inputFiles.forEach((i) => {
        expect(filesystem.exists(i) === "file").toBe(true)
      })

      // splash-screen
      const splashScreenAssets = ["android", "ios", "expo"].reduce((acc: string[], type) => {
        const searchPath = {
          android: "android/app/src/main/res",
          ios: "ios",
          expo: "assets/images",
        }[type] as string

        const matchString = {
          android: "bootsplash*.png",
          ios: `bootsplash*.png`,
          expo: "splash-logo*.png",
        }[type]

        try {
          const splashMatches = filesystem.find(filesystem.path(appPath, searchPath), {
            directories: false,
            files: true,
            matching: matchString,
          })

          return [...acc, ...splashMatches]
        } catch (error) {
          return acc
        }
      }, [])

      splashScreenAssets.forEach((i) => {
        expect(filesystem.exists(i) === "file").toBe(true)
        filesystem.remove(i)
        expect(filesystem.exists(i) === "file").toBe(false)
      })

      function verifySplashScreenColor(type: "android" | "ios" | "expo", matchString: string) {
        const splashScreenColorStrings = {
          android: filesystem.read(
            filesystem.path(appPath, "android/app/src/main/res/values/colors.xml"),
          ),
          ios: filesystem.read(filesystem.path(appPath, "ios/Foo/BootSplash.storyboard")),
          expo: filesystem.read(filesystem.path(appPath, "app.json")),
        }

        const colorContent = splashScreenColorStrings[type]

        if (!colorContent) return

        expect(colorContent).toContain(matchString)
      }

      verifySplashScreenColor("android", `#191015`)
      verifySplashScreenColor("expo", `#191015`)
      verifySplashScreenColor(
        "ios",
        `red="0.0980392156862745" green="0.0627450980392157" blue="0.0823529411764706"`,
      )

      const splashScreenGen = await runIgnite(
        `generate splash-screen 000000  --skip-source-equality-validation`,
        runOpts,
      )

      expect(splashScreenGen).toContain(`Generating Expo splash screens`)

      if (androidProjectExists) {
        expect(splashScreenGen).toContain(`Generating Android splash screen...`)
      } else {
        expect(splashScreenGen).toContain(`No output directory found for "Android"`)
      }

      if (iosProjectExists) {
        expect(splashScreenGen).toContain(`Generating iOS splash screen...`)
      } else {
        expect(splashScreenGen).toContain(`No output directory found for "iOS"`)
      }

      splashScreenAssets.forEach((i) => {
        expect(filesystem.exists(i) === "file").toBe(true)
      })

      verifySplashScreenColor("android", `#000000`)
      verifySplashScreenColor("expo", `#000000`)
      verifySplashScreenColor(
        "ios",
        `red="0.00000000000000" green="0.00000000000000" blue="0.00000000000000"`,
      )

      const inputFile = filesystem.path(appPath, "ignite/templates/splash-screen/logo.png")
      expect(filesystem.exists(inputFile) === "file").toBe(true)
      filesystem.remove(inputFile)
      expect(filesystem.exists(inputFile) === "file").toBe(false)
      await runIgnite(`generate --update`, runOpts)
      expect(filesystem.exists(inputFile) === "file").toBe(true)
      // #endregion

      // #region Assert Changes Can Be Commit To Git
      // commit the change
      await run(`git add ./app/models ./app/components ./app.json ./assets/images`, runOpts)
      if (iosProjectExists) {
        await run(`git add ./ios/Foo/Images.xcassets/AppIcon.appiconset`, runOpts)
        await run(`git add ./ios/Foo/Images.xcassets/BootSplashLogo.imageset`, runOpts)
        await run(`git add ./ios/Foo/BootSplash.storyboard`, runOpts)
      }
      if (androidProjectExists) {
        await run(`git add ./android/app/src/main/res`, runOpts)
      }
      await run(`git commit -m "generated test components & assets"`, runOpts)
      // #endregion

      // #region Assert package.json Scripts Can Be Run
      // run the tests; if they fail, run will raise and this test will fail
      await run(`npm run test`, runOpts)
      await run(`npm run lint`, runOpts)
      await run(`npm run compile`, runOpts)
      expect(await run("git diff HEAD", runOpts)).toEqual("")
      // #endregion

      // we're done!
    })
  })
})

async function checkForLeftoverHelloWorld(filePath: string) {
  const ignoreFolders = ["/xcuserdata", ".git", "node_modules", "Pods", "/build"]
  // ignore some folders
  if (!ignoreFolders.every((f) => !filePath.includes(f))) return

  if (!filesystem.isDirectory(filePath)) {
    // we append the filePath to the end of the message to make it easier to
    // find the file in the console output
    const contents = filesystem.read(filePath) + ` (Filename: ${filePath})`
    expect(contents).not.toContain("helloworld")
    expect(contents).not.toContain("HelloWorld")
    expect(contents).not.toContain("hello-world")

    // it's a file, so eject
    return
  }

  // check to make sure there are no instances of helloworld or HelloWorld or hello-world
  // anywhere in the app -- including folder and filenames.
  const appFiles = filesystem.list(filePath) ?? []

  for (const file of appFiles) {
    expect(file).not.toContain("helloworld")
    expect(file).not.toContain("HelloWorld")
    expect(file).not.toContain("hello-world")
    await checkForLeftoverHelloWorld(`${filePath}/${file}`)
  }
}
