import { system, filesystem } from "gluegun"
import { stripANSI } from "../src/tools/strip-ansi"

const IGNITE = "node " + filesystem.path(__dirname, "..", "bin", "ignite")
const shellOpts = { stdio: "inherit" }

jest.setTimeout(10 * 60 * 1000)

type RunOptions = {
  pre?: string // command to run before the command
  post?: string // command to run after the command
}

export async function runIgnite(cmd: string, options: RunOptions = {}): Promise<string> {
  return run(`${IGNITE} ${cmd}`, options)
}

export async function run(cmd: string, options: RunOptions = {}): Promise<string> {
  const pre = options.pre ? `${options.pre} && ` : ""
  const post = options.post ? ` && ${options.post}` : ""
  const resultANSI = await system.run(`${pre}${cmd}${post}`, shellOpts)
  return stripANSI(resultANSI)
}

export async function runError(cmd: string): Promise<string | any> {
  let resultANSI: string
  try {
    resultANSI = await system.run(`${IGNITE} ${cmd}`, shellOpts)
  } catch (e) {
    return e
  }
  return `No error thrown? Output: ${resultANSI}`
}

function generateDefaultTemplatePath(pathname: string): string {
  return filesystem.path(pathname, "ignite", "templates", "screen", "NAMEScreen.tsx.ejs")
}

function generateExpoRouterTemplatePath(pathname: string): string {
  return filesystem.path(pathname, "ignite", "templates", "screen", "NAME.tsx.ejs")
}

export function copyDefaultScreenGenerator(tempBoilerplatePath: string): void {
  const REACT_NAVIGATION_SCREEN_TPL = `---
destinationDir: app/screens
patches:
- path: "app/screens/index.ts"
  append: "export * from "./<%= props.pascalCaseName %>Screen"\n"
  skip: <%= props.skipIndexFile %>
- path: "app/navigators/AppNavigator.tsx"
  replace: "// IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST"
  insert: "<%= props.pascalCaseName %>: undefined\n\t// IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST"
- path: "app/navigators/AppNavigator.tsx"
  replace: "{/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}"
  insert: "<Stack.Screen name="<%= props.pascalCaseName %>" component={Screens.<%= props.pascalCaseName %>Screen} />\n\t\t\t{/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}"
  skip: <%= props.skipIndexFile %>
---
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface <%= props.pascalCaseName %>ScreenProps extends AppStackScreenProps<"<%= props.pascalCaseName %>"> {}

export const <%= props.pascalCaseName %>Screen: FC<<%= props.pascalCaseName %>ScreenProps> = observer(function <%= props.pascalCaseName %>Screen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="<%= props.camelCaseName %>" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
`

  const destination = generateDefaultTemplatePath(tempBoilerplatePath)
  filesystem.write(destination, REACT_NAVIGATION_SCREEN_TPL)
}

export function copyExpoRouterScreenGenerator(tempBoilerplatePath: string): void {
  const EXPO_ROUTER_SCREEN_TPL = `import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "@/components"

export default observer(function <%= props.pascalCaseName %>Screen() {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="<%= props.camelCaseName %>" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
`

  const destination = generateExpoRouterTemplatePath(tempBoilerplatePath)
  filesystem.write(destination, EXPO_ROUTER_SCREEN_TPL)
}

export function removeDefaultScreenGenerator(tempBoilerplatePath: string): void {
  const destination = generateDefaultTemplatePath(tempBoilerplatePath)
  filesystem.remove(destination)
}

export function removeExpoRouterScreenGenerator(tempBoilerplatePath: string): void {
  const destination = generateExpoRouterTemplatePath(tempBoilerplatePath)
  filesystem.remove(destination)
}
