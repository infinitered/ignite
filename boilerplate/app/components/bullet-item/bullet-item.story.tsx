import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { View } from "react-native"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { BulletItem } from "./bullet-item"

declare let module

const VIEWSTYLE = {
  flex: 1,
  backgroundColor: color.storybookDarkBg,
  borderWidth: 5,
}

storiesOf("Bullet Item", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Styling", () => (
    <Story>
      <UseCase noPad text="default" usage="The default usage">
        <BulletItem text="The default Bullet Item text" />
      </UseCase>
      <UseCase
        noPad
        text="with view wrapper"
        usage={`backgroundColor: ${color.storybookDarkBg} (color.storybookDarkBg)`}
      >
        <View style={VIEWSTYLE}>
          <BulletItem text="The default Bullet Item text" />
        </View>
      </UseCase>
    </Story>
  ))
