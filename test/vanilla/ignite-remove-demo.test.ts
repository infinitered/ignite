import { filesystem } from "gluegun"
import * as tempy from "tempy"

import { runIgnite } from "../_test-helpers"
import { BOILERPLATE_PATH } from "../../src/tools/path"

const setup = (): { TEMP_DIR: string } => {
  const TEMP_DIR = tempy.directory({ prefix: "ignite-" })

  beforeEach(() => {
    filesystem.copy(BOILERPLATE_PATH, TEMP_DIR, { overwrite: true })
  })

  afterEach(() => {
    filesystem.remove(TEMP_DIR) // clean up our mess
  })

  return { TEMP_DIR }
}

describe("ignite-cli remove-demo", () => {
  const { TEMP_DIR } = setup()

  it("should print the expected response", async () => {
    const result = await runIgnite(`remove-demo ${TEMP_DIR}`)

    const MOCK_DIR = `/user/home/ignite`
    const output = result.replaceAll(TEMP_DIR, MOCK_DIR)
    expect(output).toMatchSnapshot()
  })
})
