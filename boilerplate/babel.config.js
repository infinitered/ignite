module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
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
    [
      "babel-plugin-root-import",
      {
        paths: [
          {
            rootPathSuffix: "./app/",
            rootPathPrefix: "~/",
          },
          {
            rootPathSuffix: "./storybook/",
            rootPathPrefix: "~/storybook/",
          },
          {
            rootPathSuffix: "./test/",
            rootPathPrefix: "~/test/",
          },
        ],
      },
    ],
  ],
}
