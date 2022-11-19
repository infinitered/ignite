#!/usr/bin/env zx
import "zx/globals"
import { prettier } from "../tools/string.mjs"
import { dir } from "../tools/path.mjs"
import { update } from "../tools/patch.mjs"

const name = await question("Screen name? ")
const fileName = `${name}Screen`
const ext = "tsx"

const file = prettier(
  /*ts*/ `
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { WelcomeScreen } from "../screens"

export type NameNavigatorParamList = {
  Demo: undefined
}

const Stack = createStackNavigator<NameNavigatorParamList>()
export const NameNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false, }}>
      <Stack.Screen name="Demo" component={WelcomeScreen} />
    </Stack.Navigator>
  )
}
`,
  { Name: name },
)

await fs.writeFile(dir.screens(`${fileName}.${ext}`), file)

await update(dir.screens("index.ts"), (file) => file + `export * from "./${fileName}"` + "\n")
