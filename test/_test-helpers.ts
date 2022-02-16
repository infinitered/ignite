import { system, filesystem } from "gluegun"
const stripANSI = require("strip-ansi") // why...

const IGNITE = "node " + filesystem.path(__dirname, "..", "bin", "ignite")
const shellOpts = { stdio: "inherit" }

jest.setTimeout(10 * 60 * 1000)

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

export async function testSpunUpApp() {
  // run typescript
  let resultTS
  try {
    resultTS = await run(`npm run compile`)
  } catch (e) {
    resultTS = e.stdout
    console.error(resultTS) // This will only show if you run in --verbose mode.
  }
  expect(resultTS).not.toContain("error")

  // check the contents of ignite/templates
  const templates = filesystem.list(`./ignite/templates`)
  expect(templates).toContain("component")
  expect(templates).toContain("model")
  expect(templates).toContain("screen")

  // check the basic contents of package.json
  const igniteJSON = filesystem.read(`./package.json`, "json")
  expect(igniteJSON).toHaveProperty("scripts")
  expect(igniteJSON).toHaveProperty("dependencies")
  expect(igniteJSON).toHaveProperty("detox.configurations")

  // check the app.tsx file
  const appJS = filesystem.read(`./app/app.tsx`)
  expect(appJS).toContain("export default App")
  expect(appJS).toContain("RootStore")

  // now lets test generators too, since we have a properly spun-up app!
  // components
  const componentGen = await runIgnite(`generate component WompBomp`)
  expect(componentGen).toContain(`app/components/womp-bomp/womp-bomp.tsx`)
  expect(filesystem.list(`${process.cwd()}/app/components`)).toContain("womp-bomp")
  expect(filesystem.read(`${process.cwd()}/app/components/womp-bomp/womp-bomp.tsx`)).toContain(
    "export const WompBomp",
  )

  // models
  const modelGen = await runIgnite(`generate model mod-test`)
  expect(modelGen).toContain(`app/models/mod-test/mod-test.ts`)
  expect(modelGen).toContain(`app/models/mod-test/mod-test.test.ts`)
  expect(filesystem.list(`${process.cwd()}/app/models`)).toContain("mod-test")
  expect(filesystem.read(`${process.cwd()}/app/models/mod-test/mod-test.ts`)).toContain(
    "export const ModTestModel",
  )
  expect(filesystem.read(`${process.cwd()}/app/models/index.ts`)).toContain(
    `export * from "./mod-test/mod-test"`,
  )

  // screens
  const screenGen = await runIgnite(`generate screen bowser-screen --skip-index-file`)
  expect(screenGen).toContain(`Stripping Screen from end of name`)
  expect(screenGen).toContain(`app/screens/bowser/bowser-screen.tsx`)
  expect(filesystem.list(`${process.cwd()}/app/screens/bowser`)).toContain("bowser-screen.tsx")
  expect(filesystem.read(`${process.cwd()}/app/screens/bowser/bowser-screen.tsx`)).toContain(
    "export const BowserScreen",
  )
  expect(filesystem.read(`${process.cwd()}/app/screens/index.ts`)).not.toContain(
    `export * from "./bowser/bowser-screen"`,
  )

  // commit the change
  await run(`git add ./app/models ./app/components && git commit -m "generated test components"`)

  // run the tests; if they fail, run will raise and this test will fail
  await run(`npm run test`)
  await run(`npm run lint`)
  await run(`npm run compile`)
  expect(await run("git diff HEAD")).toEqual("")
}
