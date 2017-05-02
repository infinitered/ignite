module.exports = (plugin, command, context) => {
  /**
   * Runs a series of jobs through the templating system.
   *
   * @param {any}   context        - The Ignite CLI context
   * @param {any[]} jobs           - A list of jobs to run.
   * @param {any}   props          - The props to use for variable replacement.
   * @param {any}   opts           - Additional options
   * @param {bool}  opts.quiet     - don't write anything (optional)
   * @param {bool}  opts.directory - the directory to use as the template source (optional)
   */
  async function copyBatch (context, jobs, props, opts = {}) {
    // grab some features
    const { template, prompt, filesystem, ignite, print } = context
    const { confirm } = prompt
    const { ignitePluginPath } = ignite
    const config = ignite.loadIgniteConfig()
    const quiet = opts && Boolean(opts.quiet)
    const directory = opts.directory

    // read some configuration
    const askToOverwrite = config.askToOverwrite || false

    // If the file exists
    const shouldGenerate = async target => {
      if (!askToOverwrite) return true
      if (!filesystem.exists(target)) return true
      return await confirm(`overwrite ${target}`)
    }

    // old school loop because of async stuff
    for (let index = 0; index < jobs.length; index++) {
      // grab the current job
      const job = jobs[index]
      // safety check
      if (!job) continue

      // generate the React component
      if (await shouldGenerate(job.target)) {
        const currentPluginPath = ignitePluginPath()
        await template.generate({
          directory: directory || (currentPluginPath && `${currentPluginPath}/templates`),
          template: job.template,
          target: job.target,
          props
        })
        if (!quiet) {
          print.info(`${print.checkmark} ${job.target}`)
        }
      }
    }
  }

  return copyBatch
}
