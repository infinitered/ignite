import { GluegunToolbox } from 'gluegun'

export type IgniteTools = {
  ignitePluginPath: Function
  setIgnitePluginPath: Function
  useYarn: boolean
  loadIgniteConfig: Function
  saveIgniteConfig: Function
  setIgniteConfig: Function
  removeIgniteConfig: Function
  findIgnitePlugins: Function
  addModule: Function
  addAndroidPermission: Function
  removeModule: Function
  copyBatch: Function
  addPluginComponentExample: Function
  removePluginComponentExample: Function
  addPluginScreenExamples: Function
  removePluginScreenExamples: Function
  removeAndroidPermission: Function
  setDebugConfig: Function
  removeDebugConfig: Function
  patchInFile: Function
  log: Function
  pluginOverrides: string[]
  patching: {
    prependToFile
    insertInFile
    replaceInFile
    isInFile
  }
}

export interface IgniteToolbox extends GluegunToolbox {
  ignite: IgniteTools
}

export interface IgnitePlugin {
  name: string
  directory: string
  commands: any[]
}

export type IgniteConfig = {
  generators?: string[]
}

export type IgniteDetectInstall = {
  moduleName: string
  type: 'directory' | 'npm'
  directory?: string
  override?: boolean
  version?: string
  error?: string
}

export type IgniteNPMPackageParts = {
  name: string
  scoped: boolean
  version?: string
}

export type IgnitePatchInFileOptions = {
  before?: string
  after?: string
  replace?: string
  insert?: string
  delete?: string
  force?: boolean
}

export type IgniteRNInstallResult = {
  exitCode: number
  version: string
  template: string
}

export type IgnitePluginScreenFile = {
  screen: string
  ancillary: string[]
  title?: string
}

export type IgniteCopyJob = {
  target: string
  template: string
}
