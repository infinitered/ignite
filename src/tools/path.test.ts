import { filesystem } from "gluegun"
import * as path from "path"
import { BOILERPLATE_PATH, createGetAllFilePaths, createGetIgnoredFiles } from "./path"

describe("paths", () => {
  describe("getAllFilePaths", () => {
    it(`should return expected paths in '~/boilerplate'`, () => {
      const getAllFilePaths = createGetAllFilePaths(filesystem)
      const paths = getAllFilePaths(BOILERPLATE_PATH).map((path) => path.replace(process.cwd(), ""))

      expect(paths).toMatchSnapshot()
    })
  })

  describe("getIgnoredFiles", () => {
    it(`should return expected lines in '~/boilerplate/.gitignore'`, () => {
      const getIgnoredFiles = createGetIgnoredFiles(filesystem)
      const pathname = path.join(BOILERPLATE_PATH, ".gitignore")
      const paths = getIgnoredFiles(pathname)

      expect(paths).toMatchSnapshot()
    })
  })
})
