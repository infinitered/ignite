const { merge } = require('ramda')

module.exports = (plugin, command, context) => {
  const { filesystem, template } = context

  /**
   * Generates a file from a template with support for sporked template detection.
   *
   * @param  {{}} opts Generation options.
   * @return {string}  The generated string.
   */
  async function generate (opts = {}) {
    // checked for a sporked version
    const sporkDirectory = `${filesystem.cwd()}/ignite/Spork/${context.plugin.name}`
    const isSporked = filesystem.exists(`${sporkDirectory}/${opts.template}`)

    // override the directory to point to the spork directory if we found one
    const overrides = isSporked ? { directory: sporkDirectory } : {}

    // now make the call to the gluegun generate
    return template.generate(merge(opts, overrides))
  }

  return generate
}
