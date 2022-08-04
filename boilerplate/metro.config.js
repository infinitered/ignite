const { getDefaultConfig } = require("metro-config")

let metroConfig
let isExpo = false
try {
  const Constants = require("expo-constants")
  // True if the app is running in an `expo build` app or if it's running in Expo Go.
  isExpo =
    Constants.executionEnvironment === "standalone" ||
    Constants.executionEnvironment === "storeClient"
} catch {}

if (isExpo) {
  /**
   *  Expo metro config
   * Learn more https://docs.expo.io/guides/customizing-metro

   * For one idea on how to support symlinks in Expo, see:
   * https://github.com/infinitered/ignite/issues/1904#issuecomment-1054535068
   */
  metroConfig = getDefaultConfig(__dirname)
} else {
  /**
   * Vanilla metro config - we're using a custom metro config because we want to support symlinks
   * out of the box. This allows you to use pnpm and/or play better in a monorepo.
   *
   * You can safely delete this file and remove @rnx-kit/metro-* if you're not
   * using PNPM or monorepo or symlinks at all.
   *
   * However, it doesn't hurt to have it either.
   */
  const { makeMetroConfig } = require("@rnx-kit/metro-config")
  const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks")

  metroConfig = (async () => {
    const defaultConfig = await getDefaultConfig()
    return makeMetroConfig({
      projectRoot: __dirname,
      // watchFolders: [`${__dirname}/../..`], // for monorepos
      resolver: {
        /**
         * This custom resolver is for if you're using symlinks.
         *
         * You can disable it if you're not using pnpm or a monorepo or symlinks.
         */
        resolveRequest: MetroSymlinksResolver(),
        assetExts: [...defaultConfig.resolver.assetExts, "bin"],
      },
    })
  })()
}

module.exports = metroConfig
