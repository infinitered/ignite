// The expoGoCompat object specifies version overrides for packages that are not
// compatible with the Expo Go app. We use this object to specify the latest compatible
// version of each package when generating a new project using Expo Go.
// New ignited apps using prebuild will have more up-to-date versions of these packages.
export const expoGoCompatExpectedVersions = {
  "@react-native-async-storage/async-storage": "1.18.2",
  "expo-application": "~5.3.0",
  "expo-font": "~11.4.0",
  "expo-localization": "~14.3.0",
  "@shopify/flash-list": "1.4.3",
}

// This function takes a package.json file as a string and updates the versions of the
// dependencies specified in expoGoCompatExpectedVersions to the values in that object
// and returns the updated package.json as a string.
// This function is used when generating a new project using Expo Go.
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

  return updatedPackageJson
}
