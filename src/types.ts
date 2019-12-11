import { GluegunToolbox, GluegunCommand } from 'gluegun'

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
  boilerplateName: () => string | void
  boilerplateVersion: () => string | void
  patching: {
    prependToFile
    insertInFile
    replaceInFile
    isInFile
  }
}

export type ReactNativeTools = {
  install(opts: {
    name?: string
    version?: string
    template?: string
    skipJest?: boolean
    useNpm?: boolean
  }): Promise<IgniteRNInstallResult>
}

export interface IgniteToolbox extends GluegunToolbox {
  ignite: IgniteTools
  reactNative: ReactNativeTools
}

export interface IgnitePlugin {
  name: string
  directory: string
  commands: GluegunCommand<IgniteToolbox>[]
}

export type IgniteConfig = {
  generators?: string[]
}

export type IgniteDetectInstall = {
  moduleName: string
  type: 'directory' | 'npm' | 'git'
  directory?: string
  override?: boolean
  version?: string
  error?: string
  url?: string
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

export type IgniteProjectConfig = {
  createdWith?: string
  boilerplate?: string
  boilerplateVersion?: string
  examples?: string[]
}
