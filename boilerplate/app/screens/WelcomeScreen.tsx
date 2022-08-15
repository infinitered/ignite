import { observer } from "mobx-react-lite"
import React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen = observer(function WelcomeScreen(props: WelcomeScreenProps) {
  const { navigation } = props

  function goNext() {
    navigation.navigate("Demo", { screen: "DemoComponents" })
  }

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
          <Button preset="reversed" tx="welcomeScreen.letsGo" onPress={goNext} />
        </View>
      </SafeAreaView>
    </View>
  )
})

const $container: ViewStyle = {
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexGrow: 0,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing[5],
}

const $bottomContainer: ViewStyle = {
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderRadius: 16,
}

const $bottomContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing[5],
  justifyContent: "space-around",
}

const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing[7],
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing[4],
}
