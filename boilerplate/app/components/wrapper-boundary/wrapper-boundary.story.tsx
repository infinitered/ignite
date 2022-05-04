import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { WrapperBoundary } from "./wrapper-boundary"

storiesOf("WrapperBoundary", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <WrapperBoundary style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
