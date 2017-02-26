// check the node version
const { nodeVersion, isNewEnough, hasAsyncAwait } = require('gluegun/sniff')

// check the node version
if (!isNewEnough) {
  console.log(`Node.js 7.6+ is required to run. You have ${nodeVersion}. Womp, womp.`)
  process.exit(1)
}

// check for async and await
if (!hasAsyncAwait) {
  console.log(`The async feature is not available. Please ensure your Node is up to date.`)
  process.exit(2)
}

