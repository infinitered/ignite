import {
  MarkupComments,
  markupComment,
  removeBlocks,
  removeCurrentLine,
  removeNextLine,
  updateFile,
} from "./markup"

const TEST_MARKUP_PREFIX = "@test"

describe("markup", () => {
  describe("removeCurrentLine", () => {
    it(`should remove line with "// ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveCurrentLine}" comment`, () => {
      const comment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveCurrentLine)
      const contents = `
        import { StyleProp, View, ViewStyle } from "react-native"

        interface DemoDividerProps {
            type?: "vertical" | "horizontal"
            size?: number
            style?: StyleProp<ViewStyle>
        }

        export function DemoDivider(props: DemoDividerProps) {
            const { type = "horizontal", size = 10, style: $styleOverride } = props

            return (
              <View
                  style={[
                    $divider,
                    type === "horizontal" && { height: size },
                    type === "vertical" && { width: size },
                    $styleOverride,
                  ]}
              />
            )
        }

        const $divider: ViewStyle = {
            flexGrow: 0,
            flexShrink: 0, // ${comment}
        }
      `
      const result = removeCurrentLine(contents, comment)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(comment)
    })

    it(`should remove line with "/* ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveCurrentLine} */" comment`, () => {
      const comment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveCurrentLine)
      const contents = `
        import { StyleProp, View, ViewStyle } from "react-native"

        interface DemoDividerProps {
            type?: "vertical" | "horizontal"
            size?: number
            style?: StyleProp<ViewStyle>
        }

        export function DemoDivider(props: DemoDividerProps) {
            const { type = "horizontal", size = 10, style: $styleOverride } = props

            return (
              <View
                  style={[
                    $divider,
                    type === "horizontal" && { height: size },
                    type === "vertical" && { width: size },
                    $styleOverride, {/* ${comment} */}
                  ]}
              />
            )
        }

        const $divider: ViewStyle = {
            flexGrow: 0,
            flexShrink: 0, // ${comment}
        }
      `
      const result = removeCurrentLine(contents, comment)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(comment)
    })

    it(`should remove line with "# ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveCurrentLine}" comment`, () => {
      const comment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveCurrentLine)
      const contents = `
      # flow: run the login flow and then navigate to the demo podcast list screen, favorite a podcast, and then switch the list to only be favorites.
      appId: com.helloworld # ${comment}
      env:
        TITLE: "RNR 257 - META RESPONDS! How can we improve React Native, part 2"
        FAVORITES_TEXT: "Switch on to only show favorites"

      ---
      - runFlow: Login.yaml
      - tapOn: "Podcast, tab, 3 of 4"
      - assertVisible: "React Native Radio episodes"
      `
      const result = removeCurrentLine(contents, comment)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(comment)
    })
  })
  describe("removeNextLine", () => {
    it(`should remove comment and next line after "// ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveNextLine}"`, () => {
      const comment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveNextLine)
      const contents = `
          export * from "./WelcomeScreen"
          export * from "./LoginScreen"
          // ${comment}
          export * from "./DemoCommunityScreen"
        `
      const result = removeNextLine(contents, comment)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(comment)
      expect(result).not.toContain("DemoCommunityScreen")
    })

    it(`should remove comment and next line after "/* ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveNextLine} */"`, () => {
      const comment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveNextLine)
      const contents = `
          export * from "./WelcomeScreen"
          export * from "./LoginScreen"
          /* ${comment} */
          export * from "./DemoCommunityScreen"
        `
      const result = removeNextLine(contents, comment)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(comment)
      expect(result).not.toContain("DemoCommunityScreen")
    })

    it(`should remove comment and next line after "# ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveNextLine}"`, () => {
      const comment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveNextLine)
      const contents = `
        # flow: run the login flow and then navigate to the demo podcast list screen, favorite a podcast, and then switch the list to only be favorites.
        # ${comment}
        appId: com.helloworld
        env:
          TITLE: "RNR 257 - META RESPONDS! How can we improve React Native, part 2"
          FAVORITES_TEXT: "Switch on to only show favorites"

        ---
        - runFlow: Login.yaml
        - tapOn: "Podcast, tab, 3 of 4"
        - assertVisible: "React Native Radio episodes"
        `
      const result = removeNextLine(contents, comment)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(comment)
      expect(result).not.toContain("appId: com.helloworld")
    })

    it(`should not modify other lines other than "// ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveNextLine} and line after"`, () => {
      const comment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveNextLine)
      // simulate whitespace and new lines of file after prettier format
      const contents = [
        `export * from "./DemoIcon"`,
        `export * from "./DemoTextField"`,
        `export * from "./DemoButton"`,
        `export * from "./DemoListItem"`,
        `export * from "./DemoHeader"`,
        `// ${comment}`,
        `export * from "./DemoAutoImage"`,
        `export * from "./DemoText"`,
      ].join("\n")

      const result = removeNextLine(contents, comment)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(comment)
      expect(result).toEqual(
        [
          `export * from "./DemoIcon"`,
          `export * from "./DemoTextField"`,
          `export * from "./DemoButton"`,
          `export * from "./DemoListItem"`,
          `export * from "./DemoHeader"`,
          `export * from "./DemoText"`,
        ].join("\n"),
      )
    })
  })
  describe("removeBlock", () => {
    it(`should remove comments and lines between "// ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveBlockStart}" and "// ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveBlockEnd}"`, () => {
      const startComment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveBlockStart)
      const endComment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveBlockEnd)
      const contents = `
          export * from "./WelcomeScreen"
          export * from "./LoginScreen"
          // ${startComment}
          export * from "./DemoCommunityScreen"
          export * from "./DemoDebugScreen"
          export * from "./DemoShowroomScreen/DemoShowroomScreen"
          // ${endComment}
          export * from "./ErrorScreen/ErrorBoundary"
          // export other screens here
        `
      const result = removeBlocks(contents, { start: startComment, end: endComment })
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(startComment)
      expect(result).not.toContain(endComment)
      expect(result).not.toContain("DemoCommunityScreen")
      expect(result).not.toContain("DemoDebugScreen")
      expect(result).not.toContain("DemoShowroomScreen")
    })

    it(`should remove comments and lines between "/* ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveBlockStart} */" and "/* ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveBlockEnd} */"`, () => {
      const startComment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveBlockStart)
      const endComment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveBlockEnd)
      const contents = `
          export * from "./WelcomeScreen"
          export * from "./LoginScreen"
          /* ${startComment} */
          export * from "./DemoCommunityScreen"
          export * from "./DemoDebugScreen"
          export * from "./DemoShowroomScreen/DemoShowroomScreen"
          /* ${endComment} */
          export * from "./ErrorScreen/ErrorBoundary"
          // export other screens here
        `
      const result = removeBlocks(contents, { start: startComment, end: endComment })
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(startComment)
      expect(result).not.toContain(endComment)
      expect(result).not.toContain("DemoCommunityScreen")
      expect(result).not.toContain("DemoDebugScreen")
      expect(result).not.toContain("DemoShowroomScreen")
    })

    it(`should remove comments and lines between "# ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveBlockStart}" and "# ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveBlockEnd}"`, () => {
      const startComment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveBlockStart)
      const endComment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveBlockEnd)
      const contents = `
        # ${startComment}
        # flow: run the login flow and then navigate to the demo podcast list screen, favorite a podcast, and then switch the list to only be favorites.
        appId: com.helloworld
        env:
        TITLE: "RNR 257 - META RESPONDS! How can we improve React Native, part 2"
        FAVORITES_TEXT: "Switch on to only show favorites"
        # ${endComment}

        ---
        - runFlow: Login.yaml
        - tapOn: "Podcast, tab, 3 of 4"
        - assertVisible: "React Native Radio episodes"
        `
      const result = removeBlocks(contents, { start: startComment, end: endComment })
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(startComment)
      expect(result).not.toContain(endComment)
      expect(result).not.toContain("# flow")
      expect(result).not.toContain("appId: com.helloworld")
      expect(result).not.toContain("env:")
      expect(result).not.toContain("TITLE:")
      expect(result).not.toContain("FAVORITES_TEXT:")
    })

    it(`should remove multiple "// ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveBlockStart}" and "// ${TEST_MARKUP_PREFIX} ${MarkupComments.RemoveBlockEnd}" sections in the same file string`, () => {
      const startComment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveBlockStart)
      const endComment = markupComment(TEST_MARKUP_PREFIX, MarkupComments.RemoveBlockEnd)
      const contents = [
        `export * from "./WelcomeScreen"`,
        `// ${startComment}`,
        `export * from "./LoginScreen"`,
        `// ${endComment}`,
        `// ${startComment}`,
        `export * from "./DemoCommunityScreen"`,
        `export * from "./DemoDebugScreen"`,
        `export * from "./DemoShowroomScreen/DemoShowroomScreen"`,
        `// ${endComment}`,
        `export * from "./ErrorScreen/ErrorBoundary"`,
        `// export other screens here'`,
      ].join("\n")

      const result = removeBlocks(contents, { start: startComment, end: endComment })

      expect(result).toEqual(
        [
          `export * from "./WelcomeScreen"`,
          `export * from "./ErrorScreen/ErrorBoundary"`,
          `// export other screens here'`,
        ].join("\n"),
      )
      expect(result).not.toContain(startComment)
      expect(result).not.toContain(endComment)
    })
  })

  describe("remove", () => {
    const removeMarkupPrefix = "@demo"
    it("should remove all comments in WelcomeScreen", () => {
      const blockStartComment = markupComment(removeMarkupPrefix, MarkupComments.RemoveBlockStart)
      const blockEndComment = markupComment(removeMarkupPrefix, MarkupComments.RemoveBlockEnd)
      const currentLineComment = markupComment(removeMarkupPrefix, MarkupComments.RemoveCurrentLine)

      const result = updateFile(WelcomeScreen, removeMarkupPrefix)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(blockStartComment)
      expect(result).not.toContain(blockEndComment)
      expect(result).not.toContain(currentLineComment)
      expect(result).not.toContain(
        /* jsx */ `<Button preset="reversed" tx="welcomeScreen:letsGo" onPress={goNext} />`,
      )
      expect(result).not.toContain(`props: WelcomeScreenProps`)
      expect(result).not.toContain(`goNext()`)
    })

    it("should remove all comments in AppNavigator", () => {
      const blockStartComment = markupComment(removeMarkupPrefix, MarkupComments.RemoveBlockStart)
      const blockEndComment = markupComment(removeMarkupPrefix, MarkupComments.RemoveBlockEnd)
      const currentLineComment = markupComment(removeMarkupPrefix, MarkupComments.RemoveCurrentLine)

      const result = updateFile(AppNavigator, removeMarkupPrefix)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(blockStartComment)
      expect(result).not.toContain(blockEndComment)
      expect(result).not.toContain(currentLineComment)
      expect(result).not.toContain(`NavigatorScreenParams`)
      expect(result).not.toContain(`import { useStores } from "../models"`)
      expect(result).not.toContain(
        `import { DemoNavigator, DemoTabParamList } from "./DemoNavigator" "`,
      )
      expect(result).not.toContain(") : (")
    })
  })
})

