import { filesystem } from "gluegun"

export const DEMO_MARKUP_PREFIX = "@demo"

export const demoDependenciesToRemove = [
  "@react-navigation/bottom-tabs",
  "expo-application",
  "react-native-drawer-layout",
]

export function findDemoPatches(): string[] {
  const globs = demoDependenciesToRemove.map((dep) => `${dep}*.patch`)
  const filePaths = filesystem.cwd("./patches").find({
    matching: globs,
  })
  return filePaths
}
