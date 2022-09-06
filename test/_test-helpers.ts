import { system, filesystem } from "gluegun"
const stripANSI = require("strip-ansi") // why...

const IGNITE = "node " + filesystem.path(__dirname, "..", "bin", "ignite")
const shellOpts = { stdio: "inherit" }

jest.setTimeout(10 * 60 * 1000)

type RunOptions = {
  pre?: string // command to run before the command
  post?: string // command to run after the command
}

export async function runIgnite(cmd: string, options: RunOptions = {}): Promise<string> {
  return run(`${IGNITE} ${cmd}`, options)
}

export async function run(cmd: string, options: RunOptions = {}): Promise<string> {
  const pre = options.pre ? `${options.pre} && ` : ""
  const post = options.post ? ` && ${options.post}` : ""
  const resultANSI = await system.run(`${pre}${cmd}${post}`, shellOpts)
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
