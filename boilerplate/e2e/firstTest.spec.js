// For more info on how to write Detox tests, see the official docs:
// https://github.com/wix/Detox/blob/master/docs/README.md

// For Expo only, uncomment the next line and delete the reloadApp below it:
// const { reloadApp } = require("detox-expo-helpers")

// For non-Expo:
const reloadApp = async () => device.reloadReactNative()

describe("Example", () => {
  beforeEach(async () => {
    await reloadApp()
  })

  it("should have welcome screen", async () => {
    await expect(element(by.id("WelcomeScreen"))).toBeVisible()
  })

  it("should go to next screen after tap", async () => {
    await element(by.id("next-screen-button")).tap()
    await expect(element(by.id("DemoScreen"))).toBeVisible()
  })
})
