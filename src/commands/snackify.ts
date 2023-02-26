import { filesystem, GluegunToolbox } from "gluegun"
import { packager } from "../tools/packager"

module.exports = {
  alias: ["s"],
  description: "Snackify Ignite app",
  run: async (toolbox: GluegunToolbox) => {
    const { print, prompt, system, patching } = toolbox
    const { remove, exists } = filesystem
    const { info } = print

    // check if git is enabled in the project
    const gitExists = exists("./.git")
    if (gitExists === "dir") {
      // getStatus checks if there are any uncommitted changes inside the branch
      const getStatus = await system.run(`git status -s`)
      if (getStatus === "") {
        // test if the branch name has substring snack
        const branchName = await system.run(`git branch --show-current`)
        if (!branchName.includes("snack")) {
          info("Creating a new branch for your snack")
          system.run(`git checkout -b snack-$(date +'%m%d%y')`)
        }
      } else {
        info(
          "There are uncommitted changes in your current branch, please commit changes before running this",
        )
        return
      }
    }

    info("This command will create an Expo snack project for you. ")
    info("This can be exported to an Expo snack for you to test and play with your app.")
    info("In order to snackify (create an Expo snack) this project, we must delete:")
    info(
      "- /ios\n- /android\n- /e2e\n- /test\n- /app/services/reactotron\n- jest.config.js\n- metro.config.js\n- webpack.config.js",
    )

    const confirm = await prompt.confirm("Do you wish to continue", true)
    // the following array contains folders and files that are deleted to make project ready for some snacking
    const removeArray = [
      "./ios",
      "./android",
      "./e2e",
      "./test",
      "./jest.config.js",
      "./metro.config.js",
      "./webpack.config.js",
      "./app/services/reactotron",
    ]

    if (confirm) {
      // 1. delete all folders and files that are not required
      removeArray.map((val) => remove(val))
      // 2. Create a new file to handle reactotron
      filesystem.file("./app/services/reactotron/index.ts")
      patching.replace(
        "./app/services/reactotron/index.ts",
        "",
        "/*** This file is loaded for snack to resolve Reactotron for expo snack**/ \n export const setupReactotron = (arg1:any) => null \nexport const setReactotronRootStore=(arg1:any, arg2:any)=>null",
      )

      // 3. Update/Add packages as per expo snack's requirements
      const addPackages = [
        "expo-constants@~13.2.4",
        "expo-localization@~13.1.0",
        "expo-modules-core@~0.11.4",
        "expo-splash-screen@~0.16.2",
        "react-native-screens@~3.15.0",
        "@react-native-async-storage/async-storage@~1.17.3",
      ]

      // 4. Remove packages that are not required
      const removePackages = [
        "@expo/webpack-config",
        "reactotron-react-native",
        "ts-jest",
        "jest",
        "metro-config",
        "@rnx-kit/metro-config",
        "reactotron-mst",
        "reactotron-react-js",
        "reactotron-core-client",
      ]
      await packager.add(addPackages.join(" "))
      await packager.remove(removePackages.join(" "))
    }
    info("All done, your app is ready to be imported into Expo snack")
    info(
      "The best way to import this project into an Expo snack is via publishing this project into a public repository on github and then adding your repo's URL to an expo snack - https://snack.expo.dev/",
    )
  },
}
