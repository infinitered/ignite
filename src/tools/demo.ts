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

// This function takes a package.json file as a string and removes the dependencies
// specified in demoDependenciesToRemove and returns the updated package.json as a string.
export function findAndRemoveDemoDependencies(packageJsonRaw: string): string {
  let updatedPackageJson = packageJsonRaw

  demoDependenciesToRemove.forEach((depName) => {
    const regex = new RegExp(`"${depName}"\\s*:\\s*"[^"]+",?`, "g")
    updatedPackageJson = updatedPackageJson.replace(regex, "")
  })

  return updatedPackageJson
}
