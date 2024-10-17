const { engines } = require("../package.json")
const currentNodeVersion = process.version
const requiredNodeVersion = engines.node

const compareVersions = (current, required) => {
  const currentParts = current.replace("v", "").split(".")
  const requiredParts = required.replace(">=", "").replace("<", "").split(".")

  for (let i = 0; i < requiredParts.length; i++) {
    const currentPart = parseInt(currentParts[i] || 0, 10)
    const requiredPart = parseInt(requiredParts[i] || 0, 10)

    if (currentPart > requiredPart) {
      return true // Current version is higher
    }
    if (currentPart < requiredPart) {
      return false // Current version is lower
    }
  }
  return true // Versions match
}

if (!compareVersions(currentNodeVersion, requiredNodeVersion)) {
  console.error(
    `Required Node.js version ${requiredNodeVersion} not satisfied with current version ${currentNodeVersion}.`,
  )
  process.exit(1)
}

console.log("Node.js version is compatible.")
