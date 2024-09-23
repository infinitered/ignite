/* eslint-disable react/jsx-key */
import React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Text } from "../../../components"
import { colors, typography } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import { translate } from "app/i18n"

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

const $disabledOpacity: ViewStyle = { opacity: 0.5 }
const $disabledButtonTextStyle: TextStyle = {
  color: colors.palette.neutral100,
  textDecorationColor: colors.palette.neutral100,
}

export const DemoButton: Demo = {
  name: "Button",
  description: "demoButton.description",
  data: [
    <DemoUseCase
      name="demoButton.useCase.presets.name"
      description="demoButton.useCase.presets.description"
    >
      <Button>Default - Laboris In Labore</Button>
      <DemoDivider />

      <Button preset="filled">Filled - Laboris Ex</Button>
      <DemoDivider />

      <Button preset="reversed">Reversed - Ad Ipsum</Button>
    </DemoUseCase>,

    <DemoUseCase
      name="demoButton.useCase.passingContent.name"
      description="demoButton.useCase.passingContent.description"
    >
      <Button text={translate("demoButton.useCase.passingContent.viaTextProps")} />
      <DemoDivider />

      <Button tx="demoShowroomScreen.demoViaTxProp" />
      <DemoDivider />

      <Button>{translate("demoButton.useCase.passingContent.children")}</Button>
      <DemoDivider />

      <Button
        preset="filled"
        RightAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
      >
        {translate("demoButton.useCase.passingContent.rightAccessory")}
      </Button>
      <DemoDivider />

      <Button
        preset="filled"
        LeftAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
      >
        {translate("demoButton.useCase.passingContent.leftAccessory")}
      </Button>
      <DemoDivider />

      <Button>
        <Text>
          <Text preset="bold">{translate("demoButton.useCase.passingContent.nestedChildren")}</Text>
          {` `}
          <Text preset="default">
            {translate("demoButton.useCase.passingContent.nestedChildren2")}
          </Text>
          {` `}
          <Text preset="bold">
            {translate("demoButton.useCase.passingContent.nestedChildren3")}
          </Text>
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
        {translate("demoButton.useCase.passingContent.multiLine")}
      </Button>
    </DemoUseCase>,

    <DemoUseCase
      name="demoButton.useCase.styling.name"
      description="demoButton.useCase.styling.description"
    >
      <Button style={$customButtonStyle}>
        {translate("demoButton.useCase.styling.styleContainer")}
      </Button>
      <DemoDivider />

      <Button preset="filled" textStyle={$customButtonTextStyle}>
        {translate("demoButton.useCase.styling.styleText")}
      </Button>
      <DemoDivider />

      <Button
        preset="reversed"
        RightAccessory={() => <View style={$customButtonRightAccessoryStyle} />}
      >
        {translate("demoButton.useCase.styling.styleAccessories")}
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
        {translate("demoButton.useCase.styling.pressedState")}
      </Button>
    </DemoUseCase>,

    <DemoUseCase
      name="demoButton.useCase.disabling.name"
      description="demoButton.useCase.disabling.description"
    >
      <Button
        disabled
        disabledStyle={$disabledOpacity}
        pressedStyle={$customButtonPressedStyle}
        pressedTextStyle={$customButtonPressedTextStyle}
      >
        {translate("demoButton.useCase.disabling.standard")}
      </Button>
      <DemoDivider />

      <Button
        disabled
        preset="filled"
        disabledStyle={$disabledOpacity}
        pressedStyle={$customButtonPressedStyle}
        pressedTextStyle={$customButtonPressedTextStyle}
      >
        {translate("demoButton.useCase.disabling.filled")}
      </Button>
      <DemoDivider />

      <Button
        disabled
        preset="reversed"
        disabledStyle={$disabledOpacity}
        pressedStyle={$customButtonPressedStyle}
        pressedTextStyle={$customButtonPressedTextStyle}
      >
        {translate("demoButton.useCase.disabling.reversed")}
      </Button>
      <DemoDivider />

      <Button
        disabled
        pressedStyle={$customButtonPressedStyle}
        pressedTextStyle={$customButtonPressedTextStyle}
        RightAccessory={(props) => (
          <View
            style={
              props.disabled
                ? [$customButtonRightAccessoryStyle, $disabledOpacity]
                : $customButtonPressedRightAccessoryStyle
            }
          />
        )}
      >
        {translate("demoButton.useCase.disabling.accessory")}
      </Button>
      <DemoDivider />

      <Button
        disabled
        preset="filled"
        disabledTextStyle={[$customButtonTextStyle, $disabledButtonTextStyle]}
        pressedStyle={$customButtonPressedStyle}
        pressedTextStyle={$customButtonPressedTextStyle}
      >
        {translate("demoButton.useCase.disabling.textStyle")}
      </Button>
    </DemoUseCase>,
  ],
}

// @demo remove-file