const WelcomeScreen = /* jsx */ `
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button, // @demo remove-current-line
  Text,
} from "app/components"
import { isRTL } from "../i18n"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "app/theme"
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "app/utils/useAppTheme" // @demo remove-current-line

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props, // @demo remove-current-line
) {
  // @demo remove-block-start
  const { themed } = useAppTheme()
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  function goNext() {
    navigation.navigate("Demo", { screen: "DemoShowroom", params: {} })
  }

  useHeader(
    {
      rightTx: "common.logOut",
      onRightPress: logout,
    },
    [logout],
  )
  // @demo remove-block-end

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={themed($container)}>
      <View style={themed($topContainer)}>
        <Image style={themed($welcomeLogo)} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={themed($welcomeHeading)}
          tx="welcomeScreen:readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen:exciting" preset="subheading" />
        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
      </View>

      <View style={[themed($bottomContainer), $bottomContainerInsets]}>
        <Text tx="welcomeScreen:postscript" size="md" />
        {/* @demo remove-block-start */}
        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="welcomeScreen:letsGo"
          onPress={goNext}
        />
        {/* @demo remove-block-end */}
      </View>
    </View>
  )
})

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
})

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
})

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})
`
const AppNavigator = /* jsx */ `
/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  NavigationContainer,
  NavigatorScreenParams, // @demo remove-current-line
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import * as Screens from "app/screens"
import Config from "../config"
import { useStores } from "../models" // @demo remove-current-line
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator" // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { useAppTheme, useThemeProvider } from "app/utils/useAppTheme"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through undefined. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined // @demo remove-current-line
  Demo: NavigatorScreenParams<DemoTabParamList> // @demo remove-current-line
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  // @demo remove-block-start
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()
  const { theme: { colors } } = useAppTheme()

  // @demo remove-block-end
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={isAuthenticated ? "Welcome" : "Login"} // @demo remove-current-line
    >
      {/* @demo remove-block-start */}
      {isAuthenticated ? (
        <>
          {/* @demo remove-block-end */}
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
          {/* @demo remove-block-start */}
          <Stack.Screen name="Demo" component={DemoNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
        </>
      )}
      {/* @demo remove-block-end */}
      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const { theme, navigationTheme, setThemeContextOverride, ThemeProvider } = useThemeProvider()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <ThemeProvider value={{ theme, setThemeContextOverride }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
        <AppStack />
      </NavigationContainer>
    </ThemeProvider>
  )
})
`
