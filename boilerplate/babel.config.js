/** @type {import('@babel/core').TransformOptions['plugins']} */
const plugins = [  
  "@babel/plugin-transform-export-namespace-from",
]

/** @type {import('@babel/core').TransformOptions} */
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {},
    },
    plugins,
  };
};