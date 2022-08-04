import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { View } from "react-native"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { BulletItem } from "./bullet-item"

declare let module

const VIEWSTYLE = {
  //TODO: removed this since we're getting rid of storybook
}

storiesOf("Bullet Item", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Styling", () => (
    <Story>
      <UseCase noPad text="default" usage="The default usage">
        <BulletItem text="The default Bullet Item text" />
      </UseCase>
      <UseCase noPad text="with view wrapper">
        <View style={VIEWSTYLE}>
          <BulletItem text="The default Bullet Item text" />
        </View>
      </UseCase>
    </Story>
  ))
