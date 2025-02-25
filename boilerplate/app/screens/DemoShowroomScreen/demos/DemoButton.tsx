/* eslint-disable react/jsx-key */
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Text } from "../../../components"
import type { ThemedStyle } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import TranslateSheet from "translate-sheet"

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

const translations = TranslateSheet.create("demoButton", {
  description:
    "A component that allows users to take actions and make choices. Wraps the Text component with a Pressable component.",
  useCase: {
    presets: {
      name: "Presets",
      description: "There are a few presets that are preconfigured.",
    },
    passingContent: {
      name: "Passing Content",
      description: "There are a few different ways to pass content.",
      viaTextProps: "Via `text` Prop - Billum In",
      children: "Children - Irure Reprehenderit",
      rightAccessory: "RightAccessory - Duis Quis",
      leftAccessory: "LeftAccessory - Duis Proident",
      nestedChildren: "Nested children - proident veniam.",
      nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
      nestedChildren3: "Occaecat aliqua irure proident veniam.",
      multiLine:
        "Multiline - consequat veniam veniam reprehenderit. Fugiat id nisi quis duis sunt proident mollit dolor mollit adipisicing proident deserunt.",
    },
    styling: {
      name: "Styling",
      description: "The component can be styled easily.",
      styleContainer: "Style Container - Exercitation",
      styleText: "Style Text - Ea Anim",
      styleAccessories: "Style Accessories - enim ea id fugiat anim ad.",
      pressedState: "Style Pressed State - fugiat anim",
    },
    disabling: {
      name: "Disabling",
      description:
        "The component can be disabled, and styled based on that. Press behavior will be disabled.",
      standard: "Disabled - standard",
      filled: "Disabled - filled",
      reversed: "Disabled - reversed",
      accessory: "Disabled accessory style",
      textStyle: "Disabled text style",
    },
  },
  demoViaTxProp: "Via `tx` Prop",
})

export const DemoButton: Demo = {
  name: "Button",
  get description() {
    return translations.description;
  },
  data: ({ themed }) => [
    <DemoUseCase
      name={translations.useCase.presets.name}
      description={translations.useCase.presets.description}
    >
      <Button>Default - Laboris In Labore</Button>
      <DemoDivider />

      <Button preset="filled">Filled - Laboris Ex</Button>
      <DemoDivider />

      <Button preset="reversed">Reversed - Ad Ipsum</Button>
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.passingContent.name}
      description={translations.useCase.passingContent.description}
    >
      <Button text={translations.useCase.passingContent.viaTextProps} />
      <DemoDivider />

      <Button text={translations.demoViaTxProp} />
      <DemoDivider />

      <Button>{translations.useCase.passingContent.children}</Button>
      <DemoDivider />

      <Button
        preset="filled"
        RightAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
        text={translations.useCase.passingContent.rightAccessory}
      />
      <DemoDivider />

      <Button
        preset="filled"
        LeftAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="ladybug" />
        )}
        text={translations.useCase.passingContent.leftAccessory}
      />
      <DemoDivider />

      <Button>
        <Text>
          <Text text={translations.useCase.passingContent.nestedChildren} preset="bold" />
          {` `}
          <Text text={translations.useCase.passingContent.nestedChildren2} preset="default" />
          {` `}
          <Text text={translations.useCase.passingContent.nestedChildren3} preset="bold" />
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
        text={translations.useCase.passingContent.multiLine}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.styling.name}
      description={translations.useCase.styling.description}
    >
      <Button
        text={translations.useCase.styling.styleContainer}
        style={themed($customButtonStyle)}
      />
      <DemoDivider />

      <Button
        preset="filled"
        text={translations.useCase.styling.styleText}
        textStyle={themed($customButtonTextStyle)}
      />
      <DemoDivider />
      <Button
        preset="reversed"
        RightAccessory={() => <View style={themed($customButtonRightAccessoryStyle)} />}
        text={translations.useCase.styling.styleAccessories}
      />
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
        text={translations.useCase.styling.pressedState}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.disabling.name}
      description={translations.useCase.disabling.description}
    >
      <Button
        disabled
        disabledStyle={$disabledOpacity}
        pressedStyle={themed($customButtonPressedStyle)}
        pressedTextStyle={themed($customButtonPressedTextStyle)}
        text={translations.useCase.disabling.standard}
      />
      <DemoDivider />

      <Button
        disabled
        preset="filled"
        disabledStyle={$disabledOpacity}
        pressedStyle={themed($customButtonPressedStyle)}
        pressedTextStyle={themed($customButtonPressedTextStyle)}
        text={translations.useCase.disabling.filled}
      />
      <DemoDivider />

      <Button
        disabled
        preset="reversed"
        disabledStyle={$disabledOpacity}
        pressedStyle={themed($customButtonPressedStyle)}
        pressedTextStyle={themed($customButtonPressedTextStyle)}
        text={translations.useCase.disabling.reversed}
      />
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
        text={translations.useCase.disabling.accessory}
      />
      <DemoDivider />

      <Button
        disabled
        preset="filled"
        disabledTextStyle={themed([$customButtonTextStyle, $disabledButtonTextStyle])}
        pressedStyle={themed($customButtonPressedStyle)}
        pressedTextStyle={themed($customButtonPressedTextStyle)}
        text={translations.useCase.disabling.textStyle}
      />
    </DemoUseCase>,
  ],
}

// @demo remove-file
