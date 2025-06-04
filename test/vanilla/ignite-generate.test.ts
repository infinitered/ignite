import { filesystem } from "gluegun"
import * as tempy from "tempy"

import {
  copyDefaultScreenGenerator,
  copyExpoRouterScreenGenerator,
  removeDefaultScreenGenerator,
  removeExpoRouterScreenGenerator,
  runIgnite,
} from "../_test-helpers"

const BOILERPLATE_PATH = filesystem.path(__dirname, "../../boilerplate")

const setup = (): { TEMP_DIR: string } => {
  const TEMP_DIR = tempy.directory({ prefix: "ignite-" })

  beforeEach(() => {
    // create the destination directory
    filesystem.dir(TEMP_DIR)
    // copy the relevant folders
    filesystem.copy(BOILERPLATE_PATH + "/app", TEMP_DIR + "/app", { overwrite: true })
    filesystem.copy(BOILERPLATE_PATH + "/ignite", TEMP_DIR + "/ignite", { overwrite: true })
  })

  afterEach(() => {
    filesystem.remove(TEMP_DIR) // clean up our mess
  })

  return { TEMP_DIR }
}

const { read } = filesystem

const { TEMP_DIR } = setup()
const options = {
  pre: `cd ${TEMP_DIR}`,
  post: `cd ${process.cwd()}`,
}

/**
 * "/user/home/ignite" replaces the temp directory, so we don't get failures when it changes every test run
 * @returns command output with temp directory replaced
 */
const replaceHomeDir = (result: string, { mock = "/user/home/ignite", temp = TEMP_DIR } = {}) =>
  result.replace(new RegExp(temp, "g"), mock)

describe("ignite-cli generate", () => {
  describe("components", () => {
    it("should generate Topping component and patch index components export", async () => {
      const result = await runIgnite(`generate component Topping`, options)

      expect(replaceHomeDir(result)).toMatchInlineSnapshot(`
        "   
           
           Generated new files:
           /user/home/ignite/app/components/Topping.tsx
        "
      `)
      expect(read(`${TEMP_DIR}/app/components/Topping.tsx`)).toMatchInlineSnapshot(`
"import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { useAppTheme, type ThemedStyle } from "@/theme"
import { Text } from "@/components/Text"

export interface ToppingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Topping = (props: ToppingProps) => {
  const { style } = props
  const $styles = [$container, style]
  const { themed } = useAppTheme();

  return (
    <View style={$styles}>
      <Text style={themed($text)}>Hello</Text>
    </View>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
})
"
`)
      expect(read(`${TEMP_DIR}/app/components/index.ts`)).toMatchInlineSnapshot(`undefined`)
    })

    it("should generate Topping component in subdirectory and patch index components export", async () => {
      const result = await runIgnite(`generate component sub/to/my/Topping`, options)

      expect(replaceHomeDir(result)).toMatchInlineSnapshot(`
        "   
           
           Generated new files:
           /user/home/ignite/app/components/sub/to/my/Topping.tsx
        "
      `)
      expect(read(`${TEMP_DIR}/app/components/sub/to/my/Topping.tsx`)).toMatchInlineSnapshot(`
"import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { useAppTheme, type ThemedStyle } from "@/theme"
import { Text } from "@/components/Text"

export interface ToppingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Topping = (props: ToppingProps) => {
  const { style } = props
  const $styles = [$container, style]
  const { themed } = useAppTheme();

  return (
    <View style={$styles}>
      <Text style={themed($text)}>Hello</Text>
    </View>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
})
"
`)
      expect(read(`${TEMP_DIR}/app/components/index.ts`)).toMatchInlineSnapshot(`undefined`)
    })
  })
})

describe("ignite-cli generate with path params", () => {
  it("should generate Topping component in the src/components directory", async () => {
    const result = await runIgnite(`generate component Topping --dir=src/components`, options)

    expect(replaceHomeDir(result)).toMatchInlineSnapshot(`
      "   
         
         Generated new files:
         /user/home/ignite/src/components/Topping.tsx
      "
    `)
  })

  it("should generate Sicilian screen in the src/screens directory", async () => {
    const result = await runIgnite(`generate screen Sicilian --dir=src/screens`, options)

    expect(replaceHomeDir(result)).toMatchInlineSnapshot(`
      "   
         
         Generated new files:
         /user/home/ignite/src/screens/SicilianScreen.tsx
      "
    `)
  })
})

describe("ignite-cli generate screens expo-router style", () => {
  beforeEach(() => {
    // modify the generator template for screens to be a standard pattern for expo-router
    removeDefaultScreenGenerator(TEMP_DIR)
    copyExpoRouterScreenGenerator(TEMP_DIR)
  })

  afterEach(() => {
    // restore the generator template for screens to be a standard pattern for react-navigation
    removeExpoRouterScreenGenerator(TEMP_DIR)
    copyDefaultScreenGenerator(TEMP_DIR)
  })

  it("should generate `log-in` screen exactly in the requested path", async () => {
    const result = await runIgnite(
      `generate screen log-in --case=none --dir="src/app/(app)/(tabs)"`,
      options,
    )

    expect(replaceHomeDir(result)).toMatchInlineSnapshot(`
      "   
         
         Generated new files:
         /user/home/ignite/src/app/(app)/(tabs)/log-in.tsx
      "
    `)
    expect(read(`${TEMP_DIR}/src/app/(app)/(tabs)/log-in.tsx`)).toMatchInlineSnapshot(`
"import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"

export default function LogInScreen() {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="logIn" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
"
`)
  })

  it("should generate dynamic id files at requested path", async () => {
    const result = await runIgnite(
      `generate screen [id] --case=none --dir="src/app/(app)/(tabs)/podcasts"`,
      options,
    )

    expect(replaceHomeDir(result)).toMatchInlineSnapshot(`
        "   
           
           Generated new files:
           /user/home/ignite/src/app/(app)/(tabs)/podcasts/[id].tsx
        "
      `)
    expect(read(`${TEMP_DIR}/src/app/(app)/(tabs)/podcasts/[id].tsx`)).toMatchInlineSnapshot(`
"import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"

export default function IdScreen() {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="id" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
"
`)
  })
})
