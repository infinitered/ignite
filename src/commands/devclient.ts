import { GluegunToolbox } from "gluegun"
import * as os from "os"
import * as path from "path"

import { p, heading, warning, startSpinner, stopSpinner, clearSpinners } from "../tools/pretty"

interface GitHubAsset {
  name: string
  browser_download_url: string
}

interface GitHubRelease {
  tag_name: string
  assets: GitHubAsset[]
}

type BuildType = "ios-simulator" | "android-emulator" | "android-device"

const isMac = process.platform === "darwin"

module.exports = {
  description: "Download pre-built Expo development clients from GitHub releases",
  run: async function (toolbox: GluegunToolbox) {
    const { meta, print, prompt, filesystem } = toolbox

    p()
    heading("Ignite Dev Client Downloader")
    p()

    // Get current Ignite version
    const currentVersion = meta.version()
    p(`Current Ignite version: ${currentVersion}`)
    p()

    // Check for dev clients in current version
    startSpinner(`Checking for dev clients in release v${currentVersion}...`)

    let currentReleaseResponse
    try {
      const response = await fetch(
        `https://api.github.com/repos/infinitered/ignite/releases/tags/v${currentVersion}`,
      )
      currentReleaseResponse = await response.text()
    } catch (error) {
      stopSpinner(`Checking for dev clients in release v${currentVersion}...`, "❌")
      warning("Failed to fetch release information from GitHub")
      return
    }

    let currentRelease: GitHubRelease | null = null
    try {
      currentRelease = JSON.parse(currentReleaseResponse)
    } catch (error) {
      // Release doesn't exist or invalid response
      warning("Failed to parse GitHub release")
    }

    const hasAssets = currentRelease?.assets && currentRelease.assets.length > 0

    let selectedRelease = currentRelease

    if (!hasAssets) {
      stopSpinner(`Checking for dev clients in release v${currentVersion}...`, "⚠️ ")
      warning(`No dev clients found for version ${currentVersion}`)
      p()

      // Fetch all releases with assets
      p("Fetching available releases with dev clients...")
      let allReleasesResponse
      try {
        const response = await fetch("https://api.github.com/repos/infinitered/ignite/releases")
        allReleasesResponse = await response.text()
      } catch (error) {
        warning("Failed to fetch releases from GitHub")
        return
      }

      // In the first iteration of this command, we'll get them all, but eventually we may want to limit this to some reasonable number (maybe?)
      let allReleases: GitHubRelease[] = []
      try {
        allReleases = JSON.parse(allReleasesResponse)
      } catch (error) {
        warning("Failed to parse GitHub releases")
        return
      }

      const releasesWithAssets = allReleases.filter(
        (release) => release.assets && release.assets.length > 0,
      )

      if (releasesWithAssets.length === 0) {
        warning("No releases with dev clients found")
        return
      }

      p()
      const { chosenVersion } = await prompt.ask({
        type: "select",
        name: "chosenVersion",
        message: "Select a release to download from:",
        choices: releasesWithAssets.map((release) => release.tag_name),
      })

      selectedRelease = releasesWithAssets.find((r) => r.tag_name === chosenVersion) || null
    } else {
      stopSpinner(`Checking for dev clients in release v${currentVersion}...`, "✅")
    }

    if (!selectedRelease || !selectedRelease.assets) {
      warning("No assets found for selected release")
      return
    }

    // Map assets to build types
    const availableBuilds: { type: BuildType; asset: GitHubAsset }[] = []

    selectedRelease.assets.forEach((asset) => {
      if (asset.name.includes("ios-sim-build")) {
        availableBuilds.push({ type: "ios-simulator", asset })
      } else if (asset.name.includes("android-sim-build")) {
        availableBuilds.push({ type: "android-emulator", asset })
      } else if (asset.name.includes("android-device-build")) {
        availableBuilds.push({ type: "android-device", asset })
      }
    })

    if (availableBuilds.length === 0) {
      warning("No development client builds found in this release")
      return
    }

    // Prompt user to select build type
    p()
    const buildTypeLabels: Record<BuildType, string> = {
      "ios-simulator": "iOS Simulator",
      "android-emulator": "Android Emulator",
      "android-device": "Android Device",
    }

    const buildTypeChoices = availableBuilds.map((build) => {
      return {
        name: build.type,
        message: buildTypeLabels[build.type],
        value: build.type,
      }
    })

    const { buildType } = await prompt.ask<{ buildType: BuildType }>({
      type: "select",
      name: "buildType",
      message: "Which dev client do you want to download?",
      choices: buildTypeChoices,
    })

    const selectedBuild = availableBuilds.find((build) => build.type === buildType)
    if (!selectedBuild) {
      warning("Invalid build selection")
      return
    }

    // Download the file
    const downloadUrl = selectedBuild.asset.browser_download_url
    const fileName = selectedBuild.asset.name
    const targetPath = filesystem.path(process.cwd(), fileName)

    p()
    startSpinner(`Downloading ${fileName}...`)

    try {
      const response = await fetch(downloadUrl)
      const buffer = await response.arrayBuffer()
      filesystem.write(targetPath, Buffer.from(buffer))
      stopSpinner(`Downloading ${fileName}...`, "✅")
      p()
      print.success(`✅ Downloaded to: ${targetPath}`)
      p()
    } catch (error) {
      stopSpinner(`Downloading ${fileName}...`, "❌")
      warning(`Failed to download file: ${error.message}`)
      clearSpinners()
      process.exit(1)
    }

    // Install and launch based on build type
    if (buildType === "ios-simulator") {
      await installAndLaunchIOS(toolbox, targetPath)
    } else if (buildType === "android-emulator") {
      await installAndLaunchAndroid(toolbox, targetPath)
    } else {
      // We don't support installing directly to an Android device yet, log a message about it.
      p()
      print.info(
        "📱 For Android device builds, transfer the APK to your device and install manually.",
      )
      p()
    }

    clearSpinners()
    process.exit(0)
  },
}

