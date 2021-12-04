import * as React from "react"
import { View, Alert } from "react-native"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { Header } from "./header"
import { color } from "../../theme"

declare let module

const VIEWSTYLE = {
  flex: 1,
  backgroundColor: color.storybookDarkBg,
}

storiesOf("Header", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Behavior", () => (
    <Story>
      <UseCase noPad text="default" usage="The default usage">
        <View style={VIEWSTYLE}>
          <Header headerTx="demoScreen.howTo" />
        </View>
      </UseCase>
      <UseCase noPad text="leftIcon" usage="A left nav icon">
        <View style={VIEWSTYLE}>
          <Header
            headerTx="demoScreen.howTo"
            leftIcon="back"
            onLeftPress={() => Alert.alert("left nav")}
          />
        </View>
      </UseCase>
      <UseCase noPad text="rightIcon" usage="A right nav icon">
        <View style={VIEWSTYLE}>
          <Header
            headerTx="demoScreen.howTo"
            rightIcon="bullet"
            onRightPress={() => Alert.alert("right nav")}
          />
        </View>
      </UseCase>
    </Story>
  ))
