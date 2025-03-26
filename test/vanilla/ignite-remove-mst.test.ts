import { filesystem } from "gluegun"
import * as tempy from "tempy"
import { runIgnite } from "../_test-helpers"

const BOILERPLATE_PATH = filesystem.path(__dirname, "../../boilerplate")

const setup = (): { TEMP_DIR: string } => {
  const TEMP_DIR = tempy.directory({ prefix: "ignite-" })

  beforeEach(() => {
    // create the destination directory
    filesystem.dir(TEMP_DIR)
    // copy the relevant files & folders
    filesystem.copy(BOILERPLATE_PATH + "/package.json", TEMP_DIR + "/package.json", {
      overwrite: true,
    })
    filesystem.copy(BOILERPLATE_PATH + "/app", TEMP_DIR + "/app", { overwrite: true })
  })

  afterEach(() => {
    filesystem.remove(TEMP_DIR) // clean up our mess
  })

  return { TEMP_DIR }
}

describe("ignite-cli remove-mst", () => {
  const { TEMP_DIR } = setup()

  it("should print the expected response", async () => {
    const result = await runIgnite(`remove-mst ${TEMP_DIR}`)

    // "/user/home/ignite" replaces the temp directory, so we don't get failures when it changes every test run
    const MOCK_DIR = `/user/home/ignite`
    const output = result.replace(new RegExp(TEMP_DIR, "g"), MOCK_DIR)

    expect(output).toMatchSnapshot()
  })
})
