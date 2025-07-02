/* eslint-disable react/jsx-key */
import { TextStyle, ViewStyle } from "react-native"

import { Icon } from "@/components/Icon"
import { TextField } from "@/components/TextField"
import type { ThemedStyle } from "@/theme/types"

import { DemoDivider } from "../DemoDivider"
import { Demo } from "../DemoShowroomScreen"
import { DemoUseCase } from "../DemoUseCase"

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

export const DemoTextField: Demo = {
  name: "TextField",
  description: "demoTextField:description",
  data: ({ themed }) => [
    <DemoUseCase
      name="demoTextField:useCase.statuses.name"
      description="demoTextField:useCase.statuses.description"
    >
      <TextField
        value="Labore occaecat in id eu commodo aliquip occaecat veniam officia pariatur."
        labelTx="demoTextField:useCase.statuses.noStatus.label"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoTextField:useCase.statuses.noStatus.helper"
        helperTxOptions={{ prop: "helper" }}
        placeholderTx="demoTextField:useCase.statuses.noStatus.placeholder"
        placeholderTxOptions={{ prop: "placeholder" }}
      />

      <DemoDivider size={24} />

      <TextField
        status="error"
        value="Est Lorem duis sunt sunt duis proident minim elit dolore incididunt pariatur eiusmod anim cillum."
        labelTx="demoTextField:useCase.statuses.error.label"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoTextField:useCase.statuses.error.helper"
        helperTxOptions={{ prop: "helper" }}
        placeholderTx="demoTextField:useCase.statuses.error.placeholder"
        placeholderTxOptions={{ prop: "placeholder" }}
      />

      <DemoDivider size={24} />

      <TextField
        status="disabled"
        value="Eu ipsum mollit non minim voluptate nulla fugiat aliqua ullamco aute consectetur nulla nulla amet."
        labelTx="demoTextField:useCase.statuses.disabled.label"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoTextField:useCase.statuses.disabled.helper"
        helperTxOptions={{ prop: "helper" }}
        placeholderTx="demoTextField:useCase.statuses.disabled.placeholder"
        placeholderTxOptions={{ prop: "placeholder" }}
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoTextField:useCase.passingContent.name"
      description="demoTextField:useCase.passingContent.description"
    >
      <TextField
        labelTx="demoTextField:useCase.passingContent.viaLabel.labelTx"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoTextField:useCase.passingContent.viaLabel.helper"
        helperTxOptions={{ prop: "helper" }}
        placeholderTx="demoTextField:useCase.passingContent.viaLabel.placeholder"
        placeholderTxOptions={{ prop: "placeholder" }}
      />

      <DemoDivider size={24} />

      <TextField
        labelTx="demoShowroomScreen:demoViaSpecifiedTxProp"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoShowroomScreen:demoViaSpecifiedTxProp"
        helperTxOptions={{ prop: "helper" }}
        placeholderTx="demoShowroomScreen:demoViaSpecifiedTxProp"
        placeholderTxOptions={{ prop: "placeholder" }}
      />

      <DemoDivider size={24} />

      <TextField
        value="Reprehenderit Lorem magna non consequat ullamco cupidatat."
        labelTx="demoTextField:useCase.passingContent.rightAccessory.label"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoTextField:useCase.passingContent.rightAccessory.helper"
        helperTxOptions={{ prop: "helper" }}
        RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} size={21} />}
      />

      <DemoDivider size={24} />

      <TextField
        labelTx="demoTextField:useCase.passingContent.leftAccessory.label"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoTextField:useCase.passingContent.leftAccessory.helper"
        helperTxOptions={{ prop: "helper" }}
        value="Eiusmod exercitation mollit elit magna occaecat eiusmod Lorem minim veniam."
        LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} size={21} />}
      />

      <DemoDivider size={24} />

      <TextField
        labelTx="demoTextField:useCase.passingContent.supportsMultiline.label"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoTextField:useCase.passingContent.supportsMultiline.helper"
        helperTxOptions={{ prop: "helper" }}
        value="Eiusmod exercitation mollit elit magna occaecat eiusmod Lorem minim veniam. Laborum Lorem velit velit minim irure ad in ut adipisicing consectetur."
        multiline
        RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} size={21} />}
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoTextField:useCase.styling.name"
      description="demoTextField:useCase.styling.description"
    >
      <TextField
        labelTx="demoTextField:useCase.styling.styleInput.label"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoTextField:useCase.styling.styleInput.helper"
        helperTxOptions={{ prop: "helper" }}
        value="Laborum cupidatat aliquip sunt sunt voluptate sint sit proident sunt mollit exercitation ullamco ea elit."
        style={themed($customInputStyle)}
      />

      <DemoDivider size={24} />

      <TextField
        labelTx="demoTextField:useCase.styling.styleInputWrapper.label"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoTextField:useCase.styling.styleInputWrapper.helper"
        helperTxOptions={{ prop: "helper" }}
        value="Aute velit esse dolore pariatur exercitation irure nulla do sunt in duis mollit duis et."
        inputWrapperStyle={themed($customInputWrapperStyle)}
        style={themed($customInputStyle)}
      />

      <DemoDivider size={24} />

      <TextField
        labelTx="demoTextField:useCase.styling.styleContainer.label"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoTextField:useCase.styling.styleContainer.helper"
        helperTxOptions={{ prop: "helper" }}
        value="Aliquip proident commodo adipisicing non adipisicing Lorem excepteur ullamco voluptate laborum."
        style={themed($customInputStyle)}
        containerStyle={themed($customContainerStyle)}
        inputWrapperStyle={themed($customInputWrapperStyle)}
      />

      <DemoDivider size={24} />

      <TextField
        labelTx="demoTextField:useCase.styling.styleLabel.label"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoTextField:useCase.styling.styleLabel.helper"
        helperTxOptions={{ prop: "helper" }}
        value="Ex culpa in consectetur dolor irure velit."
        style={themed($customInputStyle)}
        containerStyle={themed($customContainerStyle)}
        inputWrapperStyle={themed($customInputWrapperStyle)}
        HelperTextProps={{ style: themed($customLabelAndHelperStyle) }}
        LabelTextProps={{ style: themed($customLabelAndHelperStyle) }}
      />

      <DemoDivider size={24} />

      <TextField
        labelTx="demoTextField:useCase.styling.styleAccessories.label"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoTextField:useCase.styling.styleAccessories.helper"
        helperTxOptions={{ prop: "helper" }}
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
