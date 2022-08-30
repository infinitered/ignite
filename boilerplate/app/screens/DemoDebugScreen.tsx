import React from "react"
import * as Application from "expo-application"
import { Linking, Platform, TextStyle, View, ViewStyle } from "react-native"
import { Button, ListItem, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors } from "../theme"
import {isRTL} from "../i18n"

function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

export function DemoDebugScreen(_props: DemoTabScreenProps<"DemoDebug">) {
  const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

  const demoReactotron = React.useMemo(
    () => async () => {
      console.tron.display({
        name: "DISPLAY",
        value: {
          appId: Application.applicationId,
          appName: Application.applicationName,
          appVersion: Application.nativeApplicationVersion,
          appBuildVersion: Application.nativeBuildVersion,
          hermesEnabled: usingHermes,
        },
        important: true,
      })
    },
    [],
  )

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text style={$title} preset="heading" tx="demoDebugScreen.title" />
      <View style={$itemsContainer}>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Id</Text>
              <Text>{Application.applicationId}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Name</Text>
              <Text>{Application.applicationName}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Version</Text>
              <Text>{Application.nativeApplicationVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Build Version</Text>
              <Text>{Application.nativeBuildVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Hermes Enabled</Text>
              <Text>{String(usingHermes)}</Text>
            </View>
          }
        />
      </View>
      <View style={$buttonContainer}>
        <Button style={$button} tx="demoDebugScreen.reactotron" onPress={demoReactotron} />
        <Text style={$hint} tx={`demoDebugScreen.${Platform.OS}ReactotronHint` as const} />
      </View>
      <ListItem
        tx="demoDebugScreen.reportBugs"
        leftIcon="ladybug"
        rightIcon={isRTL ? "caretLeft" : "caretRight"}
        onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite/issues")}
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
  marginBottom: 36,
}

const $item: ViewStyle = {
  marginBottom: 16,
}

const $itemsContainer: ViewStyle = {
  marginBottom: 36,
}

const $button: ViewStyle = {
  marginBottom: 6,
}

const $buttonContainer: ViewStyle = {
  marginBottom: 16,
}

const $hint: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: 24,
}
