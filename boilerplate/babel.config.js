/** @type {import('@babel/core').TransformOptions['plugins']} */
const plugins = [  
  /** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/guides/web-support/ */
  "@babel/plugin-transform-export-namespace-from",
]

/** @type {import('@babel/core').TransformOptions} */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // plugins: [
    //   // Required for expo-router
    //   "expo-router/babel",
    //   "react-native-reanimated/plugin",
    // ]
  };
};
