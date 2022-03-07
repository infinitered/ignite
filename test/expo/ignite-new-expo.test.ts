import { filesystem } from "gluegun"
import * as tempy from "tempy"
import { runIgnite, testSpunUpApp } from "../_test-helpers"

const EXPO_APP_NAME = "Bar"

const originalDir = process.cwd()
let tempDir: string

beforeEach(() => {
  tempDir = tempy.directory({ prefix: "ignite-expo-" })
})

afterEach(() => {
  filesystem.remove(tempDir) // clean up our mess
})

describe("Igniting new expo app! 🔥", () => {
  test(`ignite new ${EXPO_APP_NAME} --expo`, async () => {
    const result = await runIgnite(`new ${EXPO_APP_NAME} --expo --debug`, {
      pre: `cd ${tempDir}`,
      post: `cd ${originalDir}`,
    })

    expect(result).toContain(`Using expo-cli`)
    expect(result).toContain(`Ignite CLI ignited ${EXPO_APP_NAME}`)

    // now let's examine the spun-up app
    // process.chdir(EXPO_APP_NAME)

    const appPath = filesystem.path(tempDir, EXPO_APP_NAME)

    const dirs = filesystem.list(appPath)
    expect(dirs).not.toContain("ios")
    expect(dirs).not.toContain("android")
    expect(dirs).toContain("app")

    await testSpunUpApp(appPath, originalDir)

    // we're done!
  })
})
