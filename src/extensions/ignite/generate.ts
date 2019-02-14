import { IgniteToolbox } from '../../types'

export default (toolbox: IgniteToolbox) => {
  const { filesystem, template } = toolbox

  /**
   * Generates a file from a template with support for sporked template detection.
   *
   * @param  {{}} opts Generation options.
   * @return {string}  The generated string.
   */
  async function generate(opts: { template: string }) {
    // checked for a sporked version
    const sporkDirectory = `${filesystem.cwd()}/ignite/Spork/${toolbox.plugin.name}`
    const isSporked = filesystem.exists(`${sporkDirectory}/${opts.template}`)

    // override the directory to point to the spork directory if we found one
    const overrides = isSporked ? { directory: sporkDirectory } : {}

    // now make the call to the gluegun generate
    return template.generate(Object.assign({}, opts, overrides))
  }

  return generate
}
