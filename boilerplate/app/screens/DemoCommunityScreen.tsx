import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"

export function DemoCommunityScreen(props: DemoTabScreenProps<"DemoContributing">) {
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="demoCommunityScreen.title" style={$title} />
      <Text tx="demoCommunityScreen.tagLine" style={$tagline} />

      <Text preset="subheading" tx="demoCommunityScreen.joinUsOnSlackTitle" />
      <Text tx="demoCommunityScreen.joinUsOnSlack" style={$description} />

      <Text preset="subheading" tx="demoCommunityScreen.makeIgniteEvenBetterTitle" />
      <Text tx="demoCommunityScreen.makeIgniteEvenBetter" style={$description} />

      <Text preset="subheading" tx="demoCommunityScreen.theLatestInReactNativeTitle" />
      <Text tx="demoCommunityScreen.theLatestInReactNative" style={$description} />

      <Text preset="subheading" tx="demoCommunityScreen.hireUsTitle" />
      <Text tx="demoCommunityScreen.hireUs" style={$description} />
    </Screen>
  )
}

const $container: ViewStyle = {
  marginTop: 30,
  paddingHorizontal: 24,
}

const $title: TextStyle = {
  marginBottom: 10,
}

const $tagline: TextStyle = {
  marginBottom: 16,
}

const $description: TextStyle = {
  marginBottom: 24,
}
