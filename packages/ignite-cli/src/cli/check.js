// check the node version
var Sniff = require('gluegun/sniff')
var Shell = require('shelljs')

// check the node version
if (!Sniff.isNewEnough) {
  console.log('Node.js 7.6+ is required to run. You have ' + Sniff.nodeVersion + '. Womp, womp.')
  process.exit(1)
}

// check for async and await
if (!Sniff.hasAsyncAwait) {
  console.log('The async feature is not available. Please ensure your Node is up to date.')
  process.exit(2)
}

// check the yarn version is >= 0.20
function getYarnVersion () {
  return Shell.exec('yarn --version', {silent: true}).stdout.replace('\n', '').split('.')
}

function checkYarn (yarnVersion) {
  var major = parseInt(yarnVersion[0], 10)
  var minor = parseInt(yarnVersion[1], 10)
  return (major >= 1) || (minor >= 20)
}

var hasYarn = Shell.which('yarn')
if (hasYarn && !checkYarn(getYarnVersion())) {
  console.log('You have yarn installed but it\'s version ' + getYarnVersion().join('.') + '. Ignite requires yarn 20.0+.')
  console.log('Run `brew upgrade yarn` if you use Homebrew or visit https://yarnpkg.com/en/docs/install.')
  process.exit(3)
}

