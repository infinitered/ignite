import { IgniteToolbox, IgniteProjectConfig } from '../types'

export default async function attachIgnite(toolbox: IgniteToolbox, projectConfig: IgniteProjectConfig) {
  const { ignite, filesystem } = toolbox

  // save ignite config
  ignite.setIgniteConfig(projectConfig)

  // the plugins folder
  filesystem.write('ignite/plugins/.gitkeep', '')
}
