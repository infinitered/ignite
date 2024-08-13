/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import {
  Checkbox,
  CheckboxToggleProps,
  Radio,
  RadioToggleProps,
  Switch,
  SwitchToggleProps,
  Text,
} from "app/components"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import type { ThemedStyle } from "app/theme"

function ControlledCheckbox(props: CheckboxToggleProps) {
  const [value, setValue] = React.useState(props.value || false)
  return <Checkbox {...props} value={value} onPress={() => setValue(!value)} />
}

function ControlledRadio(props: RadioToggleProps) {
  const [value, setValue] = React.useState(props.value || false)
  return <Radio {...props} value={value} onPress={() => setValue(!value)} />
}

function ControlledSwitch(props: SwitchToggleProps) {
  const [value, setValue] = React.useState(props.value || false)
  return <Switch {...props} value={value} onPress={() => setValue(!value)} />
}

const $centeredOneThirdCol: ViewStyle = {
  width: "33.33333%",
  alignItems: "center",
  justifyContent: "center",
}
const $centeredText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  width: "100%",
  marginTop: spacing.xs,
})

export const DemoToggle: Demo = {
  name: "Toggle",
  description:
    "Renders a boolean input. This is a controlled component that requires an onValueChange callback that updates the value prop in order for the component to reflect user actions. If the value prop is not updated, the component will continue to render the supplied value prop instead of the expected result of any user actions.",
  data: ({ theme, themed }) => [
    <DemoUseCase
      name="Variants"
      description="The component supports a few different variants. If heavy customization of a specific variant is needed, it can be easily refactored. The default is `checkbox`."
    >
      <ControlledCheckbox
        label="`checkbox` variant"
        helper="This can be used for a single on/off input."
      />
      <DemoDivider size={24} />
      <ControlledRadio label="`radio` variant" helper="Use this when you have multiple options." />
      <DemoDivider size={24} />
      <ControlledSwitch
        label="`switch` variant"
        helper="A more prominent on/off input. Has better accessibility support."
      />
    </DemoUseCase>,

    <DemoUseCase
      name="Statuses"
      description="There is a status prop - similar to `preset` in other components, but affects component functionality as well."
      layout="row"
    >
      <ControlledCheckbox containerStyle={$centeredOneThirdCol} />
      <ControlledRadio containerStyle={$centeredOneThirdCol} />
      <ControlledSwitch containerStyle={$centeredOneThirdCol} />
      <DemoDivider style={{ width: "100%" }} />
      <ControlledCheckbox value containerStyle={$centeredOneThirdCol} />
      <ControlledRadio value containerStyle={$centeredOneThirdCol} />
      <ControlledSwitch value containerStyle={$centeredOneThirdCol} />
      <Text preset="formHelper" style={themed($centeredText)}>
        No status - this is the default
      </Text>

      <DemoDivider size={24} style={{ width: "100%" }} />

      <ControlledCheckbox status="error" containerStyle={$centeredOneThirdCol} />
      <ControlledRadio status="error" containerStyle={$centeredOneThirdCol} />
      <ControlledSwitch status="error" containerStyle={$centeredOneThirdCol} />
      <DemoDivider style={{ width: "100%" }} />
      <ControlledCheckbox value status="error" containerStyle={$centeredOneThirdCol} />
      <ControlledRadio value status="error" containerStyle={$centeredOneThirdCol} />
      <ControlledSwitch value status="error" containerStyle={$centeredOneThirdCol} />
      <Text preset="formHelper" style={themed($centeredText)}>
        Error status - use when there is an error
      </Text>

      <DemoDivider size={24} style={{ width: "100%" }} />

      <ControlledCheckbox status="disabled" containerStyle={$centeredOneThirdCol} />
      <ControlledRadio status="disabled" containerStyle={$centeredOneThirdCol} />
      <ControlledSwitch status="disabled" containerStyle={$centeredOneThirdCol} />
      <DemoDivider style={{ width: "100%" }} />
      <ControlledCheckbox value status="disabled" containerStyle={$centeredOneThirdCol} />
      <ControlledRadio value status="disabled" containerStyle={$centeredOneThirdCol} />
      <ControlledSwitch value status="disabled" containerStyle={$centeredOneThirdCol} />
      <Text preset="formHelper" style={themed($centeredText)}>
        Disabled status - disables the editability and mutes input
      </Text>
    </DemoUseCase>,

    <DemoUseCase
      name="Passing Content"
      description="There are a few different ways to pass content."
    >
      <ControlledCheckbox value label="Via `label` prop" helper="Via `helper` prop." />
      <DemoDivider size={24} />
      <ControlledRadio
        value
        labelTx="demoShowroomScreen.demoViaSpecifiedTxProp"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoShowroomScreen.demoViaSpecifiedTxProp"
        helperTxOptions={{ prop: "helper" }}
      />
      <DemoDivider size={24} />
      <ControlledCheckbox
        value
        label="Supports multiline - Nulla proident consectetur labore sunt ea labore. "
        editable={false}
      />
      <DemoDivider size={24} />
      <ControlledRadio
        value
        label="You can change sides - Laborum labore adipisicing in eu ipsum deserunt."
        labelPosition="left"
      />
      <DemoDivider size={24} />
      <ControlledCheckbox
        value
        status="error"
        icon="ladybug"
        label="Pass in a custom checkbox icon."
      />
      <DemoDivider size={24} />
      <ControlledSwitch
        value
        accessibilityMode="text"
        label="Switches can be read as text"
        status="error"
        helper="By default, this option doesn't use `Text` since depending on the font, the on/off characters might look weird. Customize as needed."
      />
      <DemoDivider size={24} />
      <ControlledSwitch
        value
        labelPosition="left"
        accessibilityMode="icon"
        label="Or aided with an icon"
      />
    </DemoUseCase>,

    <DemoUseCase name="Styling" description="The component can be styled easily." layout="row">
      <ControlledCheckbox
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 50,
          height: 50,
          backgroundColor: theme.colors.palette.accent300,
          borderColor: theme.colors.palette.accent500,
        }}
      />
      <ControlledRadio
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: theme.colors.palette.accent300,
          borderColor: theme.colors.palette.accent500,
        }}
      />
      <ControlledSwitch
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 70,
          height: 50,
          borderRadius: 25,
          backgroundColor: theme.colors.palette.accent300,
          borderColor: theme.colors.palette.accent500,
        }}
      />
      <Text preset="formHelper" style={themed($centeredText)}>
        1 - style the input outer wrapper
      </Text>

      <DemoDivider style={{ width: "100%" }} />

      <ControlledCheckbox
        value
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 50,
          height: 50,
          backgroundColor: theme.colors.palette.accent300,
          borderColor: theme.colors.palette.accent500,
        }}
        inputInnerStyle={{
          backgroundColor: theme.colors.palette.accent500,
        }}
      />
      <ControlledRadio
        value
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: theme.colors.palette.accent300,
          borderColor: theme.colors.palette.accent500,
        }}
        inputInnerStyle={{
          backgroundColor: theme.colors.palette.accent500,
        }}
      />
      <ControlledSwitch
        value
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 70,
          height: 50,
          borderRadius: 25,
          backgroundColor: theme.colors.palette.accent300,
          borderColor: theme.colors.palette.accent500,
        }}
        inputInnerStyle={{
          backgroundColor: theme.colors.palette.accent500,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      />
      <Text preset="formHelper" style={themed($centeredText)}>
        2 - style the input inner wrapper
      </Text>

      <DemoDivider style={{ width: "100%" }} />

      <ControlledCheckbox
        value
        icon="ladybug"
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 50,
          height: 50,
          backgroundColor: theme.colors.palette.accent300,
          borderColor: theme.colors.palette.accent500,
        }}
        inputInnerStyle={{
          backgroundColor: theme.colors.palette.accent500,
        }}
        inputDetailStyle={{
          tintColor: theme.colors.tint,
          height: 35,
          width: 35,
        }}
      />
      <ControlledRadio
        value
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: theme.colors.palette.accent300,
          borderColor: theme.colors.palette.accent500,
        }}
        inputInnerStyle={{
          backgroundColor: theme.colors.palette.accent500,
        }}
        inputDetailStyle={{
          backgroundColor: theme.colors.tint,
          height: 36,
          width: 36,
          borderRadius: 18,
        }}
      />

      <ControlledSwitch
        value
        containerStyle={$centeredOneThirdCol}
        inputOuterStyle={{
          width: 70,
          height: 50,
          borderRadius: 25,
          backgroundColor: theme.colors.palette.accent300,
          borderColor: theme.colors.palette.accent500,
        }}
        inputInnerStyle={{
          backgroundColor: theme.colors.tint,
          paddingLeft: 10,
          paddingRight: 10,
        }}
        inputDetailStyle={{
          backgroundColor: theme.colors.palette.accent300,
          height: 36,
          width: 18,
          borderRadius: 36,
        }}
        accessibilityMode="icon"
      />

      <Text preset="formHelper" style={themed($centeredText)}>
        3 - style the input detail
      </Text>

      <DemoDivider size={32} style={{ width: "100%" }} />

      <View style={{ width: "100%" }}>
        <ControlledRadio
          value
          label="You can also style the label"
          LabelTextProps={{ size: "xs", weight: "bold" }}
          status="error"
          labelStyle={{
            backgroundColor: theme.colors.error,
            color: theme.colors.palette.neutral100,
            paddingHorizontal: 5,
          }}
        />
      </View>

      <DemoDivider size={24} style={{ width: "100%" }} />

      <View style={{ width: "100%" }}>
        <ControlledRadio
          value
          labelPosition="left"
          containerStyle={{ padding: 10, backgroundColor: theme.colors.error }}
          label="Or, style the entire container"
          status="error"
          labelStyle={{ color: theme.colors.palette.neutral100 }}
        />
      </View>
    </DemoUseCase>,
  ],
}

// @demo remove-file
