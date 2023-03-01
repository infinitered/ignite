import { demo } from "./demo"

const { REMOVE_BLOCK_START, REMOVE_BLOCK_END, REMOVE_CURRENT_LINE, REMOVE_NEXT_LINE } =
  demo.CommentType

describe("demo", () => {
  describe("removeCurrentLine", () => {
    it(`should remove line with "// ${demo.CommentType.REMOVE_CURRENT_LINE}" comment`, () => {
      const contents = `
        import React from "react"
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
            flexShrink: 0, // ${demo.CommentType.REMOVE_CURRENT_LINE}
        }
      `
      const result = demo.removeCurrentLine(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(demo.CommentType.REMOVE_CURRENT_LINE)
    })

    it(`should remove line with "/* ${demo.CommentType.REMOVE_CURRENT_LINE} */" comment`, () => {
      const contents = `
        import React from "react"
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
                    $styleOverride, {/* ${demo.CommentType.REMOVE_CURRENT_LINE} */}
                  ]}
              />
            )
        }
        
        const $divider: ViewStyle = {
            flexGrow: 0,
            flexShrink: 0,
        }
      `
      const result = demo.removeCurrentLine(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(demo.CommentType.REMOVE_CURRENT_LINE)
    })

    it(`should remove line with "# ${REMOVE_CURRENT_LINE}" comment`, () => {
      const contents = `
      # flow: run the login flow and then navigate to the demo podcast list screen, favorite a podcast, and then switch the list to only be favorites.
      appId: com.helloworld # ${REMOVE_CURRENT_LINE}
      env:
        TITLE: "RNR 257 - META RESPONDS! How can we improve React Native, part 2"
        FAVORITES_TEXT: "Switch on to only show favorites"

      ---
      - runFlow: Login.yaml
      - tapOn: "Podcast, tab, 3 of 4"
      - assertVisible: "React Native Radio episodes"
      `
      const result = demo.removeCurrentLine(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(REMOVE_CURRENT_LINE)
    })
  })

  describe("removeNextLine", () => {
    it(`should remove comment and next line after "// ${demo.CommentType.REMOVE_NEXT_LINE}"`, () => {
      const contents = `
        export * from "./WelcomeScreen"
        export * from "./LoginScreen"
        // ${demo.CommentType.REMOVE_NEXT_LINE}
        export * from "./DemoCommunityScreen"
      `
      const result = demo.removeNextLine(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(demo.CommentType.REMOVE_NEXT_LINE)
      expect(result).not.toContain("DemoCommunityScreen")
    })

    it(`should remove comment and next line after "/* ${demo.CommentType.REMOVE_NEXT_LINE} */"`, () => {
      const contents = `
        export * from "./WelcomeScreen"
        export * from "./LoginScreen"
        /* ${demo.CommentType.REMOVE_NEXT_LINE} */
        export * from "./DemoCommunityScreen"
      `
      const result = demo.removeNextLine(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(demo.CommentType.REMOVE_NEXT_LINE)
      expect(result).not.toContain("DemoCommunityScreen")
    })
    it(`should remove comment and next line after "# ${REMOVE_NEXT_LINE}"`, () => {
      const contents = `
      # flow: run the login flow and then navigate to the demo podcast list screen, favorite a podcast, and then switch the list to only be favorites.
      # ${REMOVE_NEXT_LINE}
      appId: com.helloworld
      env:
        TITLE: "RNR 257 - META RESPONDS! How can we improve React Native, part 2"
        FAVORITES_TEXT: "Switch on to only show favorites"

      ---
      - runFlow: Login.yaml
      - tapOn: "Podcast, tab, 3 of 4"
      - assertVisible: "React Native Radio episodes"
      `
      const result = demo.removeNextLine(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(REMOVE_NEXT_LINE)
      expect(result).not.toContain("appId: com.helloworld")
    })

    it(`should not modify other lines other than "// ${demo.CommentType.REMOVE_NEXT_LINE} and line after"`, () => {
      // simulate whitespace and new lines of file after prettier format
      const contents = [
        `export * from "./DemoIcon"`,
        `export * from "./DemoTextField"`,
        `export * from "./DemoButton"`,
        `export * from "./DemoListItem"`,
        `export * from "./DemoHeader"`,
        `// ${demo.CommentType.REMOVE_NEXT_LINE}`,
        `export * from "./DemoAutoImage"`,
        `export * from "./DemoText"`,
      ].join("\n")

      const result = demo.removeNextLine(contents)
      expect(result).not.toContain(demo.CommentType.REMOVE_NEXT_LINE)
      expect(result).not.toContain("DemoAutoImage")
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
    it(`should remove comments and lines between "// ${demo.CommentType.REMOVE_BLOCK_START}" and "// ${demo.CommentType.REMOVE_BLOCK_END}"`, () => {
      const contents = `
        export * from "./WelcomeScreen"
        export * from "./LoginScreen"
        // ${demo.CommentType.REMOVE_BLOCK_START}
        export * from "./DemoCommunityScreen"
        export * from "./DemoDebugScreen"
        export * from "./DemoShowroomScreen/DemoShowroomScreen"
        // ${demo.CommentType.REMOVE_BLOCK_END}
        export * from "./ErrorScreen/ErrorBoundary"
        // export other screens here
      `
      const result = demo.removeBlock(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(demo.CommentType.REMOVE_BLOCK_START)
      expect(result).not.toContain(demo.CommentType.REMOVE_BLOCK_END)
      expect(result).not.toContain("DemoCommunityScreen")
      expect(result).not.toContain("DemoDebugScreen")
      expect(result).not.toContain("DemoShowroomScreen")
    })

    it(`should remove comments and lines between "/* ${demo.CommentType.REMOVE_BLOCK_START} */" and "/* ${demo.CommentType.REMOVE_BLOCK_END} */"`, () => {
      const contents = `
        export * from "./WelcomeScreen"
        export * from "./LoginScreen"
        /* ${demo.CommentType.REMOVE_BLOCK_START} */
        export * from "./DemoCommunityScreen"
        export * from "./DemoDebugScreen"
        export * from "./DemoShowroomScreen/DemoShowroomScreen"
        /* ${demo.CommentType.REMOVE_BLOCK_END} */
        export * from "./ErrorScreen/ErrorBoundary"
        // export other screens here
      `
      const result = demo.removeBlock(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(demo.CommentType.REMOVE_BLOCK_START)
      expect(result).not.toContain(demo.CommentType.REMOVE_BLOCK_END)
      expect(result).not.toContain("DemoCommunityScreen")
      expect(result).not.toContain("DemoDebugScreen")
      expect(result).not.toContain("DemoShowroomScreen")
    })

    it(`should remove comments and lines between "# ${REMOVE_BLOCK_START}" and "# ${REMOVE_BLOCK_END}"`, () => {
      const contents = `
      # ${REMOVE_BLOCK_START}
      # flow: run the login flow and then navigate to the demo podcast list screen, favorite a podcast, and then switch the list to only be favorites.
      appId: com.helloworld
      env:
      TITLE: "RNR 257 - META RESPONDS! How can we improve React Native, part 2"
      FAVORITES_TEXT: "Switch on to only show favorites"
      # ${REMOVE_BLOCK_END}

      ---
      - runFlow: Login.yaml
      - tapOn: "Podcast, tab, 3 of 4"
      - assertVisible: "React Native Radio episodes"
      `
      const result = demo.removeBlock(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(REMOVE_BLOCK_START)
      expect(result).not.toContain(REMOVE_BLOCK_END)
      expect(result).not.toContain("# flow")
      expect(result).not.toContain("appId: com.helloworld")
      expect(result).not.toContain("env:")
      expect(result).not.toContain("TITLE:")
      expect(result).not.toContain("FAVORITES_TEXT:")
    })

    it(`should remove multiple "// ${demo.CommentType.REMOVE_BLOCK_START}" and "// ${demo.CommentType.REMOVE_BLOCK_END}" sections in the same file string`, () => {
      const contents: string = [
        `export * from "./WelcomeScreen"`,
        `// ${REMOVE_BLOCK_START}`,
        `export * from "./LoginScreen"`,
        `// ${REMOVE_BLOCK_END}`,
        `// ${REMOVE_BLOCK_START}`,
        `export * from "./DemoCommunityScreen"`,
        `export * from "./DemoDebugScreen"`,
        `export * from "./DemoShowroomScreen/DemoShowroomScreen"`,
        `// ${REMOVE_BLOCK_END}`,
        `export * from "./ErrorScreen/ErrorBoundary"`,
        `// export other screens here'`,
      ].join("\n")

      const result = demo.removeBlock(contents)

      expect(result).toEqual(
        [
          `export * from "./WelcomeScreen"`,
          `export * from "./ErrorScreen/ErrorBoundary"`,
          `// export other screens here'`,
        ].join("\n"),
      )
      expect(result).not.toContain(demo.CommentType.REMOVE_BLOCK_START)
      expect(result).not.toContain(demo.CommentType.REMOVE_BLOCK_END)
    })
  })

  describe("remove", () => {
    it("should remove all comments in WelcomeScreen", () => {
      const result = demo.remove(WelcomeScreen)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(REMOVE_BLOCK_START)
      expect(result).not.toContain(REMOVE_BLOCK_END)
      expect(result).not.toContain(REMOVE_CURRENT_LINE)
      expect(result).not.toContain(
        /* jsx */ `<Button preset="reversed" tx="welcomeScreen.letsGo" onPress={goNext} />`,
      )
      expect(result).not.toContain(`props: WelcomeScreenProps`)
      expect(result).not.toContain(`goNext()`)
    })

    it("should remove all comments in AppNavigator", () => {
      const result = demo.remove(AppNavigator)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(REMOVE_BLOCK_START)
      expect(result).not.toContain(REMOVE_BLOCK_END)
      expect(result).not.toContain(REMOVE_CURRENT_LINE)
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
import React, { useLayoutEffect } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Header, Text } from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { colors, spacing } from "../theme"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {} // @demo remove-current-line

export const WelcomeScreen = observer(function WelcomeScreen(
    props: WelcomeScreenProps // @demo remove-current-line
  ) {
  // @demo remove-block-start
  const { navigation } = props
  const {
    authenticationStore: { logout },
  } = useStores()

  function goNext() {
    navigation.navigate("Demo", { screen: "DemoShowroom" })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header rightTx="common.logOut" onRightPress={logout} />,
    })
  }, [])
  // @demo remove-block-end

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text style={$welcomeHeading} tx="welcomeScreen.readyForLaunch" preset="heading" />
        <Text tx="welcomeScreen.exciting" preset="subheading" />
        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
      </View>

      <SafeAreaView style={$bottomContainer} edges={["bottom"]}>
        <View style={$bottomContentContainer}>
          <Text tx="welcomeScreen.postscript" size="md" />
          <Button preset="reversed" tx="welcomeScreen.letsGo" onPress={goNext} /> {/* @demo remove-current-line */}
        </View>
      </SafeAreaView>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
}

const $bottomContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}

const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.huge,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
`
const AppNavigator = /* jsx */ `
/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
 import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams, // @demo remove-current-line
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { useStores } from "../models" // @demo remove-current-line
import { 
  LoginScreen, // @demo remove-current-line
  WelcomeScreen 
} from "../screens"
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator" // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through \`undefined\`. Generally speaking, we
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
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
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

  // @demo remove-block-end
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "Welcome" : "Login"} // @demo remove-current-line
    >
      {/* @demo remove-block-start */}
      {isAuthenticated ? (
        <>
          {/* @demo remove-block-end */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Demo" component={DemoNavigator} /> {/* @demo remove-block-start */}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
      {/* @demo remove-block-end */}
      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
`
