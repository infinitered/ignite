/* eslint-disable react/jsx-key */
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { ThemedStyle } from "@/theme/types"

import { DemoDivider } from "../DemoDivider"
import { Demo } from "../types"
import { DemoUseCase } from "../DemoUseCase"

const $iconStyle: ImageStyle = { width: 30, height: 30 }
const $customButtonStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.error,
  height: 100,
})

export const DemoButton: Demo = {
  name: "Button",
  description: "demoButton:description",
  data: ({ themed }) => [
    <DemoUseCase
      name="demoButton:useCase.presets.name"
      description="demoButton:useCase.presets.description"
    >
      <Button>Default - Press Me</Button>
      <DemoDivider />

      <Button preset="filled">Filled Button</Button>
      <DemoDivider />

      <Button preset="reversed">Reversed Button</Button>
    </DemoUseCase>,

    <DemoUseCase
      name="demoButton:useCase.passingContent.name"
      description="demoButton:useCase.passingContent.description"
    >
      <Button text="Via Text Prop" />
      <DemoDivider />

      <Button>Via Children</Button>
      <DemoDivider />

      <Button
        preset="filled"
        RightAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
      >
        Right Accessory
      </Button>
      <DemoDivider />

      <Button
        preset="filled"
        LeftAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
      >
        Left Accessory
      </Button>
    </DemoUseCase>,

    <DemoUseCase
      name="demoButton:useCase.styling.name"
      description="demoButton:useCase.styling.description"
    >
      <Button style={themed($customButtonStyle)}>
        Custom Styling
      </Button>
      <DemoDivider />

      <Button disabled>
        Disabled Button
      </Button>
    </DemoUseCase>,
  ],
}
