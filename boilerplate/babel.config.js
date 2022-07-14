module.exports = {
  presets: [["@rnx-kit/babel-preset-metro-react-native", { unstable_transformProfile: "esbuild" }]],
  env: {
    production: {},
  },
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],
  ],
}