async function installAndLaunchIOS(toolbox: GluegunToolbox, tarPath: string) {
  const { print, system, filesystem } = toolbox

  if (!isMac) {
    p()
    warning("⚠️  iOS Simulator installation is only available on macOS")
    p()
    return
  }

  p()
  startSpinner("Extracting iOS build...")

  // Extract the .tar.gz file
  const extractDir = path.join(os.tmpdir(), `ignite-ios-${Date.now()}`)
  filesystem.dir(extractDir)

  try {
    await system.run(`tar -xzf "${tarPath}" -C "${extractDir}"`)
    stopSpinner("Extracting iOS build...", "✅")
  } catch (error) {
    stopSpinner("Extracting iOS build...", "❌")
    warning(`Failed to extract: ${error.message}`)
    return
  }

  // Find the .app file
  const files = filesystem.list(extractDir) || []
  const appFile = files.find((f) => f.endsWith(".app"))

  if (!appFile) {
    warning("No .app file found in archive")
    return
  }

  const appPath = path.join(extractDir, appFile)

  // Get list of available simulators
  startSpinner("Finding iOS Simulators...")
  let simulatorList
  try {
    simulatorList = await system.run("xcrun simctl list devices available --json", { trim: true })
    stopSpinner("Finding iOS Simulators...", "✅")
  } catch (error) {
    stopSpinner("Finding iOS Simulators...", "❌")
    warning("Failed to list simulators. Make sure Xcode is installed.")
    return
  }

  let devices
  try {
    const simData = JSON.parse(simulatorList)
    devices = simData.devices
  } catch (error) {
    warning("Failed to parse simulator list")
    return
  }

  // Find a booted simulator or boot one
  let bootedDevice: { udid: string; name: string } | null = null

  for (const runtime in devices) {
    const runtimeDevices = devices[runtime]
    const booted = runtimeDevices.find((d: any) => d.state === "Booted")
    if (booted) {
      bootedDevice = { udid: booted.udid, name: booted.name }
      break
    }
  }

  // If no booted simulator, boot the first available one
  if (!bootedDevice) {
    p()
    startSpinner("Booting iOS Simulator...")

    // Find first available iOS (not watchOS or tvOS) simulator
    let firstDevice: { udid: string; name: string; runtime: string } | null = null
    for (const runtime in devices) {
      if (runtime.includes("iOS") && !runtime.includes("watch")) {
        const runtimeDevices = devices[runtime]
        if (runtimeDevices.length > 0 && runtimeDevices[0].isAvailable !== false) {
          firstDevice = {
            udid: runtimeDevices[0].udid,
            name: runtimeDevices[0].name,
            runtime,
          }
          break
        }
      }
    }

    if (!firstDevice) {
      stopSpinner("Booting iOS Simulator...", "❌")
      warning("No available iOS simulators found")
      return
    }

    try {
      await system.run(`xcrun simctl boot ${firstDevice.udid}`)
      // Open Simulator.app
      await system.run("open -a Simulator")
      stopSpinner("Booting iOS Simulator...", "✅")
      bootedDevice = { udid: firstDevice.udid, name: firstDevice.name }
      // Wait a bit for simulator to fully boot
      await new Promise((resolve) => setTimeout(resolve, 3000))
    } catch (error) {
      stopSpinner("Booting iOS Simulator...", "❌")
      warning(`Failed to boot simulator: ${error.message}`)
      return
    }
  }

  // Install app on the booted simulator
  p()
  startSpinner(`Installing on ${bootedDevice.name}...`)
  try {
    await system.run(`xcrun simctl install ${bootedDevice.udid} "${appPath}"`)
    stopSpinner(`Installing on ${bootedDevice.name}...`, "✅")
  } catch (error) {
    stopSpinner(`Installing on ${bootedDevice.name}...`, "❌")
    warning(`Failed to install: ${error.message}`)
    return
  }

  // Get bundle ID from the app
  startSpinner("Launching app...")
  try {
    const infoPlistPath = path.join(appPath, "Info.plist")
    const bundleIdOutput = await system.run(
      `/usr/libexec/PlistBuddy -c "Print CFBundleIdentifier" "${infoPlistPath}"`,
      { trim: true },
    )
    const bundleId = bundleIdOutput.trim()

    await system.run(`xcrun simctl launch ${bootedDevice.udid} ${bundleId}`)
    stopSpinner("Launching app...", "✅")

    p()
    print.success(`🚀 App launched on ${bootedDevice.name}`)
    p()
  } catch (error) {
    stopSpinner("Launching app...", "❌")
    warning(`App installed but failed to launch: ${error.message}`)
    p()
  }

  // Cleanup
  filesystem.remove(extractDir)
}

