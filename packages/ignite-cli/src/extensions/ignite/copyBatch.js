module.exports = (plugin, command, context) => {
  /**
   * Runs a series of jobs through the templating system.
   *
   * @param {any} context - The Ignite context
   * @param {any[]} jobs - A list of jobs to run.
   * @param {any} props - The props to use for variable replacement.
   */
  async function copyBatch (context, jobs, props) {
    // grab some features
    const { template, prompt, filesystem, ignite } = context
    const { confirm } = prompt
    const { ignitePluginPath } = ignite
    const config = ignite.loadIgniteConfig()

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
          directory: currentPluginPath && `${currentPluginPath}/templates`,
          template: job.template,
          target: job.target,
          props
        })
        // print.info(`    ${print.checkmark} ${job.target}`)
      }
    }
  }

  return copyBatch
}
