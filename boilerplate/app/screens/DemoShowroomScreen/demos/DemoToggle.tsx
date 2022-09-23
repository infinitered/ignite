/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text, Toggle, ToggleProps } from "../../../components"
import { colors, spacing } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"

function ControlledToggle(props: ToggleProps) {
  const [value, setValue] = React.useState(props.value || false)
  return <Toggle {...props} value={value} onPress={() => setValue(!value)} />
}

const $centeredOneThirdCol: ViewStyle = {
  width: "33.33333%",
  alignItems: "center",
  justifyContent: "center",
}
const $centeredText: TextStyle = {
  textAlign: "center",
  width: "100%",
  marginTop: spacing.extraSmall,
}

export const DemoToggle: Demo = {
  name: "Toggle",
  description:
    "Renders a boolean input. This is a controlled component that requires an onValueChange callback that updates the value prop in order for the component to reflect user actions. If the value prop is not updated, the component will continue to render the supplied value prop instead of the expected result of any user actions.",
  data: [
    <DemoUseCase
      name="Variants"
      description="The component supports a few different variants. If heavy customization of a specific variant is needed, it can be easily refactored. The default is `checkbox`."
    >
      <ControlledToggle
        variant="checkbox"
        label="`checkbox` variant"
        helper="This can be used for a single on/off input."
      />
      <DemoDivider size={24} />
      <ControlledToggle
        variant="radio"
        label="`radio` variant"
        helper="Use this when you have multiple options."
      />
      <DemoDivider size={24} />
      <ControlledToggle
        variant="switch"
        label="`switch` variant"
        helper="A more prominent on/off input. Has better accessibility support."
      />
    </DemoUseCase>,

    <DemoUseCase
      name="Statuses"
      description="There is a status prop - similar to `preset` in other components, but affects component functionality as well."
      layout="row"
    >
      <ControlledToggle variant="checkbox" containerStyle={$centeredOneThirdCol} />
      <ControlledToggle variant="radio" containerStyle={$centeredOneThirdCol} />
      <ControlledToggle variant="switch" containerStyle={$centeredOneThirdCol} />
      <DemoDivider style={{ width: "100%" }} />
      <ControlledToggle variant="checkbox" value containerStyle={$centeredOneThirdCol} />
      <ControlledToggle variant="radio" value containerStyle={$centeredOneThirdCol} />
      <ControlledToggle variant="switch" value containerStyle={$centeredOneThirdCol} />
      <Text preset="formHelper" style={$centeredText}>
        No status - this is the default
      </Text>

      <DemoDivider size={24} style={{ width: "100%" }} />

      <ControlledToggle variant="checkbox" status="error" containerStyle={$centeredOneThirdCol} />
      <ControlledToggle variant="radio" status="error" containerStyle={$centeredOneThirdCol} />
      <ControlledToggle variant="switch" status="error" containerStyle={$centeredOneThirdCol} />
      <DemoDivider style={{ width: "100%" }} />
      <ControlledToggle
        variant="checkbox"
        value
        status="error"
        containerStyle={$centeredOneThirdCol}
      />
      <ControlledToggle
        variant="radio"
        value
        status="error"
        containerStyle={$centeredOneThirdCol}
      />
      <ControlledToggle
        variant="switch"
        value
        status="error"
        containerStyle={$centeredOneThirdCol}
      />
      <Text preset="formHelper" style={$centeredText}>
        Error status - use when there is an error
      </Text>

      <DemoDivider size={24} style={{ width: "100%" }} />

      <ControlledToggle
        variant="checkbox"
        status="disabled"
        containerStyle={$centeredOneThirdCol}
      />
      <ControlledToggle variant="radio" status="disabled" containerStyle={$centeredOneThirdCol} />
      <ControlledToggle variant="switch" status="disabled" containerStyle={$centeredOneThirdCol} />
      <DemoDivider style={{ width: "100%" }} />
      <ControlledToggle
        variant="checkbox"
        value
        status="disabled"
        containerStyle={$centeredOneThirdCol}
      />
      <ControlledToggle
        variant="radio"
        value
        status="disabled"
        containerStyle={$centeredOneThirdCol}
      />
      <ControlledToggle
        variant="switch"
        value
        status="disabled"
        containerStyle={$centeredOneThirdCol}
      />
      <Text preset="formHelper" style={$centeredText}>
        Disabled status - disables the editability and mutes input
      </Text>
    </DemoUseCase>,

    <DemoUseCase
      name="Passing Content"
      description="There are a few different ways to pass content."
    >
      <ControlledToggle
        variant="checkbox"
        value
        label="Via `label` prop"
        helper="Via `helper` prop."
      />
      <DemoDivider size={24} />
      <ControlledToggle
        variant="radio"
        value
        labelTx="demoShowroomScreen.demoViaSpecifiedTxProp"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoShowroomScreen.demoViaSpecifiedTxProp"
        helperTxOptions={{ prop: "helper" }}
      />
      <DemoDivider size={24} />
      <ControlledToggle
        variant="checkbox"
        value
        label="Supports multiline - Nulla proident consectetur labore sunt ea labore. "
        editable={false}
      />
      <DemoDivider size={24} />
      <ControlledToggle
        variant="radio"
        value
        label="You can change sides - Laborum labore adipisicing in eu ipsum deserunt."
        labelPosition="left"
      />
      <DemoDivider size={24} />
      <ControlledToggle
        value
        variant="switch"
        switchAccessibilityMode="text"
        label="Switches can be read as text"
        status="error"
        helper="By default, this option doesn't use `Text` since depending on the font, the on/off characters might look weird. Customize as needed."
      />
      <DemoDivider size={24} />
      <ControlledToggle
        value
        variant="switch"
        labelPosition="left"
        switchAccessibilityMode="icon"
        label="Or aided with an icon"
      />
    </DemoUseCase>,

    <DemoUseCase name="Styling" description="The component can be styled easily." layout="row">
      <ControlledToggle
        variant="checkbox"
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 50,
          height: 50,
          backgroundColor: colors.palette.accent300,
          borderColor: colors.palette.accent500,
        }}
      />
      <ControlledToggle
        variant="radio"
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: colors.palette.accent300,
          borderColor: colors.palette.accent500,
        }}
      />
      <ControlledToggle
        variant="switch"
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 70,
          height: 50,
          borderRadius: 25,
          backgroundColor: colors.palette.accent300,
          borderColor: colors.palette.accent500,
        }}
      />
      <Text preset="formHelper" style={$centeredText}>
        1 - style the input outer wrapper
      </Text>

      <DemoDivider style={{ width: "100%" }} />

      <ControlledToggle
        value
        variant="checkbox"
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 50,
          height: 50,
          backgroundColor: colors.palette.accent300,
          borderColor: colors.palette.accent500,
        }}
        inputInnerStyle={{
          backgroundColor: colors.palette.accent500,
        }}
      />
      <ControlledToggle
        value
        variant="radio"
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: colors.palette.accent300,
          borderColor: colors.palette.accent500,
        }}
        inputInnerStyle={{
          backgroundColor: colors.palette.accent500,
        }}
      />
      <ControlledToggle
        value
        variant="switch"
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 70,
          height: 50,
          borderRadius: 25,
          backgroundColor: colors.palette.accent300,
          borderColor: colors.palette.accent500,
        }}
        inputInnerStyle={{
          backgroundColor: colors.palette.accent500,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      />
      <Text preset="formHelper" style={$centeredText}>
        2 - style the input inner wrapper
      </Text>

      <DemoDivider style={{ width: "100%" }} />

      <ControlledToggle
        value
        variant="checkbox"
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 50,
          height: 50,
          backgroundColor: colors.palette.accent300,
          borderColor: colors.palette.accent500,
        }}
        inputInnerStyle={{
          backgroundColor: colors.palette.accent500,
        }}
        inputDetailStyle={{
          tintColor: colors.tint,
          height: 35,
          width: 35,
        }}
      />
      <ControlledToggle
        value
        variant="radio"
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: colors.palette.accent300,
          borderColor: colors.palette.accent500,
        }}
        inputInnerStyle={{
          backgroundColor: colors.palette.accent500,
        }}
        inputDetailStyle={{
          backgroundColor: colors.tint,
          height: 36,
          width: 36,
          borderRadius: 18,
        }}
      />

      <ControlledToggle
        value
        variant="switch"
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 70,
          height: 50,
          borderRadius: 25,
          backgroundColor: colors.palette.accent300,
          borderColor: colors.palette.accent500,
        }}
        inputInnerStyle={{
          backgroundColor: colors.tint,
          paddingLeft: 10,
          paddingRight: 10,
        }}
        inputDetailStyle={{
          backgroundColor: colors.palette.accent300,
          height: 36,
          width: 20,
          borderRadius: 36,
        }}
        switchAccessibilityMode="icon"
      />

      <Text preset="formHelper" style={$centeredText}>
        3 - style the input detail
      </Text>

      <DemoDivider size={32} style={{ width: "100%" }} />

      <View style={{ width: "100%" }}>
        <ControlledToggle
          value
          variant="radio"
          label="You can also style the label"
          LabelTextProps={{ size: "xs", weight: "bold" }}
          status="error"
          labelStyle={{
            backgroundColor: colors.error,
            color: colors.palette.neutral100,
            paddingHorizontal: 5,
          }}
        />
      </View>

      <DemoDivider size={24} style={{ width: "100%" }} />

      <View style={{ width: "100%" }}>
        <ControlledToggle
          value
          variant="radio"
          labelPosition="left"
          containerStyle={{ padding: 10, backgroundColor: colors.error }}
          label="Or, style the entire container"
          status="error"
          labelStyle={{ color: colors.palette.neutral100 }}
        />
      </View>
    </DemoUseCase>,
  ],
}

// @demo remove-file
