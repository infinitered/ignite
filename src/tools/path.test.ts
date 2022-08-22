import { filesystem } from "gluegun"
import { BOILERPLATE_PATH, createGetAllFilePaths } from "./path"

describe("paths", () => {
  describe("getAllFilePaths", () => {
    it(`should return expected paths in '${BOILERPLATE_PATH}'`, () => {
      const getAllFilePaths = createGetAllFilePaths(filesystem)
      const paths = getAllFilePaths(BOILERPLATE_PATH).map((path) => path.replace(process.cwd(), ""))

      expect(paths).toMatchSnapshot()
    })
  })
})
