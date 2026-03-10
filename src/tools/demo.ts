import { filesystem } from "gluegun"

export const DEMO_MARKUP_PREFIX = "@demo"

export const demoDependenciesToRemove = ["expo-application"]

export function findDemoPatches(): string[] {
  const patchesPath = filesystem.path("./patches")

  // Return empty array if patches directory doesn't exist
  if (!filesystem.exists(patchesPath)) return []

  const globs = demoDependenciesToRemove.map((dep) => `${dep}*.patch`)
  const filePaths = filesystem.cwd("./patches").find({
    matching: globs,
  })
  return filePaths
}
