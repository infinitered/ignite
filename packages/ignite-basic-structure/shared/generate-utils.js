/**
 * A helper for generating a bunch of templates.
 *
 * @param {RunContext} context The RunContext
 * @param {[]}         jobs    The jobs to generate.
 */
module.exports = async function (context, jobs, props) {
  // grab some features
  const { config, template, prompt, filesystem, print } = context
  const { generate } = template
  const { confirm } = prompt

  // read some configuration
  const { askToOverwrite } = config.ignite

  // If the file exists
  const shouldGenerate = async (target) => {
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
      await generate({
        template: job.template,
        target: job.target,
        props
      })
      print.info(`${print.checkmark} ${job.target}`)
    }
  }
}
