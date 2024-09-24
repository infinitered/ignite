import { filesystem } from "gluegun"

// This function takes a package.json file as a string and removes the dependencies
// supplied in dependenciesToRemove and returns the updated package.json as a string.
export function findAndRemoveDependencies(
  packageJsonRaw: string,
  dependenciesToRemove: string[],
): string {
  let updatedPackageJson = packageJsonRaw

  dependenciesToRemove.forEach((depName) => {
    const regex = new RegExp(`"${depName}"\\s*:\\s*"[^"]+",?`, "g")
    updatedPackageJson = updatedPackageJson.replace(regex, "")
  })

  return updatedPackageJson
}

export function removePackageJSONDependencies(
  packageJsonPath: string,
  dependenciesToRemove: string[],
) {
  const packageJsonRaw = filesystem.read(packageJsonPath)
  const updatedPackageJson = findAndRemoveDependencies(packageJsonRaw, dependenciesToRemove)
  filesystem.write(packageJsonPath, updatedPackageJson)
}

export function findAndUpdateDependencyVersions(
  packageJsonRaw: string,
  dependencies: Record<string, string>,
): string {
  let updatedPackageJson = packageJsonRaw

  Object.keys(dependencies).forEach((depName) => {
    const desiredVersion = dependencies[depName]
    const regex = new RegExp(`"${depName}"\\s*:\\s*"[^"]+"`, "g")
    updatedPackageJson = updatedPackageJson.replace(regex, `"${depName}": "${desiredVersion}"`)
  })

  // Make sure `expo-dev-client` is removed
  updatedPackageJson = updatedPackageJson.replace(/"expo-dev-client"\s*:\s*"[^"]+",?/g, "")

  return updatedPackageJson
}

export const newArchCompatExpectedVersions = {
  "react-native-mmkv": "3.0.1",
}
