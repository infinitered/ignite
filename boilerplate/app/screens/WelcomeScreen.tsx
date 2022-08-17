import { observer } from "mobx-react-lite"
import React, { useLayoutEffect } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Header, Text } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen = observer(function WelcomeScreen(props: WelcomeScreenProps) {
  const { navigation } = props
  const {
    authenticationStore: { setAuthToken },
  } = useStores()

  function goNext() {
    navigation.navigate("Demo", { screen: "DemoComponents" })
  }

  function logout() {
    setAuthToken(undefined)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header rightTx="welcomeScreen.headerRight" onRightPress={logout} />,
    })
  }, [])

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
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing[5],
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
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
