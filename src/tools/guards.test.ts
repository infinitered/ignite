import { isValidJson, isYarnListOutput } from "./guards"

describe("guards", () => {
  describe("isValidJson", () => {
    const tests = [
      { input: '{"foo": "bar"}', output: true },
      { input: '{"foo": "bar"', output: false },
    ]

    tests.forEach(({ input, output }) => {
      it(`should return '${output}' for '${input}'`, () => {
        expect(isValidJson(input)).toBe(output)
      })
    })
  })

  describe("isYarnListOutput", () => {
    const tests = [
      {
        input: `
          yarn global v1.22.17
          info "create-expo-app@1.1.1" has binaries:
            - create-expo-app
          info "detox-cli@19.0.0" has binaries:
            - detox
          Done in 0.21s
        `,
        output: true,
      },
      {
        input: `
          yarn run v1.22.17
          error Command "sdfsdfs" not found.
          info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
        `,
        output: false,
      },
    ]

    tests.forEach(({ input, output }) => {
      it(`should return '${output}' for '${input}'`, () => {
        expect(isYarnListOutput(input)).toBe(output)
      })
    })
  })
})
