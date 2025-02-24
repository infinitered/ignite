import { observer } from "mobx-react-lite" // @mst remove-current-line
import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button, // @demo remove-current-line
  Text,
  Screen,
} from "@/components"
import { isRTL } from "@/i18n"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps } from "../navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import TranslateSheet from "translate-sheet"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

// @mst replace-next-line export const WelcomeScreen: FC<WelcomeScreenProps> = (
export const WelcomeScreen: FC<WelcomeScreenProps> = observer(
  function WelcomeScreen( // @mst remove-current-line
    _props, // @demo remove-current-line
    // @mst replace-next-line ) => {
  ) {
    const { themed, theme } = useAppTheme()
    // @demo remove-block-start
    const { navigation } = _props
    const {
      authenticationStore: { logout },
    } = useStores()

    function goNext() {
      navigation.navigate("Demo", { screen: "DemoShowroom", params: {} })
    }

    useHeader(
      {
        rightTx: "common:logOut",
        onRightPress: logout,
      },
      [logout],
    )
    // @demo remove-block-end

    const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={themed($topContainer)}>
          <Image style={themed($welcomeLogo)} source={welcomeLogo} resizeMode="contain" />
          <Text testID="welcome-heading" style={themed($welcomeHeading)} preset="heading">
            {translations.readyForLaunch}
          </Text>
          <Text preset="subheading">{translations.exciting}</Text>
          <Image
            style={$welcomeFace}
            source={welcomeFace}
            resizeMode="contain"
            tintColor={theme.isDark ? theme.colors.palette.neutral900 : undefined}
          />
        </View>

        <View style={themed([$bottomContainer, $bottomContainerInsets])}>
          <Text size="md">{translations.postscript}</Text>
          {/* @demo remove-block-start */}
          <Button testID="next-screen-button" preset="reversed" onPress={goNext}>
            {translations.letsGo}
          </Button>
          {/* @demo remove-block-end */}
        </View>
      </Screen>
    )
    // @mst replace-next-line }
  },
) // @mst remove-current-line

const translations = TranslateSheet.create("welcomeScreen", {
  postscript:
    "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
  readyForLaunch:  "Your app, almost ready for launch!",
  exciting: "(ohh, this is exciting!)",
  letsGo: "Let's go!",
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
