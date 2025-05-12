import en from "../app/i18n/en"
import { exec } from "child_process"
import path from "path"
import fs from "fs"

function findAppDirectory(): string {
  const currentDir = process.cwd()

  // If we are in an Ignite environment (temporary directory)
  if (currentDir.includes("ignite-")) {
    // Try to find the actual temporary directory
    const tempPaths = [
      // macOS path
      "/private/var/folders",
      // Other common temp paths, for CicleCI for example
      "/tmp",
      currentDir,
    ]

    for (const tempPath of tempPaths) {
      if (fs.existsSync(tempPath)) {
        // Recursively search for the first directory that starts with 'ignite-'
        const findIgniteDir = (startPath: string): string | null => {
          const files = fs.readdirSync(startPath)
          for (const file of files) {
            const fullPath = path.join(startPath, file)
            if (file.startsWith("ignite-") && fs.statSync(fullPath).isDirectory()) {
              const appDir = path.join(fullPath, "Foo", "app")
              if (fs.existsSync(appDir)) return appDir
            }
          }
          return null
        }

        const appDir = findIgniteDir(tempPath)
        if (appDir) return appDir
      }
    }
  }

  // Alternative paths if we don't find it in the temporary directory
  const possiblePaths = [
    path.join(process.cwd(), "app"),
    path.join(__dirname, "..", "app"),
    path.join(process.cwd().split("node_modules")[0], "app"),
  ]

  for (const dir of possiblePaths) {
    if (fs.existsSync(dir)) {
      return dir
    }
  }

  throw new Error(`Could not find the 'app' directory. Current directory: ${currentDir}`)
}

const CONFIG = {
  srcDir: findAppDirectory(),
  grepRegex: `[Tt]x=[{]?\\\\"[^\\"]*\\\\"[}]?\\|translate(\\\\"[^\\"]*\\\\"`,
  exceptions: [] as string[],
  retryLimit: 3,
}

/**
 * Recursively collects all keys from the translation object and returns them in dot notation.
 * This function traverses the entire object to collect all keys, even nested ones.
 *
 * @param obj - The translation object (typically `en`)
 * @param prefix - A prefix for nested keys (used for recursion)
 * @param keys - An accumulator array to store collected keys
 * @returns An array of collected keys
 */
function collectKeys(obj: Record<string, any>, prefix = "", keys: string[] = []): string[] {
  for (const [key, value] of Object.entries(obj)) {
    const currentKey = prefix ? `${prefix}.${key}` : key
    if (typeof value === "object" && value !== null) {
      collectKeys(value, currentKey, keys)
    } else {
      keys.push(currentKey)
    }
  }
  return keys
}

/**
 * Executes a shell command with retries in case of failure.
 * This is used to run the `grep` command that scans the codebase for i18n keys.
 *
 * @param command - The command to execute
 * @param retries - Number of retries in case of failure
 * @returns A promise resolving with the output of the command
 */
function execWithRetries(command: string, retries: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const attempt = (triesLeft: number) => {
      exec(command, (error, stdout) => {
        if (error) {
          if (triesLeft > 0) {
            console.warn(`Command failed, retrying... (${triesLeft} retries left)`)
            return attempt(triesLeft - 1)
          }
          return reject(new Error(`Command failed after multiple attempts: ${error.message}`))
        }
        resolve(stdout.trim())
      })
    }
    attempt(retries)
  })
}

/**
 * The main test that checks for missing and unused translation keys.
 * It runs a `grep` command to find i18n keys used in the codebase, compares them to the keys defined in the `en` object,
 * and reports missing or unused keys.
 */
describe("i18n", () => {
  test("There are no missing or unused keys", async () => {
    if (!fs.existsSync(CONFIG.srcDir)) {
      throw new Error(`Directory not found: ${CONFIG.srcDir}`)
    }

    const grepCommand = `grep -E '[Tt]x=[{]?"[^"]*"[}]?|translate\\("[^"]*"' -ohr ${CONFIG.srcDir} | grep -o '"[^"]*"'`

    try {
      const stdout = await execWithRetries(grepCommand, CONFIG.retryLimit)

      const allKeysDefined = collectKeys(en).map((key) => key.replace(".", ":"))

      const allKeysUsed = stdout.replace(/"/g, "").split("\n").filter(Boolean)

      const missingKeys = allKeysUsed.filter(
        (key) => !CONFIG.exceptions.includes(key) && !allKeysDefined.includes(key),
      )

      const unusedKeys = allKeysDefined.filter((key) => !allKeysUsed.includes(key))

      let output = `--- i18n Test Results ---\n`
      output += `Total keys defined: ${allKeysDefined.length}\n`
      output += `Total keys used: ${allKeysUsed.length}\n`
      output += `Missing keys: ${missingKeys.length > 0 ? missingKeys.join(", ") : "None"}\n`
      output += `Unused keys: ${unusedKeys.length > 0 ? unusedKeys.join(", ") : "None"}\n`
      output += `-------------------------\n`

      console.log(output)

      if (missingKeys.length > 0) {
        throw new Error(`Missing translation keys detected: ${missingKeys.join(", ")}`)
      }

      if (unusedKeys.length > 0) {
        console.warn(`Warning: Unused translation keys detected: ${unusedKeys.join(", ")}`)
      }
    } catch (error) {
      throw new Error(`Test failed: ${error.message}`)
    }
  }, 240000) // 4 minutes timeout
})
