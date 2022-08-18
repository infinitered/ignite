import { observer } from "mobx-react-lite"
import React from "react"
import { Image, ImageStyle, Platform, TextStyle, View, ViewStyle } from "react-native"
import { BulletItem, Button, Icon, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { Api } from "../services/api"
import { colors, spacing } from "../theme"
import { save } from "../utils/storage"

// MAVERICKTODO: reexport these icons (including the 3x version and move to assets folder)
const logoIgnite = require("../../assets/images/logo.png")

// MAVERICKTODO: update this screen with new styling patterns

const FULL: ViewStyle = { flex: 1, marginHorizontal: spacing[4] }
const CONTAINER: ViewStyle = {
  backgroundColor: colors.transparent,
}
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  // backgroundColor: colors.palette.deepPurple,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
// const HEADER: TextStyle = {
//   paddingTop: spacing[3],
//   paddingBottom: spacing[5] - 1,
//   paddingHorizontal: 0,
// }
// const HEADER_TITLE: TextStyle = {
//   ...BOLD,
//   fontSize: 12,
//   lineHeight: 15,
//   textAlign: "center",
//   letterSpacing: 1.5,
// }
const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}
const TAGLINE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
}
const IGNITE: ImageStyle = {
  marginVertical: spacing[6],
  alignSelf: "center",
  width: 180,
  height: 100,
}
const LOVE_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
}
const LOVE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}
const HEART: ImageStyle = {
  marginHorizontal: spacing[2],
  width: 10,
  height: 10,
  resizeMode: "contain",
}
const HINT: TextStyle = {
  color: "#BAB6C8",
  fontSize: 12,
  lineHeight: 15,
  marginVertical: spacing[2],
}

export const DemoDebugScreen = observer(function DemoDebugScreen(
  props: DemoTabScreenProps<"DemoDebug">,
) {
  const { navigation } = props
  // const goBack = () => navigation.goBack()

  const demoReactotron = React.useMemo(
    () => async () => {
      console.tron.log("Your Friendly tron log message")
      console.tron.logImportant("I am important")
      console.tron.display({
        name: "DISPLAY",
        value: {
          numbers: 1,
          strings: "strings",
          booleans: true,
          arrays: [1, 2, 3],
          objects: {
            deeper: {
              deeper: {
                yay: "👾",
              },
            },
          },
          functionNames: function hello() {
            /* dummy function */
          },
        },
        preview: "More control with display()",
        important: true,
        image: {
          uri: "https://avatars2.githubusercontent.com/u/3902527?s=200&u=a0d16b13ed719f35d95ca0f4440f5d07c32c349a&v=4",
        },
      })
      // make an API call for the demo
      // Don't do API like this, use store's API
      const demo = new Api()
      demo.setup()
      demo.getUser("1")
      // Let's do some async storage stuff
      await save("Cool Name", "Boaty McBoatface")
    },
    [],
  )

  return (
    <View testID="DemoScreen" style={FULL}>
      <Screen
        style={CONTAINER}
        preset="scroll"
        backgroundColor={colors.transparent}
        safeAreaEdges={["top"]}
      >
        {/* 
        MAVERICKTODO: move this to navigation.setOptions({}) similar to WelcomeScreen
        <Header
          titleTx="demoDebugScreen.howTo"
          leftIcon="back"
          onLeftPress={goBack}
        /> */}

        <Text style={TITLE} preset="heading" tx="demoDebugScreen.title" />
        <Text style={TAGLINE} tx="demoDebugScreen.tagLine" />
        <BulletItem text="Integrated here, Navigation with State, TypeScript,  and i18n." />
        <BulletItem text="Load up Reactotron! You can inspect your app, view the events, interact, and so much more!" />
        <View>
          <Button
            style={DEMO}
            textStyle={DEMO_TEXT}
            tx="demoDebugScreen.reactotron"
            onPress={demoReactotron}
          />
          <Text style={HINT} tx={`demoDebugScreen.${Platform.OS}ReactotronHint` as const} />
        </View>
        <Button
          style={DEMO}
          textStyle={DEMO_TEXT}
          tx="demoDebugScreen.demoList"
          onPress={() => navigation.navigate("DemoComponents")}
        />
        <Image source={logoIgnite} style={IGNITE} />
        <View style={LOVE_WRAPPER}>
          <Text style={LOVE} text="Made with" />
          <Icon icon="heart" style={HEART} />
          <Text style={LOVE} text="by Infinite Red" />
        </View>
      </Screen>
    </View>
  )
})
