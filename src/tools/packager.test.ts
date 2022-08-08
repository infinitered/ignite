import { listCmd, listCmdServices } from "./packager"

describe("packager", () => {
  describe("listCmd", () => {
    it("should be defined", () => {
      expect(listCmd).toBeDefined()
    })

    describe("npm", () => {
      const npmCommandOutput = `
      {
        "resolved": "file:../../Roaming/fnm/node-versions/v16.16.0/installation",
        "dependencies": {
          "corepack": {
            "version": "0.10.0"
          },
          "expo-cli": {
            "version": "6.0.1"
          },
          "npm": {
            "version": "8.11.0"
          }
        }
      }
      `
      const npmWarnOutput = `npm WARN config global \`--global\`, \`--local\` are deprecated. Use \`--location=global\` instead.`

      const { factory, parser, reducer } = listCmdServices.npm
      const cmd = factory({ global: false })

      it("should return expected command output", async () => {
        const executer = async () => [npmCommandOutput]

        expect(await listCmd({ cmd, parser, executer, reducer })).toEqual([
          ["corepack", "0.10.0"],
          ["expo-cli", "6.0.1"],
          ["npm", "8.11.0"],
        ])
      })

      it("should throw error if expected command output can not found", async () => {
        const executer = async () => [npmWarnOutput, npmWarnOutput]

        await expect(listCmd({ cmd, parser, executer, reducer })).rejects.toThrow()
      })

      describe("reducer", () => {
        it("should be defined", () => {
          expect(reducer).toBeDefined()
        })

        it("should reduce single command chunk", () => {
          expect(reducer([npmCommandOutput])).toEqual(npmCommandOutput)
        })

        it("should reduce command chunks with warnings", () => {
          const cmdOutputChunks = [npmWarnOutput, npmWarnOutput, npmCommandOutput]

          expect(reducer(cmdOutputChunks)).toEqual(cmdOutputChunks[2])
        })

        it("should return undefined if expected chunk with valid JSON is not found", () => {
          const cmdOutputChunks = [npmWarnOutput, npmWarnOutput]

          expect(reducer(cmdOutputChunks)).toBeUndefined()
        })

        it("should return undefined if dependencies key is not in json chunk", () => {
          const cmdOutputChunks = [
            npmWarnOutput,
            npmWarnOutput,
            `
              {
                "resolved": "file:../../Roaming/fnm/node-versions/v16.16.0/installation",
              }
            `,
          ]

          expect(reducer(cmdOutputChunks)).toBeUndefined()
        })
      })

      describe("parser", () => {
        it("should parse valid command output", () => {
          expect(parser(npmCommandOutput)).toEqual([
            ["corepack", "0.10.0"],
            ["expo-cli", "6.0.1"],
            ["npm", "8.11.0"],
          ])
        })
      })
    })

    describe("yarn", () => {
      const yarnCommandOutput = `
        yarn global v1.22.17
        info "create-expo-app@1.1.1" has binaries:
          - create-expo-app
        info "detox-cli@19.0.0" has binaries:
          - detox
        Done in 0.21s
      `

      const { factory, parser, reducer } = listCmdServices.yarn
      const cmd = factory({ global: false })

      it("should return expected command output", async () => {
        const executer = async () => [yarnCommandOutput]

        expect(await listCmd({ cmd, parser, executer, reducer })).toEqual([
          ["create-expo-app", "1.1.1"],
          ["detox-cli", "19.0.0"],
        ])
      })

      it("should throw error if expected command output can not found", async () => {
        const yarnCommandError = `
          yarn run v1.22.17
          error Command "sdfsdfs" not found.
          info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
        `

        const executer = async () => [yarnCommandError]

        await expect(listCmd({ cmd, parser, executer, reducer })).rejects.toThrow()
      })
    })
  })
})
