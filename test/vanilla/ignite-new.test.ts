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

    await testSpunUpApp(appPath, originalDir)

    // we're done!
  })
})
