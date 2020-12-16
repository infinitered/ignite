import { system, filesystem } from "gluegun"
const stripANSI = require("strip-ansi") // why...

const IGNITE = "node " + filesystem.path(__dirname, "..", "bin", "ignite")
const shellOpts = { stdio: "inherit" }

jest.setTimeout(8 * 60 * 1000)

export async function runIgnite(cmd: string): Promise<string> {
  return run(`${IGNITE} ${cmd}`)
}

export async function run(cmd: string): Promise<string> {
  const resultANSI = await system.run(`${cmd}`, shellOpts)
  return stripANSI(resultANSI)
}

export async function runError(cmd: string): Promise<string | any> {
  let resultANSI: string
  try {
    resultANSI = await system.run(`${IGNITE} ${cmd}`, shellOpts)
  } catch (e) {
    return e
  }
  return `No error thrown? Output: ${resultANSI}`
}
