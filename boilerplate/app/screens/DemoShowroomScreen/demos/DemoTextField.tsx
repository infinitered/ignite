/* eslint-disable react/jsx-key */
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Icon, TextField } from "../../../components"
import { colors, spacing } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"

const $customInputStyle: TextStyle = {
  backgroundColor: colors.error,
  color: colors.palette.neutral100,
}

const $customInputWrapperStyle: ViewStyle = {
  backgroundColor: colors.error,
  borderColor: colors.palette.neutral800,
}

const $customContainerStyle: ViewStyle = {
  backgroundColor: colors.error,
}

const $customLabelAndHelperStyle: TextStyle = {
  color: colors.palette.neutral100,
}

const $customInputWithAbsoluteAccessoriesStyle: ViewStyle = {
  marginHorizontal: spacing.huge,
}

const $customLeftAccessoryStyle: ViewStyle = {
  backgroundColor: colors.error,
  position: "absolute",
  left: 0,
}

const $customRightAccessoryStyle: ViewStyle = {
  backgroundColor: colors.error,
  position: "absolute",
  right: 0,
}

export const DemoTextField: Demo = {
  name: "TextField",
  description: "TextField component allows for the entering and editing of text.",
  data: [
    <DemoUseCase
      name="Statuses"
      description="There is a status prop - similar to `preset` in other components, but affects component functionality as well."
    >
      <TextField
        label="No Status"
        value="Labore occaecat in id eu commodo aliquip occaecat veniam officia pariatur."
        helper="This is the default status"
        placeholder="Text goes here"
      />

      <DemoDivider size={24} />

      <TextField
        status="error"
        value="Est Lorem duis sunt sunt duis proident minim elit dolore incididunt pariatur eiusmod anim cillum."
        label="Error Status"
        helper="Status to use when there is an error"
        placeholder="Text goes here"
      />

      <DemoDivider size={24} />

      <TextField
        status="disabled"
        value="Eu ipsum mollit non minim voluptate nulla fugiat aliqua ullamco aute consectetur nulla nulla amet."
        label="Disabled Status"
        helper="Disables the editability and mutes text"
        placeholder="Text goes here"
      />
    </DemoUseCase>,

    <DemoUseCase
      name="Passing Content"
      description="There are a few different ways to pass content."
    >
      <TextField
        label="Via `label` prop"
        helper="Via `helper` prop"
        placeholder="Via `placeholder` prop"
      />

      <DemoDivider size={24} />

      <TextField
        labelTx="demoShowroomScreen.demoViaSpecifiedTxProp"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoShowroomScreen.demoViaSpecifiedTxProp"
        helperTxOptions={{ prop: "helper" }}
        placeholderTx="demoShowroomScreen.demoViaSpecifiedTxProp"
        placeholderTxOptions={{ prop: "placeholder" }}
      />

      <DemoDivider size={24} />

      <TextField
        label="RightAccessory"
        helper="This props takes a function that returns a React element."
        value="Reprehenderit Lorem magna non consequat ullamco cupidatat."
        RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} size={21} />}
      />

      <DemoDivider size={24} />

      <TextField
        label="LeftAccessory"
        helper="This props takes a function that returns a React element."
        value="Eiusmod exercitation mollit elit magna occaecat eiusmod Lorem minim veniam."
        LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} size={21} />}
      />

      <DemoDivider size={24} />

      <TextField
        label="Supports Multiline"
        helper="Enables a taller input for multiline text."
        value="Eiusmod exercitation mollit elit magna occaecat eiusmod Lorem minim veniam. Laborum Lorem velit velit minim irure ad in ut adipisicing consectetur."
        multiline
        RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} size={21} />}
      />
    </DemoUseCase>,

    <DemoUseCase name="Styling" description="The component can be styled easily.">
      <TextField
        label="Style Input"
        helper="Via `style` prop"
        value="Laborum cupidatat aliquip sunt sunt voluptate sint sit proident sunt mollit exercitation ullamco ea elit."
        style={$customInputStyle}
      />

      <DemoDivider size={24} />

      <TextField
        label="Style Input Wrapper"
        helper="Via `inputWrapperStyle` prop"
        value="Aute velit esse dolore pariatur exercitation irure nulla do sunt in duis mollit duis et."
        inputWrapperStyle={$customInputWrapperStyle}
        style={$customInputStyle}
      />

      <DemoDivider size={24} />

      <TextField
        label="Style Container"
        helper="Via `containerStyle` prop"
        value="Aliquip proident commodo adipisicing non adipisicing Lorem excepteur ullamco voluptate laborum."
        style={$customInputStyle}
        containerStyle={$customContainerStyle}
        inputWrapperStyle={$customInputWrapperStyle}
      />

      <DemoDivider size={24} />

      <TextField
        label="Style Label & Helper"
        helper="Via `LabelTextProps` & `HelperTextProps` style prop"
        value="Ex culpa in consectetur dolor irure velit."
        style={$customInputStyle}
        containerStyle={$customContainerStyle}
        inputWrapperStyle={$customInputWrapperStyle}
        HelperTextProps={{ style: $customLabelAndHelperStyle }}
        LabelTextProps={{ style: $customLabelAndHelperStyle }}
      />

      <DemoDivider size={24} />

      <TextField
        label="Style Accessories"
        helper="Via `RightAccessory` & `LeftAccessory` style prop"
        value="Aute nisi dolore fugiat anim mollit nulla ex minim ipsum ex elit."
        style={$customInputWithAbsoluteAccessoriesStyle}
        LeftAccessory={() => (
          <Icon icon="ladybug" containerStyle={$customLeftAccessoryStyle} color="white" size={41} />
        )}
        RightAccessory={() => (
          <Icon
            icon="ladybug"
            containerStyle={$customRightAccessoryStyle}
            color="white"
            size={41}
          />
        )}
      />
    </DemoUseCase>,
  ],
}

// @demo remove-file
