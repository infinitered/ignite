/**
 * We're using a custom metro config because we want to support symlinks
 * out of the box. This allows you to use pnpm and/or play better in a monorepo.
 *
 * You can safely delete this file and remove @rnx-kit/metro-* if you're not
 * using PNPM or monorepo or symlinks at all.
 *
 * However, it doesn't hurt to have it either.
 *
 * We've also added metro-serializer-esbuild so that we can get tree shaking.
 */
const { makeMetroConfig } = require("@rnx-kit/metro-config")
const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks")
const { getDefaultConfig } = require("metro-config")
const { MetroSerializer, esbuildTransformerConfig } = require("@rnx-kit/metro-serializer-esbuild")

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig()
  return makeMetroConfig({
    projectRoot: __dirname,
    // watchFolders: [`${__dirname}/../..`], // enable for monorepos
    resolver: {
      /**
       * This custom resolver is for if you're using symlinks.
       *
       * You can disable it if you're not using pnpm or a monorepo or symlinks.
       */
      resolveRequest: MetroSymlinksResolver(),
      assetExts: [...defaultConfig.resolver.assetExts, "bin"],
    },
    // esbuild custom serializer for speed and tree shaking
    // Note the caveats here: https://github.com/microsoft/rnx-kit/tree/main/packages/metro-serializer-esbuild#known-limitations
    serializer: { customSerializer: MetroSerializer() },
    transformer: esbuildTransformerConfig,
  })
})()
