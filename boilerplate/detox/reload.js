let isExpo = false
try {
  const Constants = require("expo-constants")
  // True if the app is running in an `expo build` app or if it's running in Expo Go.
  isExpo =
    Constants.executionEnvironment === "standalone" ||
    Constants.executionEnvironment === "storeClient"
} catch {}

let reloadConfig = async () => device.reloadReactNative()
if (isExpo) {
  const { reloadApp } = require("detox-expo-helpers")
  reloadConfig = reloadApp
}

module.exports = { reloadApp: reloadConfig }
