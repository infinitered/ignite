// check the node version
const { nodeVersion, isNewEnough, hasAsyncAwait } = require('gluegun/sniff')
const Shell = require('shelljs')
const { HOSTILE_ENVIRONMENT } = require('../lib/exitCodes')

// check the node version
if (!isNewEnough) {
  console.log(`Node.js 7.6+ is required to run. You have ${nodeVersion}. Womp, womp.`)
  process.exit(HOSTILE_ENVIRONMENT)
}

// check for async and await
if (!hasAsyncAwait) {
  console.log(`The async feature is not available. Please ensure your Node is up to date.`)
  process.exit(HOSTILE_ENVIRONMENT)
}

// check if we're strict, because RN is not!
let angryGit = Shell.exec('git config --global core.safecrlf', {silent: true})
if (angryGit.stdout === 'true\n') {
  console.error(`
    Git safecrlf with the current version of react-native is likely to fail.  
    Consider turning this off, or adding your opinion to the open RN ticket.
    See here for more info:  https://github.com/facebook/react-native/issues/12724
  `)
  process.exit(HOSTILE_ENVIRONMENT)
}

// check the yarn version is >= 0.20
const getYarnVersion = () => {
  return Shell.exec('yarn --version', {silent: true}).stdout.replace('\n', '').split('.')
}

const checkYarn = (yarnVersion) => {
  const major = parseInt(yarnVersion[0], 10)
  const minor = parseInt(yarnVersion[1], 10)
  return (major >= 1) || (minor >= 20)
}

const hasYarn = Shell.which('yarn')
if (hasYarn && !checkYarn(getYarnVersion())) {
  console.log(`You have yarn installed but it's version ${getYarnVersion().join('.')}. Ignite requires yarn 20.0+.`)
  console.log('Run `brew upgrade yarn` if you use Homebrew or visit https://yarnpkg.com/en/docs/install.')
  process.exit(HOSTILE_ENVIRONMENT)
}

