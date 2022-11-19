#!/usr/bin/env zx
import "zx/globals"
import { prettier } from "../tools/string.mjs"
import { dir } from "../tools/path.mjs"
import { update } from "../tools/patch.mjs"

const name = await question("Component name? ")
const fileName = name;
const ext = "tsx"

const file = prettier(
  /*ts*/ `
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"

export interface NameProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your Name here
 */
export const Name = observer(function Name(props: NameProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Text style={$text}>Hello</Text>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
`,
  { Name: name },
)

await fs.writeFile(dir.components(`${fileName}.${ext}`), file)

await update(dir.components("index.ts"), (file) => file + `export * from "./${fileName}"` + "\n")
