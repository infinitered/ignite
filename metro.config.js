// Learn more: https://docs.expo.dev/guides/customizing-metro
const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getSentryExpoConfig(__dirname);

config.transformer.getTransformOptions = async () => ({
  transform: {
    // Defers loading of large deps/components. See:
    // https://reactnative.dev/docs/optimizing-javascript-loading
    inlineRequires: true,
  },
});

// Helps support third-party libs that ship .cjs (e.g., Firebase).
config.resolver.sourceExts.push('cjs');

// Ensures axios picks the correct entry point under Metro.
// https://github.com/facebook/metro/issues/1272
config.resolver.unstable_conditionNames = ['require', 'default', 'browser'];

module.exports = withNativeWind(config, { input: './global.css' });
