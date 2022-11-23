import * as fs from "fs"
import * as path from "path"

export type AssetName = "logo.ascii.txt" | "logo-sm.ascii.txt"

export const asset = {
  get: (name: AssetName) => fs.readFileSync(path.join(__dirname, name), "ascii"),
} as const
