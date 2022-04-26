/**
 * We're using a custom metro config because we want to support symlinks
 * out of the box. This allows you to use pnpm and/or play better in a monorepo.
 *
 * You can safely delete this file and remove @rnx-kit/metro-* if you're not
 * using PNPM or monorepo or symlinks at all.
 *
 * However, it doesn't hurt to have it either.
 */
const { makeMetroConfig } = require("@rnx-kit/metro-config")
const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks")
const { getDefaultConfig } = require("metro-config")

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig()
  return makeMetroConfig({
    projectRoot: __dirname,
    resolver: {
      resolveRequest: MetroSymlinksResolver(),
      assetExts: [...defaultConfig.resolver.assetExts, "bin"],
    },
  })
})()
