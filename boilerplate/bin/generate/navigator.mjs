#!/usr/bin/env zx
import "zx/globals"
import { prettier } from "../tools/string.mjs"
import { dir } from "../tools/path.mjs"
import { update } from "../tools/patch.mjs"

const name = await question("Navigator name? ")
const fileName = `${name}Navigator`
const ext = "tsx"

const file = prettier(
  /*ts*/ `
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add Name: undefined to AppStackParamList
// - Import your screen, and add it to the stack:
//     <Stack.Screen name="Name" component={<%= props.pascalCaseName%>Screen} />
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const NameScreen: FC<StackScreenProps<AppStackScreenProps, "Name">> = observer(function NameScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="Name" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
`,
  { Name: name },
)

await fs.writeFile(dir.navigators(`${fileName}.${ext}`), file)

await update(dir.navigators("index.ts"), (file) => file + `export * from "./${fileName}"` + "\n")
