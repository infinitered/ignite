import { spawnChunked, spawnProgress } from "./spawn"

describe("spawn", () => {
  describe("spawnProgress", () => {
    it("should be defined", () => {
      expect(spawnProgress).toBeDefined()
    })

    it('should not throw error on "npm list --global --depth=0 --json" input', async () => {
      const output = await spawnProgress("npm list --global --depth=0 --json", {})
      expect(typeof output).toBe("string")
    })
  })

  describe("spawnChunked", () => {
    it("should be defined", () => {
      expect(spawnChunked).toBeDefined()
    })

    it('should not throw error on "npm list --global --depth=0 --json" input', async () => {
      const output = await spawnChunked("npm list --global --depth=0 --json")
      expect(output).toBeDefined()
      expect(Array.isArray(output)).toBe(true)
      expect(output.every((chunk) => typeof chunk === "string")).toBe(true)
    })
  })
})
