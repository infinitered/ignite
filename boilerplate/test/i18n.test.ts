import en from "../app/i18n/en"
import { exec } from "child_process"

// Use this array for keys that for whatever reason aren't greppable so they
// don't hold your test suite hostage by always failing.
const EXCEPTIONS = [
  // "welcomeScreen.readyForLaunch",
]

function iterate(obj, stack, array) {
  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      if (typeof obj[property] === "object") {
        iterate(obj[property], `${stack}.${property}`, array)
      } else {
        array.push(`${stack.slice(1)}.${property}`)
      }
    }
  }

  return array
}

/**
 * This tests your codebase for missing i18n strings so you can avoid error strings at render time
 *
 * It was taken from https://gist.github.com/Michaelvilleneuve/8808ba2775536665d95b7577c9d8d5a1
 * and modified slightly to account for our Ignite higher order components,
 * which take 'tx' and 'fooTx' props.
 * The grep command is nasty looking, but it's essentially searching the codebase for a few different things:
 *
 * tx="*"
 * Tx=""
 * tx={""}
 * Tx={""}
 * translate(""
 *
 * and then grabs the i18n key between the double quotes
 *
 * This approach isn't 100% perfect. If you are storing your key string in a variable because you
 * are setting it conditionally, then it won't be picked up.
 *
 */

describe("i18n", () => {
  test("There are no missing keys", (done) => {
    // Actual command output:
    // grep "[T\|t]x=[{]\?\"\S*\"[}]\?\|translate(\"\S*\"" -ohr './app' | grep -o "\".*\""
    const command = `grep "[T\\|t]x=[{]\\?\\"\\S*\\"[}]\\?\\|translate(\\"\\S*\\"" -ohr './app' | grep -o "\\".*\\""`
    exec(command, (_, stdout) => {
      const allTranslationsDefined = iterate(en, "", [])
      const allTranslationsUsed = stdout.replace(/"/g, "").split("\n")
      allTranslationsUsed.splice(-1, 1)

      for (let i = 0; i < allTranslationsUsed.length; i += 1) {
        if (!EXCEPTIONS.includes(allTranslationsUsed[i])) {
          // You can add keys to EXCEPTIONS (above) if you don't want them included in the test
          expect(allTranslationsDefined).toContainEqual(allTranslationsUsed[i])
        }
      }
      done()
    })
  }, 240000)
})
