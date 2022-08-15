import { system, filesystem } from "gluegun"
const stripANSI = require("strip-ansi") // why...

const IGNITE = "node " + filesystem.path(__dirname, "..", "bin", "ignite")
const shellOpts = { stdio: "inherit" }

jest.setTimeout(10 * 60 * 1000)

type RunOptions = {
  pre?: string // command to run before the command
  post?: string // command to run after the command
}

export async function runIgnite(cmd: string, options: RunOptions = {}): Promise<string> {
  return run(`${IGNITE} ${cmd}`, options)
}

export async function run(cmd: string, options: RunOptions = {}): Promise<string> {
  const pre = options.pre ? `${options.pre} && ` : ""
  const post = options.post ? ` && ${options.post}` : ""
  const resultANSI = await system.run(`${pre}${cmd}${post}`, shellOpts)
  return stripANSI(resultANSI)
}

export async function runError(cmd: string): Promise<string | any> {
  let resultANSI: string
  try {
    resultANSI = await system.run(`${IGNITE} ${cmd}`, shellOpts)
  } catch (e) {
    return e
  }
  return `No error thrown? Output: ${resultANSI}`
}

export async function testSpunUpApp(appPath: string, originalDir: string) {
  const runOpts = {
    pre: `cd ${appPath}`,
    post: `cd ${originalDir}`,
  }

  // #region Assert Important Directories Exist
  // check the contents of ignite/templates
  const templates = filesystem.list(`${appPath}/ignite/templates`)
  expect(templates).toContain("component")
  expect(templates).toContain("model")
  expect(templates).toContain("screen")
  expect(templates).toContain("app-icon")
  // #endregion

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

  // #region Assert Important Files Exist
  // check the basic contents of package.json
  const igniteJSON = filesystem.read(`${appPath}/package.json`, "json")
  expect(igniteJSON).toHaveProperty("scripts")
  expect(igniteJSON).toHaveProperty("dependencies")
  expect(igniteJSON).toHaveProperty("detox.configurations")

  // check the app.tsx file
  const appJS = filesystem.read(`${appPath}/app/app.tsx`)
  expect(appJS).toContain("export default App")
  expect(appJS).toContain("RootStore")
  // #endregion

  // #region Assert Generators Work
  // now lets test generators too, since we have a properly spun-up app!
  // components
  const componentGen = await runIgnite(`generate component WompBomp`, runOpts)
  expect(componentGen).toContain(`app/components/womp-bomp/womp-bomp.tsx`)
  expect(filesystem.list(`${appPath}/app/components`)).toContain("womp-bomp")
  expect(filesystem.read(`${appPath}/app/components/womp-bomp/womp-bomp.tsx`)).toContain(
    "export const WompBomp",
  )

  // models
  const modelGen = await runIgnite(`generate model mod-test`, runOpts)
  expect(modelGen).toContain(`app/models/mod-test/mod-test.ts`)
  expect(modelGen).toContain(`app/models/mod-test/mod-test.test.ts`)
  expect(filesystem.list(`${appPath}/app/models`)).toContain("mod-test")
  expect(filesystem.read(`${appPath}/app/models/mod-test/mod-test.ts`)).toContain(
    "export const ModTestModel",
  )
  expect(filesystem.read(`${appPath}/app/models/index.ts`)).toContain(
    `export * from "./mod-test/mod-test"`,
  )

  // screens
  const screenGen = await runIgnite(`generate screen bowser-screen --skip-index-file`, runOpts)
  expect(screenGen).toContain(`Stripping Screen from end of name`)
  expect(screenGen).toContain(`app/screens/bowser/bowser-screen.tsx`)
  expect(filesystem.list(`${appPath}/app/screens/bowser`)).toContain("bowser-screen.tsx")
  expect(filesystem.read(`${appPath}/app/screens/bowser/bowser-screen.tsx`)).toContain(
    "export const BowserScreen",
  )
  expect(filesystem.read(`${appPath}/app/screens/index.ts`)).not.toContain(
    `export * from "./bowser/bowser-screen"`,
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
}
