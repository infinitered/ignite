import { cmdChunkReducer, listCmd, listCmdOutputParser } from "./packager"

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

  describe("cmdChunkReducer", () => {
    describe("npm", () => {
      it("should be defined", () => {
        expect(cmdChunkReducer.npm).toBeDefined()
      })

      it("should reduce single command chunk", () => {
        expect(cmdChunkReducer.npm([npmCommandOutput])).toEqual(npmCommandOutput)
      })

      it("should reduce command chunks with warnings", () => {
        const cmdOutputChunks = [npmWarnOutput, npmWarnOutput, npmCommandOutput]

        expect(cmdChunkReducer.npm([npmCommandOutput])).toEqual(cmdOutputChunks[2])
      })

      it("should return undefined if expected chunk with valid JSON is not found", () => {
        const cmdOutputChunks = [npmWarnOutput, npmWarnOutput]

        expect(cmdChunkReducer.npm(cmdOutputChunks)).toBeUndefined()
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

        expect(cmdChunkReducer.npm(cmdOutputChunks)).toBeUndefined()
      })
    })
  })

  describe("listCmdOutputParser", () => {
    it("should be defined", () => {
      expect(listCmdOutputParser).toBeDefined()
    })

    it("should return a command and parser", () => {
      const [cmd, parser] = listCmdOutputParser()
      expect(cmd).toBeDefined()
      expect(parser).toBeDefined()
    })

    describe("npm", () => {
      it("should parse valid command output", () => {
        const [, parser] = listCmdOutputParser({ packagerName: "npm" })

        expect(parser(npmCommandOutput)).toEqual([
          ["corepack", "0.10.0"],
          ["expo-cli", "6.0.1"],
          ["npm", "8.11.0"],
        ])
      })
    })

    describe("yarn", () => {
      it("should parse valid command output", () => {
        const output = `
        yarn global v1.22.17
        info "detox-cli@19.0.0" has binaries:
           - detox
        Done in 0.16s.
        `
        const [, parser] = listCmdOutputParser({ packagerName: "yarn" })
        expect(parser(output)).toEqual([["detox-cli", "19.0.0"]])
      })
    })

    describe("pnpm", () => {
      it("should throw error", () => {
        expect(() => listCmdOutputParser({ packagerName: "pnpm" })).toThrow()
      })
    })
  })

  describe("listCmd", () => {
    it("should be defined", () => {
      expect(listCmd).toBeDefined()
    })

    describe("npm", () => {
      const [cmd, parser] = listCmdOutputParser({ packagerName: "npm" })
      const reducer = cmdChunkReducer.npm

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
    })
  })
})
