import { runIgnite } from "../_test-helpers"

test(`ignite help`, async () => {
  const result = await runIgnite(`help`)

  expect(result).toContain("Ignite")
  expect(result).toContain("new")
  expect(result).toContain("generate")
  expect(result).toContain("doctor")
  expect(result).toContain(`community.infinite.red`)
})
