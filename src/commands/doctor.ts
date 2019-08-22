import { split, last, replace, head, match } from 'ramda'
import * as os from 'os'
import { IgniteToolbox } from '../types'

const isWindows = process.platform === 'win32'
const isMac = process.platform === 'darwin'

module.exports = {
  description: 'Checks your dev environment for dependencies.',
  run: async function(toolbox: IgniteToolbox) {
    // fistful of features
    const {
      filesystem: { read },
      system: { run, which },
      print: { colors, info, table },
      strings: { padEnd },
      ignite,
    } = toolbox

    // display helpers
    const column1 = (label, length = 16) => padEnd(label || '', length)
    const column2 = label => colors.yellow(padEnd(label || '-', 10))
    const column3 = label => colors.muted(label)

    // -=-=-=- system -=-=-=-
    const platform = process.platform
    const arch = os.arch()
    const cpus = os.cpus() || []
    const firstCpu = head(cpus) || { model: undefined }
    const cpu = `${firstCpu.model}`
    const cores = `${cpus.length} cores`
    const directory = `${process.cwd()}`

    info(colors.cyan('System'))
    table([
      [column1('platform'), column2(platform)],
      [column1('arch'), column2(arch)],
      [column1('cpu'), column2(cores), column3(cpu)],
      [column1('directory'), column2(directory)],
    ])

    // -=-=-=- javascript -=-=-=-
    const nodePath = which('node')
    const nodeVersion = replace('v', '', await run('node --version', { trim: true }))
    const npmPath = which('npm')
    const npmVersion = npmPath && (await run('npm --version', { trim: true }))
    let yarnPath = which('yarn')
    const yarnVersion = yarnPath && (await run('yarn --version', { trim: true }))
    yarnPath = yarnPath || 'not installed'

    info('')
    info(colors.cyan('JavaScript'))
    table([
      [column1('node'), column2(nodeVersion), column3(nodePath)],
      [column1('npm'), column2(npmVersion), column3(npmPath)],
      [column1('yarn'), column2(yarnVersion), column3(yarnPath)],
    ])

    // -=-=-=- react native -=-=-=-
    const rnPath = which('react-native')
    const rnCli = rnPath && split(/\s/, await run('react-native --version', { trim: true }))[1] // lulz
    const rnPkg = read(`${process.cwd()}/node_modules/react-native/package.json`, 'json')
    const appReactNativeVersion = rnPkg && rnPkg.version

    info('')
    info(colors.cyan('React Native'))
    const rnTable = []
    rnTable.push([column1('react-native-cli'), column2(rnCli)])
    if (appReactNativeVersion) {
      rnTable.push([column1('app rn version'), column2(appReactNativeVersion)])
    }
    table(rnTable)

    // -=-=-=- ignite -=-=-=-
    const ignitePath = which('ignite')
    const igniteVersion = await run('ignite version', { trim: true })
    const igniteJson = ignite.loadIgniteConfig()

    info('')
    info(colors.cyan('Ignite'))
    const igniteTable = []
    igniteTable.push([column1('ignite-cli'), column2(igniteVersion), column3(ignitePath)])
    if (igniteJson) {
      Object.keys(igniteJson).forEach(k => {
        const v = typeof igniteJson[k] === 'object' ? JSON.stringify(igniteJson[k]) : igniteJson[k]
        igniteTable.push([column1(k), column2(v), column3('')])
      })
    }

    table(igniteTable)

    // -=-=-=- android -=-=-=-
    const androidPath = process.env['ANDROID_HOME']
    const javaPath = which('java')
    const javaVersionCmd = isWindows ? 'java -version' : 'java -version 2>&1'
    const javaVersion = javaPath && last(match(/"(.*)"/, await run(javaVersionCmd)))

    info('')
    info(colors.cyan('Android'))
    table([
      [column1('java'), column2(javaVersion), column3(javaPath)],
      [column1('android home'), column2('-'), column3(androidPath)],
    ])

    // -=-=-=- iOS -=-=-=-
    if (isMac) {
      const xcodePath = which('xcodebuild')
      const xcodeVersion = xcodePath && split(/\s/, await run('xcodebuild -version', { trim: true }))[1] // lulz

      info('')
      info(colors.cyan('iOS'))
      table([[column1('xcode'), column2(xcodeVersion)]])

      const cocoaPodsPath = which('pod') || ''
      const cocoaPodsVersion = cocoaPodsPath ? await run('pod --version', { trim: true }) : 'Not installed'
      table([[column1('cocoapods'), column2(cocoaPodsVersion), column3(cocoaPodsPath)]])
    }

    // -=-=-=- windows -=-=-=-
    // TODO: what can we check on Windows?
    if (isWindows) {
      // info('')
      // info(colors.cyan('Windows'))
      // table([])
    }
  },
}
