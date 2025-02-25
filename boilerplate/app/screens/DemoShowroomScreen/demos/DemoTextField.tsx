/* eslint-disable react/jsx-key */
import { TextStyle, ViewStyle } from "react-native"
import { Icon, TextField } from "../../../components"
import type { ThemedStyle } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import TranslateSheet from "translate-sheet"

const $customInputStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  backgroundColor: colors.error,
  color: colors.palette.neutral100,
})

const $customInputWrapperStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.error,
  borderColor: colors.palette.neutral800,
})

const $customContainerStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.error,
})

const $customLabelAndHelperStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})

const $customInputWithAbsoluteAccessoriesStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginHorizontal: spacing.xxl,
})

const $customLeftAccessoryStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.error,
  position: "absolute",
  left: 0,
})

const $customRightAccessoryStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.error,
  position: "absolute",
  right: 0,
})

const translations = TranslateSheet.create("demoTextField", {
  description: "TextField component allows for the entering and editing of text.",
  useCase: {
    statuses: {
      name: "Statuses",
      description:
        "There is a status prop - similar to `preset` in other components, but affects component functionality as well.",
      noStatus: {
        label: "No Status",
        helper: "This is the default status",
        placeholder: "Text goes here",
      },
      error: {
        label: "Error Status",
        helper: "Status to use when there is an error",
        placeholder: "Text goes here",
      },
      disabled: {
        label: "Disabled Status",
        helper: "Disables the editability and mutes text",
        placeholder: "Text goes here",
      },
    },
    passingContent: {
      name: "Passing Content",
      description: "There are a few different ways to pass content.",
      viaLabel: {
        labelTx: "Via `label` prop",
        helper: "Via `helper` prop",
        placeholder: "Via `placeholder` prop",
      },
      rightAccessory: {
        label: "RightAccessory",
        helper: "This prop takes a function that returns a React element.",
      },
      leftAccessory: {
        label: "LeftAccessory",
        helper: "This prop takes a function that returns a React element.",
      },
      supportsMultiline: {
        label: "Supports Multiline",
        helper: "Enables a taller input for multiline text.",
      },
    },
    styling: {
      name: "Styling",
      description: "The component can be styled easily.",
      styleInput: {
        label: "Style Input",
        helper: "Via `style` prop",
      },
      styleInputWrapper: {
        label: "Style Input Wrapper",
        helper: "Via `inputWrapperStyle` prop",
      },
      styleContainer: {
        label: "Style Container",
        helper: "Via `containerStyle` prop",
      },
      styleLabel: {
        label: "Style Label & Helper",
        helper: "Via `LabelTextProps` & `HelperTextProps` style prop",
      },
      styleAccessories: {
        label: "Style Accessories",
        helper: "Via `RightAccessory` & `LeftAccessory` style prop",
      },
    },
  },
  demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
})

