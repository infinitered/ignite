import { isValidJson } from "./guards"

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
})
