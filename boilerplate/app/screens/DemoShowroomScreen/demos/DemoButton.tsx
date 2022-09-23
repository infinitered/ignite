/* eslint-disable react/jsx-key */
import React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Text } from "../../../components"
import { colors, typography } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"

const $iconStyle: ImageStyle = { width: 30, height: 30 }
const $customButtonStyle: ViewStyle = { backgroundColor: colors.error, height: 100 }
const $customButtonPressedStyle: ViewStyle = { backgroundColor: colors.error }
const $customButtonTextStyle: TextStyle = {
  color: colors.error,
  fontFamily: typography.primary.bold,
  textDecorationLine: "underline",
  textDecorationColor: colors.error,
}
const $customButtonPressedTextStyle: TextStyle = { color: colors.palette.neutral100 }
const $customButtonRightAccessoryStyle: ViewStyle = {
  width: "53%",
  height: "200%",
  backgroundColor: colors.error,
  position: "absolute",
  top: 0,
  right: 0,
}
const $customButtonPressedRightAccessoryStyle: ImageStyle = { tintColor: colors.palette.neutral100 }

export const DemoButton: Demo = {
  name: "Button",
  description:
    "A component that allows users to take actions and make choices. Wraps the Text component with a Pressable component.",
  data: [
    <DemoUseCase name="Presets" description="There are a few presets that are preconfigured.">
      <Button>Default - Laboris In Labore</Button>
      <DemoDivider />

      <Button preset="filled">Filled - Laboris Ex</Button>
      <DemoDivider />

      <Button preset="reversed">Reversed - Ad Ipsum</Button>
    </DemoUseCase>,

    <DemoUseCase
      name="Passing Content"
      description="There are a few different ways to pass content."
    >
      <Button text="Via `text` Prop - Billum In" />
      <DemoDivider />

      <Button tx="demoShowroomScreen.demoViaTxProp" />
      <DemoDivider />

      <Button>Children - Irure Reprehenderit</Button>
      <DemoDivider />

      <Button
        preset="filled"
        RightAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
      >
        RightAccessory - Duis Quis
      </Button>
      <DemoDivider />

      <Button
        preset="filled"
        LeftAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
      >
        LeftAccessory - Duis Proident
      </Button>
      <DemoDivider />

      <Button>
        <Text>
          <Text preset="bold">Nested children - proident veniam.</Text>
          {` `}
          <Text preset="default">
            Ullamco cupidatat officia exercitation velit non ullamco nisi..
          </Text>
          {` `}
          <Text preset="bold">Occaecat aliqua irure proident veniam.</Text>
        </Text>
      </Button>
      <DemoDivider />

      <Button
        preset="reversed"
        RightAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
        LeftAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
      >
        Multiline - consequat veniam veniam reprehenderit. Fugiat id nisi quis duis sunt proident
        mollit dolor mollit adipisicing proident deserunt.
      </Button>
    </DemoUseCase>,

    <DemoUseCase name="Styling" description="The component can be styled easily.">
      <Button style={$customButtonStyle}>Style Container - Exercitation</Button>
      <DemoDivider />

      <Button preset="filled" textStyle={$customButtonTextStyle}>
        Style Text - Ea Anim
      </Button>
      <DemoDivider />

      <Button
        preset="reversed"
        RightAccessory={() => <View style={$customButtonRightAccessoryStyle} />}
      >
        Style Accessories - enim ea id fugiat anim ad.
      </Button>
      <DemoDivider />

      <Button
        pressedStyle={$customButtonPressedStyle}
        pressedTextStyle={$customButtonPressedTextStyle}
        RightAccessory={(props) => (
          <Icon
            containerStyle={props.style}
            style={[
              $iconStyle,
              props.pressableState.pressed && $customButtonPressedRightAccessoryStyle,
            ]}
            icon="ladybug"
          />
        )}
      >
        Style Pressed State - fugiat anim
      </Button>
    </DemoUseCase>,
  ],
}

// @demo remove-file
