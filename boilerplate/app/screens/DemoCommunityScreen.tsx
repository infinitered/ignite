import React from "react"
import { Image, ImageStyle, Linking, TextStyle, View, ViewStyle } from "react-native"
import { ListItem, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"

const chainReactLogo = require("../../assets/images/cr-logo.png")
const reactNativeLiveLogo = require("../../assets/images/rnl-logo.png")
const reactNativeRadioLogo = require("../../assets/images/rnr-logo.png")
const reactNativeNewsletterLogo = require("../../assets/images/rnn-logo.png")

function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

export function DemoCommunityScreen(_props: DemoTabScreenProps<"DemoCommunity">) {
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="demoCommunityScreen.title" style={$title} />
      <Text tx="demoCommunityScreen.tagLine" style={$tagline} />

      <Text preset="subheading" tx="demoCommunityScreen.joinUsOnSlackTitle" />
      <Text tx="demoCommunityScreen.joinUsOnSlack" style={$description} />
      <ListItem
        tx="demoCommunityScreen.joinSlackLink"
        bottomSeparator
        leftIcon="slack"
        rightIcon="caretRight"
        onPress={() => openLinkInBrowser("https://infiniteredcommunity.slack.com/")}
      />
      <Text
        preset="subheading"
        tx="demoCommunityScreen.makeIgniteEvenBetterTitle"
        style={$sectionTitle}
      />
      <Text tx="demoCommunityScreen.makeIgniteEvenBetter" style={$description} />
      <ListItem
        tx="demoCommunityScreen.contributeToIgniteLink"
        bottomSeparator
        leftIcon="github"
        rightIcon="caretRight"
        onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite")}
      />

      <Text
        preset="subheading"
        tx="demoCommunityScreen.theLatestInReactNativeTitle"
        style={$sectionTitle}
      />
      <Text tx="demoCommunityScreen.theLatestInReactNative" style={$description} />
      <ListItem
        tx="demoCommunityScreen.reactNativeRadioLink"
        bottomSeparator
        rightIcon="caretRight"
        LeftComponent={
          <View style={$logoContainer}>
            <Image source={reactNativeRadioLogo} style={$logo} />
          </View>
        }
        onPress={() => openLinkInBrowser("https://reactnativeradio.com/")}
      />
      <ListItem
        tx="demoCommunityScreen.reactNativeNewsletterLink"
        bottomSeparator
        rightIcon="caretRight"
        LeftComponent={
          <View style={$logoContainer}>
            <Image source={reactNativeNewsletterLogo} style={$logo} />
          </View>
        }
        onPress={() => openLinkInBrowser("https://reactnativenewsletter.com/")}
      />
      <ListItem
        tx="demoCommunityScreen.reactNativeLiveLink"
        bottomSeparator
        rightIcon="caretRight"
        LeftComponent={
          <View style={$logoContainer}>
            <Image source={reactNativeLiveLogo} style={$logo} />
          </View>
        }
        onPress={() => openLinkInBrowser("https://rn.live/")}
      />
      <ListItem
        tx="demoCommunityScreen.chainReactConferenceLink"
        bottomSeparator
        rightIcon="caretRight"
        LeftComponent={
          <View style={$logoContainer}>
            <Image source={chainReactLogo} style={$logo} />
          </View>
        }
        onPress={() => openLinkInBrowser("https://cr.infinite.red/")}
      />
      <Text preset="subheading" tx="demoCommunityScreen.hireUsTitle" style={$sectionTitle} />
      <Text tx="demoCommunityScreen.hireUs" style={$description} />
      <ListItem
        tx="demoCommunityScreen.hireUsLink"
        bottomSeparator
        leftIcon="clap"
        rightIcon="caretRight"
        onPress={() => openLinkInBrowser("https://infinite.red/contact")}
      />
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: 40,
  paddingBottom: 50,
  paddingHorizontal: 24,
}

const $title: TextStyle = {
  marginBottom: 10,
}

const $tagline: TextStyle = {
  marginBottom: 40,
}

const $description: TextStyle = {
  marginBottom: 24,
}

const $sectionTitle: TextStyle = {
  marginTop: 40,
}

const $logoContainer: ViewStyle = {
  marginRight: 16,
  flexDirection: "row",
  flexWrap: "wrap",
  alignContent: "center",
}

const $logo: ImageStyle = {
  height: 24,
  width: 24,
}