async function installAndLaunchAndroid(toolbox: GluegunToolbox, apkPath: string) {
  const { print, system } = toolbox

  // Check if adb is available
  startSpinner("Checking for Android SDK...")
  try {
    await system.run("adb version")
    stopSpinner("Checking for Android SDK...", "✅")
  } catch (error) {
    stopSpinner("Checking for Android SDK...", "❌")
    warning("adb not found. Make sure Android SDK is installed and in your PATH.")
    p()
    return
  }

  // Get list of devices/emulators
  startSpinner("Finding Android devices...")
  let deviceList
  try {
    deviceList = await system.run("adb devices", { trim: true })
    stopSpinner("Finding Android devices...", "✅")
  } catch (error) {
    stopSpinner("Finding Android devices...", "❌")
    warning("Failed to list devices")
    return
  }

  const lines = deviceList.split("\n").slice(1) // Skip header
  const devices = lines
    .filter((line) => line.trim() && line.includes("device"))
    .map((line) => line.split("\t")[0])

  if (devices.length === 0) {
    p()
    warning("⚠️  No Android emulators or devices found running.")
    print.info("Please start an Android emulator and run this command again.")
    p()
    return
  }

  // Use first device (or could prompt user to select)
  const device = devices[0]
  const isEmulator = device.startsWith("emulator-")

  p()
  startSpinner(`Installing on ${isEmulator ? "emulator" : "device"} ${device}...`)

  try {
    await system.run(`adb -s ${device} install -r "${apkPath}"`)
    stopSpinner(`Installing on ${isEmulator ? "emulator" : "device"} ${device}...`, "✅")
  } catch (error) {
    stopSpinner(`Installing on ${isEmulator ? "emulator" : "device"} ${device}...`, "❌")
    warning(`Failed to install: ${error.message}`)
    return
  }

  // Get package name and launch
  startSpinner("Launching app...")
  try {
    // For Expo dev clients, we know the package name pattern
    // Try to extract it from the APK filename first
    path.basename(apkPath)

    // Use adb to list packages and find the one we just installed
    // This is more reliable than trying to parse the APK
    const packagesOutput = await system.run(
      `adb -s ${device} shell pm list packages -3 | grep -E "(expo|ignite)"`,
      { trim: true },
    )

    const lines = packagesOutput.split("\n")
    let packageName = null

    // Look for expo.modules.devmenu or expo.modules.devclient or host.exp.exponent
    for (const line of lines) {
      const pkg = line.replace("package:", "").trim()
      if (pkg.includes("host.exp.exponent") || pkg.includes("expo")) {
        packageName = pkg
        break
      }
    }

    if (!packageName) {
      // Fallback: try common Expo dev client package names
      packageName = "host.exp.exponent"
    }

    // Launch the app - Expo dev client uses .MainActivity
    await system.run(`adb -s ${device} shell monkey -p ${packageName} 1`)
    stopSpinner("Launching app...", "✅")

    p()
    print.success(`🚀 App launched on ${isEmulator ? "emulator" : "device"}`)
    p()
  } catch (error) {
    stopSpinner("Launching app...", "❌")
    warning(`App installed but failed to launch: ${error.message}`)
    p()
    print.info("You can manually launch the app from your device.")
    p()
  }
}
