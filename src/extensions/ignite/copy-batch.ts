import { IgniteToolbox, IgniteCopyJob } from '../../types'

export type CopyBatchOptions = {
  quiet?: boolean
  directory?: string
}

export default (toolbox: IgniteToolbox) => {
  function findSpork(toolbox, template) {
    const { filesystem } = toolbox
    const sporkDirectory = `${filesystem.cwd()}/ignite/Spork/${toolbox.plugin.name}`

    return filesystem.exists(`${sporkDirectory}/${template}`) ? sporkDirectory : false
  }

  /**
   * Runs a series of jobs through the templating system.
   */
  async function copyBatch(toolbox: IgniteToolbox, jobs: IgniteCopyJob[], props: any, opts: CopyBatchOptions = {}) {
    // grab some features
    const { template, prompt, filesystem, ignite, print } = toolbox
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
      return confirm(`overwrite ${target}`)
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

        const sporkDirectory = findSpork(toolbox, job.template)

        await template.generate({
          directory: directory || sporkDirectory || (currentPluginPath && `${currentPluginPath}/templates`),
          template: job.template,
          target: job.target,
          props,
        })

        if (!quiet) {
          print.info(`${print.checkmark} ${job.target}`)
        }
      }
    }
  }

  return copyBatch
}
