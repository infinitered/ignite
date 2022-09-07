import { filesystem, GluegunToolbox } from "gluegun"
import { packager } from "../tools/packager"

module.exports = {
  alias: ["s"],
  description: "Snackify Ignite app",
  run: async (toolbox: GluegunToolbox) => {
    const { print, prompt, system, patching } = toolbox
    const { remove } = filesystem
    const { info } = print

    const getStatus = await system.run(`git status -s`)
    if (getStatus === "" || true) {
      // test if the branch name is snack- something
      const branchName = await system.run(`git name-rev --name-only HEAD`)
      if (!branchName.includes("snack")) {
        info("Creating a new branch for your snack")
        system.run(`git checkout -b snack-$(date +'%m%d%y')`)
      }
    } else {
      info(
        "There are uncommitted changes in your current branch, please commit changes before running this",
      )
    }

    info("This command will create an expo snack project for you. ")
    info("This can be exported to an expo snack for you to test and play with your app.")
    info("In order to snackify(create an expo snack) this project, we must delete:")
    info(
      "- /ios\n- /android\n- /e2e\n- /test\n- /app/services/reactotron\n- jest.config.js\n- metro.config.js\n- webpack.config.js",
    )

    const test = await prompt.confirm("Do you wish to continue", true)
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
    const addPackages = [
      "expo-constants@~13.2.4",
      "expo-localization@~13.1.0",
      "expo-modules-core@~0.11.4",
      "expo-splash-screen@~0.16.2",
      "react-native-screens@~3.15.0",
      "@react-native-async-storage/async-storage@~1.17.3",
    ]
    const removePackages = [
      "@expo/webpack-config",
      "reactotron-react-native",
      "detox",
      "detox-expo-helpers",
      "ts-jest",
      "jest",
      "metro-config",
      "@rnx-kit/metro-config",
      "reactotron-mst",
      "reactotron-react-js",
      "reactotron-core-client",
    ]
    if (test) {
      removeArray.map((val) => remove(val))
      filesystem.file("./app/services/reactotron/index.ts")
      patching.replace(
        "./app/services/reactotron/index.ts",
        "",
        "/*** This file is loaded for snack to resolve Reactotron for expo snack**/ \n export const setupReactotron = (arg1:any) => null \nexport const setReactotronRootStore=(arg1:any, arg2:any)=>null",
      )
      addPackages.map((val) => packager.add(val))
      removePackages.map((val) => packager.remove(val))
    }
    info("All done")
  },
}
