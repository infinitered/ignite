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
// const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks")
const { getDefaultConfig } = require("metro-config")

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig()
  return makeMetroConfig({
    projectRoot: __dirname,
    // watchFolders: [`${__dirname}/../..`], // for monorepos
    resolver: {
      /**
       * This custom resolver is for if you're using symlinks.
       * It's disabled because it results in an error for now, specifically:
       *
       * error: Error: Unable to resolve module PROJECTDIR/node_modules/metro-runtime/src/modules/empty-module.js
       * from PROJECTDIR/_: PROJECTDIR/node_modules/metro-runtime/src/modules/empty-module.js could not be found
       *
       * This could be a bug in @rnx-kit/metro-resolver-symlinks.
       *
       * Issue over there: https://github.com/microsoft/rnx-kit/issues/1605
       *
       */
      // resolveRequest: MetroSymlinksResolver(),
      assetExts: [...defaultConfig.resolver.assetExts, "bin"],
    },
  })
})()
