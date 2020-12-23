/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */

import * as React from "react"
import { View, ViewStyle } from "react-native"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { Text } from "./text"

declare let module

const VIEWSTYLE = {
  flex: 1,
  backgroundColor: color.storybookDarkBg,
}
const viewStyleArray: ViewStyle[] = [VIEWSTYLE, { backgroundColor: "#7fff00" }]

storiesOf("Text", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="default" usage="Used for normal body text.">
        <View style={VIEWSTYLE}>
          <Text>Hello!</Text>
          <Text style={{ paddingTop: 10 }}>
            Check out{"\n"}
            my{"\n"}
            line height
          </Text>
          <Text style={{ paddingTop: 10 }}>The quick brown fox jumped over the slow lazy dog.</Text>
          <Text>$123,456,789.00</Text>
        </View>
      </UseCase>
      <UseCase text="bold" usage="Used for bolded body text.">
        <View style={VIEWSTYLE}>
          <Text preset="bold">Osnap! I'm puffy.</Text>
        </View>
      </UseCase>
      <UseCase text="header" usage="Used for major section headers.">
        <View style={VIEWSTYLE}>
          <Text preset="header">Behold!</Text>
        </View>
      </UseCase>
    </Story>
  ))
  .add("Passing Content", () => (
    <Story>
      <UseCase
        text="text"
        usage="Used when you want to pass a value but don't want to open a child."
      >
        <View style={VIEWSTYLE}>
          <Text text="Heyo!" />
        </View>
      </UseCase>
      <UseCase text="tx" usage="Used for looking up i18n keys.">
        <View style={VIEWSTYLE}>
          <Text tx="common.ok" />
          <Text tx="common.cancel" />
        </View>
      </UseCase>
      <UseCase
        text="children"
        usage="Used like you would normally use a React Native <Text> component."
      >
        <View style={VIEWSTYLE}>
          <Text>Passing strings as children.</Text>
        </View>
      </UseCase>
      <UseCase text="nested children" usage="You can embed them and change styles too.">
        <View style={VIEWSTYLE}>
          <Text>
            {" "}
            Hello <Text preset="bold">bolded</Text> World.
          </Text>
        </View>
      </UseCase>
    </Story>
  ))
  .add("Styling", () => (
    <Story>
      <UseCase text="Style array" usage="Text with style array">
        <View style={viewStyleArray}>
          <Text>
            {" "}
            Hello <Text preset="bold">bolded</Text> World.
          </Text>
        </View>
      </UseCase>
    </Story>
  ))
