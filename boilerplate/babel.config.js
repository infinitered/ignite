/** @type {import('@babel/core').TransformOptions} */
module.exports = function(api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
  }
}
