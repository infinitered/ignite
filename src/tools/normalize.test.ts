import { normalizePath } from "./normalize"

describe("transfrom", () => {
  describe("normalizePath", () => {
    const cases = [
      {
        input:
          "D:\\Users\\Work\\Documents\\Code\\ignite\\temp\\Foo\\app\\components\\womp-bomp\\womp-bomp.tsx",
        output:
          "D:/Users/Work/Documents/Code/ignite/temp/Foo/app/components/womp-bomp/womp-bomp.tsx",
      },
    ]

    cases.forEach(({ input, output }) => {
      it(`should transform ${input} to ${output}`, () => {
        expect(normalizePath(input)).toEqual(output)
      })
    })
  })
})
