import { run } from "./_test-helpers"

test(`ignite help`, async (done) => {
  const result = await run(`help`)

  expect(result).toContain("Ignite")
  expect(result).toContain("new")
  expect(result).toContain("generate")
  expect(result).toContain("doctor")
  expect(result).toContain(`community.infinite.red`)

  done()
})
