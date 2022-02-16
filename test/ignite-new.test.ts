import { filesystem } from "gluegun"
import * as tempy from "tempy"
import { runIgnite, runError, testSpunUpApp } from "./_test-helpers"

const APP_NAME = "Foo"

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
    const result = await runIgnite(`new ${APP_NAME} --debug`)

    expect(result).toContain(`Using ignite-cli`)
    expect(result).toContain(`Ignite CLI ignited ${APP_NAME}`)

    // now let's examine the spun-up app
    process.chdir(APP_NAME)

    const dirs = filesystem.list(`.`)
    expect(dirs).toContain("ios")
    expect(dirs).toContain("android")
    expect(dirs).toContain("app")

    // check the android bundle id has changed
    const androidPackageName = APP_NAME.toLowerCase()
    const mainAppJava = filesystem.read(
      `./android/app/src/main/java/com/${androidPackageName}/MainApplication.java`,
    )
    expect(mainAppJava).toContain(`package com.${androidPackageName};`)
    const mainActivityJava = filesystem.read(
      `./android/app/src/main/java/com/${androidPackageName}/MainActivity.java`,
    )
    expect(mainActivityJava).toContain(`package com.${androidPackageName};`)

    await testSpunUpApp()

    // we're done!
    process.chdir("..")
  })
})
