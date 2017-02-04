// @cliDescription Checks your dev environment for dependencies.
// ----------------------------------------------------------------------------

const { split, last, replace, head, match } = require('ramda')
const header = require('../brand/header')
const os = require('os')

module.exports = async function (context) {
  // fistful of features
  const {
    filesystem: { read },
    system: { run, which },
    print: { colors, info, table },
    strings: { padEnd }
  } = context

  // ... be the CLI you wish to see in the world
  const platform = process.platform
  const arch = os.arch()
  const cpus = os.cpus() || []
  const firstCpu = head(cpus) || {}
  const cpu = `${firstCpu.model}`
  const cores = `${cpus.length} cores`
  const ignitePath = which('ignite')
  const igniteVersion = await run('ignite version', { trim: true })
  const nodePath = which('node')
  const npmVersion = await run('npm --version', { trim: true })
  const npmPath = which('npm')
  const nodeVersion = replace('v', '', await run('node --version', { trim: true }))
  const rnCli = split(/\s/, await run('react-native --version', { trim: true }))[1] // lulz
  const xcodeVersion = split(/\s/, await run('xcodebuild -version', { trim: true }))[1] // lulz
  const rnPkg = read(`${process.cwd()}/node_modules/react-native/package.json`, 'json')
  const appReactNativeVersion = rnPkg ? rnPkg.version : '-'
  const androidPath = process.env['ANDROID_HOME']
  const javaVersionCmd = process.platform === 'win32' ? 'java -version' : 'java -version 2>&1'
  const javaVersion = last(match(/"(.*)"/, await run(javaVersionCmd)))
  const javaPath = which('java')

  // display helpers
  const column1 = (label, length = 16) => padEnd(label, length)
  const column2 = label => colors.yellow(padEnd(label, 10))
  const column3 = label => colors.muted(label)

  // print ignite
  header()
  info('')

  info(colors.cyan('System'))
  table([
    [column1('platform'), column2(platform)],
    [column1('arch'), column2(arch)],
    [column1('cpu'), column2(cores), column3(cpu)]
  ])

  info('')
  info(colors.cyan('JavaScript'))
  table([
    [column1('node'), column2(nodeVersion), column3(nodePath)],
    [column1('npm'), column2(npmVersion), column3(npmPath)]
  ])

  info('')
  info(colors.cyan('React Native'))
  table([
    [column1('react-native-cli'), column2(rnCli)],
    [column1('app rn version'), column2(appReactNativeVersion)],
  ])

  info('')
  info(colors.cyan('Ignite'))
  table([
    [column1('ignite'), column2(igniteVersion), column3(ignitePath)]
  ])

  info('')
  info(colors.cyan('Native Mobile Platforms'))
  table([
    [column1('xcode'), column2(xcodeVersion)],
    [column1('java'), column2(javaVersion), column3(javaPath)],
    [column1('android home'), column2('-'), column3(androidPath)]
  ])
}
