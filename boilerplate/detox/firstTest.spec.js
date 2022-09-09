// For more info on how to write Detox tests, see the official docs:
// https://github.com/wix/Detox/blob/master/docs/README.md

const { reloadApp } = require("./reload")

describe("Example", () => {
  beforeEach(async () => {
    await reloadApp()
  })

  it("should have the login screen first", async () => {
    await expect(element(by.id("login-heading"))).toBeVisible()
  })

  it("should go to welcome screen after logging in", async () => {
    await element(by.id("login-button")).tap()
    await expect(element(by.id("welcome-heading"))).toBeVisible()
  })
})