export const DemoTextField: Demo = {
  name: "TextField",
  get description() {
    return translations.description;
  },
  data: ({ themed }) => [
    <DemoUseCase
      name={translations.useCase.statuses.name}
      description={translations.useCase.statuses.description}
    >
      <TextField
        value="Labore occaecat in id eu commodo aliquip occaecat veniam officia pariatur."
        label={translations.useCase.statuses.noStatus.label}
        helper={translations.useCase.statuses.noStatus.helper}
        placeholder={translations.useCase.statuses.noStatus.placeholder}
      />

      <DemoDivider size={24} />

      <TextField
        status="error"
        value="Est Lorem duis sunt sunt duis proident minim elit dolore incididunt pariatur eiusmod anim cillum."
        label={translations.useCase.statuses.error.label}
        helper={translations.useCase.statuses.error.helper}
        placeholder={translations.useCase.statuses.error.placeholder}
      />

      <DemoDivider size={24} />

      <TextField
        status="disabled"
        value="Eu ipsum mollit non minim voluptate nulla fugiat aliqua ullamco aute consectetur nulla nulla amet."
        label={translations.useCase.statuses.disabled.label}
        helper={translations.useCase.statuses.disabled.helper}
        placeholder={translations.useCase.statuses.disabled.placeholder}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.passingContent.name}
      description={translations.useCase.passingContent.description}
    >
      <TextField
        label={translations.useCase.passingContent.viaLabel.labelTx}
        helper={translations.useCase.passingContent.viaLabel.helper}
        placeholder={translations.useCase.passingContent.viaLabel.placeholder}
      />

      <DemoDivider size={24} />

      <TextField
        label={translations.demoViaSpecifiedTxProp({ prop: "label" })}
        helper={translations.demoViaSpecifiedTxProp({ prop: "helper" })}
        placeholder={translations.demoViaSpecifiedTxProp({ prop: "placeholder" })}
      />

      <DemoDivider size={24} />

      <TextField
        value="Reprehenderit Lorem magna non consequat ullamco cupidatat."
        label={translations.useCase.passingContent.rightAccessory.label}
        helper={translations.useCase.passingContent.rightAccessory.helper}
        RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} size={21} />}
      />

      <DemoDivider size={24} />

      <TextField
        label={translations.useCase.passingContent.leftAccessory.label}
        helper={translations.useCase.passingContent.leftAccessory.helper}
        value="Eiusmod exercitation mollit elit magna occaecat eiusmod Lorem minim veniam."
        LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} size={21} />}
      />

      <DemoDivider size={24} />

      <TextField
        label={translations.useCase.passingContent.supportsMultiline.label}
        helper={translations.useCase.passingContent.supportsMultiline.helper}
        value="Eiusmod exercitation mollit elit magna occaecat eiusmod Lorem minim veniam. Laborum Lorem velit velit minim irure ad in ut adipisicing consectetur."
        multiline
        RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} size={21} />}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.styling.name}
      description={translations.useCase.styling.description}
    >
      <TextField
        label={translations.useCase.styling.styleInput.label}
        helper={translations.useCase.styling.styleInput.helper}
        value="Laborum cupidatat aliquip sunt sunt voluptate sint sit proident sunt mollit exercitation ullamco ea elit."
        style={themed($customInputStyle)}
      />

      <DemoDivider size={24} />

      <TextField
        label={translations.useCase.styling.styleInputWrapper.label}
        helper={translations.useCase.styling.styleInputWrapper.helper}
        value="Aute velit esse dolore pariatur exercitation irure nulla do sunt in duis mollit duis et."
        inputWrapperStyle={themed($customInputWrapperStyle)}
        style={themed($customInputStyle)}
      />

      <DemoDivider size={24} />

      <TextField
        label={translations.useCase.styling.styleContainer.label}
        helper={translations.useCase.styling.styleContainer.helper}
        value="Aliquip proident commodo adipisicing non adipisicing Lorem excepteur ullamco voluptate laborum."
        style={themed($customInputStyle)}
        containerStyle={themed($customContainerStyle)}
        inputWrapperStyle={themed($customInputWrapperStyle)}
      />

      <DemoDivider size={24} />

      <TextField
        label={translations.useCase.styling.styleLabel.label}
        helper={translations.useCase.styling.styleLabel.helper}
        value="Ex culpa in consectetur dolor irure velit."
        style={themed($customInputStyle)}
        containerStyle={themed($customContainerStyle)}
        inputWrapperStyle={themed($customInputWrapperStyle)}
        HelperTextProps={{ style: themed($customLabelAndHelperStyle) }}
        LabelTextProps={{ style: themed($customLabelAndHelperStyle) }}
      />

      <DemoDivider size={24} />

      <TextField
        label={translations.useCase.styling.styleAccessories.label}
        helper={translations.useCase.styling.styleAccessories.helper}
        value="Aute nisi dolore fugiat anim mollit nulla ex minim ipsum ex elit."
        style={themed($customInputWithAbsoluteAccessoriesStyle)}
        LeftAccessory={() => (
          <Icon
            icon="ladybug"
            containerStyle={themed($customLeftAccessoryStyle)}
            color="white"
            size={41}
          />
        )}
        RightAccessory={() => (
          <Icon
            icon="ladybug"
            containerStyle={themed($customRightAccessoryStyle)}
            color="white"
            size={41}
          />
        )}
      />
    </DemoUseCase>,
  ],
}

// @demo remove-file
