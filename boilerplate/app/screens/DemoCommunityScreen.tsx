import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ListItem, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { $styles } from "../theme"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import TranslateSheet from "translate-sheet"

const chainReactLogo = require("../../assets/images/demo/cr-logo.png")
const reactNativeLiveLogo = require("../../assets/images/demo/rnl-logo.png")
const reactNativeRadioLogo = require("../../assets/images/demo/rnr-logo.png")
const reactNativeNewsletterLogo = require("../../assets/images/demo/rnn-logo.png")

export const DemoCommunityScreen: FC<DemoTabScreenProps<"DemoCommunity">> =
  function DemoCommunityScreen(_props) {
    const { themed } = useAppTheme()
    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <Text preset="heading" text={translations.title} style={themed($title)} />
        <Text text={translations.tagLine} style={themed($tagline)} />

        <Text preset="subheading" text={translations.joinUsOnSlackTitle} />
        <Text text={translations.joinUsOnSlack} style={themed($description)} />
        <ListItem
          text={translations.joinSlackLink}
          leftIcon="slack"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://community.infinite.red/")}
        />
        <Text
          preset="subheading"
          text={translations.makeIgniteEvenBetterTitle}
          style={themed($sectionTitle)}
        />
        <Text text={translations.makeIgniteEvenBetter} style={themed($description)} />
        <ListItem
          text={translations.contributeToIgniteLink}
          leftIcon="github"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite")}
        />

        <Text
          preset="subheading"
          text={translations.theLatestInReactNativeTitle}
          style={themed($sectionTitle)}
        />
        <Text text={translations.theLatestInReactNative} style={themed($description)} />
        <ListItem
          text={translations.reactNativeRadioLink}
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={[$styles.row, themed($logoContainer)]}>
              <Image source={reactNativeRadioLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://reactnativeradio.com/")}
        />
        <ListItem
          text={translations.reactNativeNewsletterLink}
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={[$styles.row, themed($logoContainer)]}>
              <Image source={reactNativeNewsletterLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://reactnativenewsletter.com/")}
        />
        <ListItem
          text={translations.reactNativeLiveLink}
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={[$styles.row, themed($logoContainer)]}>
              <Image source={reactNativeLiveLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://rn.live/")}
        />
        <ListItem
          text={translations.chainReactConferenceLink}
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={[$styles.row, themed($logoContainer)]}>
              <Image source={chainReactLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://cr.infinite.red/")}
        />
        <Text preset="subheading" text={translations.hireUsTitle} style={themed($sectionTitle)} />
        <Text text={translations.hireUs} style={themed($description)} />
        <ListItem
          text={translations.hireUsLink}
          leftIcon="clap"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://infinite.red/contact")}
        />
      </Screen>
    )
  }

const translations = TranslateSheet.create("demoCommunityScreen", {
  title: "Connect with the community",
  tagLine:
    "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
  joinUsOnSlackTitle: "Join us on Slack",
  joinUsOnSlack:
    "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
  joinSlackLink: "Join the Slack Community",
  makeIgniteEvenBetterTitle: "Make Ignite even better",
  makeIgniteEvenBetter:
    "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
  contributeToIgniteLink: "Contribute to Ignite",
  theLatestInReactNativeTitle: "The latest in React Native",
  theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
  reactNativeRadioLink: "React Native Radio",
  reactNativeNewsletterLink: "React Native Newsletter",
  reactNativeLiveLink: "React Native Live",
  chainReactConferenceLink: "Chain React Conference",
  hireUsTitle: "Hire Infinite Red for your next project",
  hireUs:
    "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
  hireUsLink: "Send us a message",
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $tagline: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
})

const $description: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xxl,
})

const $logoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginEnd: spacing.md,
  flexWrap: "wrap",
  alignContent: "center",
  alignSelf: "stretch",
})

const $logo: ImageStyle = {
  height: 38,
  width: 38,
}

// @demo remove-file
