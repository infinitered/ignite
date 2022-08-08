import { listCmd, listCommandServices } from "./packager"

describe("packager", () => {
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

  describe("listCmd", () => {
    it("should be defined", () => {
      expect(listCmd).toBeDefined()
    })

    describe("npm", () => {
      const { factory, parser, reducer } = listCommandServices.npm
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

        expect(listCmd({ cmd, parser, executer, reducer })).rejects.toThrow()
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

          expect(reducer([npmCommandOutput])).toEqual(cmdOutputChunks[2])
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
      const { parser } = listCommandServices.yarn

      describe("parser", () => {
        it("should parse valid command output", () => {
          const output = `
            yarn global v1.22.17
            info "detox-cli@19.0.0" has binaries:
              - detox
            Done in 0.16s.
          `
          expect(parser(output)).toEqual([["detox-cli", "19.0.0"]])
        })
      })
    })
  })
})
