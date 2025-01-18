import en from "../app/i18n/en"
import { exec } from "child_process"
import path from "path"

// Configuration settings for the i18n test
const CONFIG = {
  srcDir: path.join(__dirname, "..", "app"), // Directory to scan for i18n keys
  grepRegex: `[Tt]x=[{]?\\\\"[^\\"]*\\\\"[}]?\\|translate(\\\\"[^\\"]*\\\\"`, // Regex to find keys in the codebase
  exceptions: [] as string[], // List of keys to exclude from checks (e.g., keys that are not in use but should be ignored)
  retryLimit: 3, // Number of retries for executing the grep command
}

/**
 * Recursively collects all keys from the translation object and returns them in dot notation.
 * This function traverses the entire object to collect all keys, even nested ones.
 *
 * @param obj - The translation object (typically `en` in our case)
 * @param prefix - A prefix for nested keys (used for recursion)
 * @param keys - An accumulator array to store collected keys
 * @returns An array of collected keys
 */
function collectKeys(obj: Record<string, any>, prefix = "", keys: string[] = []): string[] {
  // Iterate over the object to collect all keys
  for (const [key, value] of Object.entries(obj)) {
    const currentKey = prefix ? `${prefix}.${key}` : key // Form the full key name (e.g., "namespace.key")
    if (typeof value === "object" && value !== null) {
      collectKeys(value, currentKey, keys) // Recursively collect keys for nested objects
    } else {
      keys.push(currentKey) // Add the key to the list if it’s not an object
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
    // Function that attempts to execute the command, with retry logic
    const attempt = (triesLeft: number) => {
      exec(command, (error, stdout) => {
        if (error) {
          if (triesLeft > 0) {
            // If the command fails, warn the user and retry the command
            console.warn(`Command failed, retrying... (${triesLeft} retries left)`)
            return attempt(triesLeft - 1)
          }
          // If retries are exhausted, reject with the error message
          return reject(new Error(`Command failed after multiple attempts: ${error.message}`))
        }
        resolve(stdout.trim()) // Resolve the promise with the command output if successful
      })
    }
    attempt(retries) // Start the first attempt
  })
}

/**
 * The main test that checks for missing and unused translation keys.
 * It runs a `grep` command to find i18n keys used in the codebase, compares them to the keys defined in the `en` object,
 * and reports missing or unused keys.
 */
describe("i18n", () => {
  test("There are no missing or unused keys", async () => {
    // Build the grep command to search for i18n keys in the codebase
    const grepCommand = `grep -E '[Tt]x=[{]?"[^"]*"[}]?|translate\\("[^"]*"' -ohr ${CONFIG.srcDir} | grep -o '"[^"]*"'`

    try {
      // Execute the grep command with retries
      const stdout = await execWithRetries(grepCommand, CONFIG.retryLimit)

      // Collect all defined keys from the `en` translation object
      const allKeysDefined = collectKeys(en).map((key) => key.replace(".", ":")) // Replace dots with colons for i18next compatibility

      // Process the keys used in the codebase (from the grep command output)
      const allKeysUsed = stdout.replace(/"/g, "").split("\n").filter(Boolean)

      // Find missing keys (defined keys that are not used in the codebase)
      const missingKeys = allKeysUsed.filter(
        (key) => !CONFIG.exceptions.includes(key) && !allKeysDefined.includes(key),
      )

      // Find unused keys (used keys that are not defined in the `en` translation object)
      const unusedKeys = allKeysDefined.filter((key) => !allKeysUsed.includes(key))

      // Combine results into a single block of text for clean output
      let output = `--- i18n Test Results ---\n`
      output += `Total keys defined: ${allKeysDefined.length}\n`
      output += `Total keys used: ${allKeysUsed.length}\n`
      output += `Missing keys: ${missingKeys.length > 0 ? missingKeys.join(", ") : "None"}\n`
      output += `Unused keys: ${unusedKeys.length > 0 ? unusedKeys.join(", ") : "None"}\n`
      output += `-------------------------\n`

      // Log the results as a block to the console
      console.log(output)

      // If there are missing keys, throw an error to fail the test
      if (missingKeys.length > 0) {
        throw new Error(`Missing translation keys detected: ${missingKeys.join(", ")}`)
      }

      // If there are unused keys, print a warning to the console
      if (unusedKeys.length > 0) {
        console.warn(`Warning: Unused translation keys detected: ${unusedKeys.join(", ")}`)
      }
    } catch (error) {
      // If any error occurs, throw an exception to fail the test
      throw new Error(`Test failed: ${error.message}`)
    }
  }, 240000) // 4 minutes timeout
})
