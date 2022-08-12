import { list } from "./packager"

describe("packager", () => {
  describe("list", () => {
    describe("npm", () => {
      it("should handle non-json input to parseFn", () => {
        const [cmd, parseFn] = list({ packagerName: "npm" })

        expect(cmd.includes("npm")).toBe(true)

        const input = `
            npm WARN config global \`--global\`, \`--local\` are deprecated. Use \`--location=global\` instead.
            npm WARN config global \`--global\`, \`--local\` are deprecated. Use \`--location=global\` instead.
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

        expect(() => parseFn(input)).not.toThrow()
      })

      it("should handle transforming input json string to expected shape", () => {
        const [cmd, parseFn] = list({ packagerName: "npm" })

        expect(cmd.includes("npm")).toBe(true)

        const input = `
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

        expect(parseFn(input)).toStrictEqual([
          ["corepack", "0.10.0"],
          ["expo-cli", "6.0.1"],
          ["npm", "8.11.0"],
        ])
      })
    })
  })
})
