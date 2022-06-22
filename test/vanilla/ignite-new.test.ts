import { filesystem } from "gluegun"
import * as tempy from "tempy"
import { runIgnite, runError, testSpunUpApp } from "../_test-helpers"

const APP_NAME = "Foo"

const originalDir = process.cwd()
let tempDir: string

beforeEach(() => {
  tempDir = tempy.directory({ prefix: "ignite-" })
})

afterEach(() => {
  filesystem.remove(tempDir) // clean up our mess
})

describe("Checking for ignite. 🪔", () => {
  test(`ignite new (no name)`, async () => {
    const result = await runError(`new`)
    expect((result as any).stdout).toContain(`Project name is required`)
  })

  test(`ignite new (invalid bundle ID)`, async () => {
    const result = await runError(`new BadBundleID --bundle thisisbad`)
    expect((result as any).stdout).toContain(`Invalid Bundle Identifier.`)
  })
})

describe("Igniting new app! 🔥\nGo get a coffee or something. This is gonna take a while.", () => {
  test(`ignite new ${APP_NAME}`, async () => {
    const result = await runIgnite(`new ${APP_NAME} --debug`, {
      pre: `cd ${tempDir}`,
      post: `cd ${originalDir}`,
    })

    expect(result).toContain(`Using ignite-cli`)
    expect(result).toContain(`Ignite CLI ignited ${APP_NAME}`)

    // now let's examine the spun-up app
    const appPath = filesystem.path(tempDir, APP_NAME)

    const dirs = filesystem.list(appPath)
    expect(dirs).toContain("ios")
    expect(dirs).toContain("android")
    expect(dirs).toContain("app")

    // check the android bundle id has changed
    const androidPackageName = APP_NAME.toLowerCase()
    const mainAppJava = filesystem.read(
      `${appPath}/android/app/src/main/java/com/${androidPackageName}/MainApplication.java`,
    )
    expect(mainAppJava).toContain(`package com.${androidPackageName};`)
    const mainActivityJava = filesystem.read(
      `${appPath}/android/app/src/main/java/com/${androidPackageName}/MainActivity.java`,
    )
    expect(mainActivityJava).toContain(`package com.${androidPackageName};`)

    // react-native-rename doesn't always catch everything, so we need to check for
    // any instances and fail if it doesn't work
    await checkForLeftoverHelloWorld(appPath)

    // other common test operations
    await testSpunUpApp(appPath, originalDir)

    // we're done!
  })
})

const ignoreFolders = ["/xcuserdata", ".git", "node_modules", "Pods", "/build"]

async function checkForLeftoverHelloWorld(filePath: string) {
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
  const appFiles = filesystem.list(filePath)

  for (const file of appFiles) {
    expect(file).not.toContain("helloworld")
    expect(file).not.toContain("HelloWorld")
    expect(file).not.toContain("hello-world")
    await checkForLeftoverHelloWorld(`${filePath}/${file}`)
  }
}
