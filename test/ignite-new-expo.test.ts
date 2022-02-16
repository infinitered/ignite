import { filesystem } from "gluegun"
import * as tempy from "tempy"
import { runIgnite, runError, testSpunUpApp } from "./_test-helpers"

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
  test(`ignite new (no name)`, async () => {
    const result = await runError(`new`)
    expect((result as any).stdout).toContain(`Project name is required`)
  })

  test(`ignite new (invalid bundle ID)`, async () => {
    const result = await runError(`new BadBundleID --bundle thisisbad`)
    expect((result as any).stdout).toContain(`Invalid Bundle Identifier.`)
  })
})

describe("Igniting new expo app! 🔥", () => {
  test(`ignite new ${EXPO_APP_NAME} --expo`, async () => {
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
  })
})
