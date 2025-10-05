import { filesystem } from "gluegun"
import * as tempy from "tempy"

import { updatePackagerCommandsInReadme } from "./react-native"

const EXAMPLE_README = `
yarn
yarn start
yarn build:ios:sim
yarn build:ios:device
yarn build:ios:prod
`

describe("react native", () => {
  describe("updatePackagerCommandsInReadme", () => {
    let tempDir: string

    beforeEach(() => {
      tempDir = tempy.directory({ prefix: "ignite-" })
      filesystem.write(`${tempDir}/README.md`, EXAMPLE_README)
    })

    afterEach(() => {
      filesystem.remove(tempDir) // clean up our mess
    })

    it("should update to npm", () => {
      const readmePath = filesystem.path(tempDir, "README.md")

      updatePackagerCommandsInReadme(readmePath, "npm")

      const results = filesystem.read(readmePath)
      const expectedResults = `
npm install --legacy-peer-deps
npm run start
npm run build:ios:sim
npm run build:ios:device
npm run build:ios:prod
`

      expect(results).toBe(expectedResults)
    })

    it("should update to yarn", () => {
      const readmePath = filesystem.path(tempDir, "README.md")

      updatePackagerCommandsInReadme(readmePath, "yarn")

      const results = filesystem.read(readmePath)
      const expectedResults = `
yarn install
yarn start
yarn build:ios:sim
yarn build:ios:device
yarn build:ios:prod
`

      expect(results).toBe(expectedResults)
    })
    it("should update to pnpm", () => {
      const readmePath = filesystem.path(tempDir, "README.md")

      updatePackagerCommandsInReadme(readmePath, "pnpm")

      const results = filesystem.read(readmePath)
      const expectedResults = `
pnpm install
pnpm run start
pnpm run build:ios:sim
pnpm run build:ios:device
pnpm run build:ios:prod
`

      expect(results).toBe(expectedResults)
    })
    it("should update to bun", () => {
      const readmePath = filesystem.path(tempDir, "README.md")

      updatePackagerCommandsInReadme(readmePath, "bun")

      const results = filesystem.read(readmePath)
      const expectedResults = `
bun install
bun run start
bun run build:ios:sim
bun run build:ios:device
bun run build:ios:prod
`

      expect(results).toBe(expectedResults)
    })
  })
})
