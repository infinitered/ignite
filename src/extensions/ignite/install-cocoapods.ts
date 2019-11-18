import { IgniteToolbox } from '../../types'

export default (toolbox: IgniteToolbox) => {
  const installCocoapods = async () => {
    const { system, print, ignite } = toolbox
    const { log } = ignite

    log(`installing cocoapods ...`)
    let spinner = print.spin(`installing cocoapods ...`)
    await system.run(`cd ios/ && pod install`)
    spinner.succeed(`installing cocoapods complete`)
  }

  return installCocoapods
}
