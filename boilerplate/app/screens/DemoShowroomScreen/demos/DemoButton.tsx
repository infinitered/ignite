/* eslint-disable react/jsx-key */
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { ThemedStyle } from "@/theme/types"

import { DemoDivider } from "../DemoDivider"
import { Demo } from "../DemoShowroomScreen"
import { DemoUseCase } from "../DemoUseCase"

const $iconStyle: ImageStyle = { width: 30, height: 30 }
const $customButtonStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.error,
  height: 100,
})
const $customButtonPressedStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.error,
})
const $customButtonTextStyle: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.error,
  fontFamily: typography.primary.bold,
  textDecorationLine: "underline",
  textDecorationColor: colors.error,
})
const $customButtonPressedTextStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})
const $customButtonRightAccessoryStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: "53%",
  height: "200%",
  backgroundColor: colors.error,
  position: "absolute",
  top: 0,
  right: 0,
})
const $customButtonPressedRightAccessoryStyle: ThemedStyle<ImageStyle> = ({ colors }) => ({
  tintColor: colors.palette.neutral100,
})

const $disabledOpacity: ViewStyle = { opacity: 0.5 }
const $disabledButtonTextStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  textDecorationColor: colors.palette.neutral100,
})

export const DemoButton: Demo = {
  name: "Button",
  description: "demoButton:description",
  data: ({ themed }) => [
    <DemoUseCase
      name="demoButton:useCase.presets.name"
      description="demoButton:useCase.presets.description"
    >
      <Button>Default - Laboris In Labore</Button>
      <DemoDivider />

      <Button preset="filled">Filled - Laboris Ex</Button>
      <DemoDivider />

      <Button preset="reversed">Reversed - Ad Ipsum</Button>
    </DemoUseCase>,

    <DemoUseCase
      name="demoButton:useCase.passingContent.name"
      description="demoButton:useCase.passingContent.description"
    >
      <Button text={translate("demoButton:useCase.passingContent.viaTextProps")} />
      <DemoDivider />

      <Button tx="demoShowroomScreen:demoViaTxProp" />
      <DemoDivider />

      <Button>{translate("demoButton:useCase.passingContent.children")}</Button>
      <DemoDivider />

      <Button
        preset="filled"
        RightAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
      >
        {translate("demoButton:useCase.passingContent.rightAccessory")}
      </Button>
      <DemoDivider />

      <Button
        preset="filled"
        LeftAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
      >
        {translate("demoButton:useCase.passingContent.leftAccessory")}
      </Button>
      <DemoDivider />

      <Button>
        <Text>
          <Text preset="bold">{translate("demoButton:useCase.passingContent.nestedChildren")}</Text>
          {` `}
          <Text preset="default">
            {translate("demoButton:useCase.passingContent.nestedChildren2")}
          </Text>
          {` `}
          <Text preset="bold">
            {translate("demoButton:useCase.passingContent.nestedChildren3")}
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
        {translate("demoButton:useCase.passingContent.multiLine")}
      </Button>
    </DemoUseCase>,

    <DemoUseCase
      name="demoButton:useCase.styling.name"
      description="demoButton:useCase.styling.description"
    >
      <Button style={themed($customButtonStyle)}>
        {translate("demoButton:useCase.styling.styleContainer")}
      </Button>
      <DemoDivider />

      <Button preset="filled" textStyle={themed($customButtonTextStyle)}>
        {translate("demoButton:useCase.styling.styleText")}
      </Button>
      <DemoDivider />

      <Button
        preset="reversed"
        RightAccessory={() => <View style={themed($customButtonRightAccessoryStyle)} />}
      >
        {translate("demoButton:useCase.styling.styleAccessories")}
      </Button>
      <DemoDivider />

      <Button
        pressedStyle={themed($customButtonPressedStyle)}
        pressedTextStyle={themed($customButtonPressedTextStyle)}
        RightAccessory={(props) => (
          <Icon
            containerStyle={props.style}
            style={[
              $iconStyle,
              props.pressableState.pressed && themed($customButtonPressedRightAccessoryStyle),
            ]}
            icon="ladybug"
          />
        )}
      >
        {translate("demoButton:useCase.styling.pressedState")}
      </Button>
    </DemoUseCase>,

    <DemoUseCase
      name="demoButton:useCase.disabling.name"
      description="demoButton:useCase.disabling.description"
    >
      <Button
        disabled
        disabledStyle={$disabledOpacity}
        pressedStyle={themed($customButtonPressedStyle)}
        pressedTextStyle={themed($customButtonPressedTextStyle)}
      >
        {translate("demoButton:useCase.disabling.standard")}
      </Button>
      <DemoDivider />

      <Button
        disabled
        preset="filled"
        disabledStyle={$disabledOpacity}
        pressedStyle={themed($customButtonPressedStyle)}
        pressedTextStyle={themed($customButtonPressedTextStyle)}
      >
        {translate("demoButton:useCase.disabling.filled")}
      </Button>
      <DemoDivider />

      <Button
        disabled
        preset="reversed"
        disabledStyle={$disabledOpacity}
        pressedStyle={themed($customButtonPressedStyle)}
        pressedTextStyle={themed($customButtonPressedTextStyle)}
      >
        {translate("demoButton:useCase.disabling.reversed")}
      </Button>
      <DemoDivider />

      <Button
        disabled
        pressedStyle={themed($customButtonPressedStyle)}
        pressedTextStyle={themed($customButtonPressedTextStyle)}
        RightAccessory={(props) => (
          <View
            style={
              props.disabled
                ? [$customButtonRightAccessoryStyle, $disabledOpacity]
                : themed($customButtonPressedRightAccessoryStyle)
            }
          />
        )}
      >
        {translate("demoButton:useCase.disabling.accessory")}
      </Button>
      <DemoDivider />

      <Button
        disabled
        preset="filled"
        disabledTextStyle={themed([$customButtonTextStyle, $disabledButtonTextStyle])}
        pressedStyle={themed($customButtonPressedStyle)}
        pressedTextStyle={themed($customButtonPressedTextStyle)}
      >
        {translate("demoButton:useCase.disabling.textStyle")}
      </Button>
    </DemoUseCase>,
  ],
}

// @demo remove-file
