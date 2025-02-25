/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import { useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import {
  Checkbox,
  CheckboxToggleProps,
  Radio,
  RadioToggleProps,
  Switch,
  SwitchToggleProps,
  Text,
} from "@/components"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import { $styles, type ThemedStyle } from "@/theme"
import TranslateSheet from "translate-sheet"

function ControlledCheckbox(props: CheckboxToggleProps) {
  const [value, setValue] = useState(props.value || false)
  return <Checkbox {...props} value={value} onPress={() => setValue(!value)} />
}

function ControlledRadio(props: RadioToggleProps) {
  const [value, setValue] = useState(props.value || false)
  return <Radio {...props} value={value} onPress={() => setValue(!value)} />
}

function ControlledSwitch(props: SwitchToggleProps) {
  const [value, setValue] = useState(props.value || false)
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

const translations = TranslateSheet.create("demoToggle", {
  description:
    "Renders a boolean input. This is a controlled component that requires an onValueChange callback that updates the value prop in order for the component to reflect user actions. If the value prop is not updated, the component will continue to render the supplied value prop instead of the expected result of any user actions.",
  useCase: {
    variants: {
      name: "Variants",
      description:
        "The component supports a few different variants. If heavy customization of a specific variant is needed, it can be easily refactored. The default is `checkbox`.",
      checkbox: {
        label: "`checkbox` variant",
        helper: "This can be used for a single on/off input.",
      },
      radio: {
        label: "`radio` variant",
        helper: "Use this when you have multiple options.",
      },
      switch: {
        label: "`switch` variant",
        helper: "A more prominent on/off input. Has better accessibility support.",
      },
    },
    statuses: {
      name: "Statuses",
      description:
        "There is a status prop - similar to `preset` in other components, but affects component functionality as well.",
      noStatus: "No status - this is the default",
      errorStatus: "Error status - use when there is an error",
      disabledStatus: "Disabled status - disables the editability and mutes input",
    },
    passingContent: {
      name: "Passing Content",
      description: "There are a few different ways to pass content.",
      useCase: {
        checkBox: {
          label: "Via `labelTx` prop",
          helper: "Via `helperTx` prop.",
        },
        checkBoxMultiLine: {
          helper: "Supports multiline - Nulla proident consectetur labore sunt ea labore. ",
        },
        radioChangeSides: {
          helper: "You can change sides - Laborum labore adipisicing in eu ipsum deserunt.",
        },
        customCheckBox: {
          label: "Pass in a custom checkbox icon.",
        },
        switch: {
          label: "Switches can be read as text",
          helper:
            "By default, this option doesn't use `Text` since depending on the font, the on/off characters might look weird. Customize as needed.",
        },
        switchAid: {
          label: "Or aided with an icon",
        },
      },
    },
    styling: {
      name: "Styling",
      description: "The component can be styled easily.",
      outerWrapper: "1 - style the input outer wrapper",
      innerWrapper: "2 - style the input inner wrapper",
      inputDetail: "3 - style the input detail",
      labelTx: "You can also style the labelTx",
      styleContainer: "Or, style the entire container",
    },
  },
  demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
})

export const DemoToggle: Demo = {
  name: "Toggle",
  get description() {
    return translations.description;
  },
  data: ({ theme, themed }) => [
    <DemoUseCase
      name={translations.useCase.variants.name}
      description={translations.useCase.variants.description}
    >
      <ControlledCheckbox
        label={translations.useCase.variants.checkbox.label}
        helper={translations.useCase.variants.checkbox.helper}
      />
      <DemoDivider size={24} />
      <ControlledRadio
        label={translations.useCase.variants.radio.label}
        helper={translations.useCase.variants.radio.helper}
      />
      <DemoDivider size={24} />
      <ControlledSwitch
        label={translations.useCase.variants.switch.label}
        helper={translations.useCase.variants.switch.helper}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.statuses.name}
      description={translations.useCase.statuses.description}
      layout="row"
      itemStyle={$styles.flexWrap}
    >
      <ControlledCheckbox containerStyle={$centeredOneThirdCol} />
      <ControlledRadio containerStyle={$centeredOneThirdCol} />
      <ControlledSwitch containerStyle={$centeredOneThirdCol} />
      <DemoDivider style={{ width: "100%" }} />
      <ControlledCheckbox value containerStyle={$centeredOneThirdCol} />
      <ControlledRadio value containerStyle={$centeredOneThirdCol} />
      <ControlledSwitch value containerStyle={$centeredOneThirdCol} />
      <Text
        text={translations.useCase.statuses.noStatus}
        preset="formHelper"
        style={themed($centeredText)}
      />
      <DemoDivider size={24} style={{ width: "100%" }} />

      <ControlledCheckbox status="error" containerStyle={$centeredOneThirdCol} />
      <ControlledRadio status="error" containerStyle={$centeredOneThirdCol} />
      <ControlledSwitch status="error" containerStyle={$centeredOneThirdCol} />
      <DemoDivider style={{ width: "100%" }} />
      <ControlledCheckbox value status="error" containerStyle={$centeredOneThirdCol} />
      <ControlledRadio value status="error" containerStyle={$centeredOneThirdCol} />
      <ControlledSwitch value status="error" containerStyle={$centeredOneThirdCol} />
      <Text
        preset="formHelper"
        text={translations.useCase.statuses.errorStatus}
        style={themed($centeredText)}
      />

      <DemoDivider size={24} style={{ width: "100%" }} />

      <ControlledCheckbox status="disabled" containerStyle={$centeredOneThirdCol} />
      <ControlledRadio status="disabled" containerStyle={$centeredOneThirdCol} />
      <ControlledSwitch status="disabled" containerStyle={$centeredOneThirdCol} />
      <DemoDivider style={{ width: "100%" }} />
      <ControlledCheckbox value status="disabled" containerStyle={$centeredOneThirdCol} />
      <ControlledRadio value status="disabled" containerStyle={$centeredOneThirdCol} />
      <ControlledSwitch value status="disabled" containerStyle={$centeredOneThirdCol} />
      <Text
        preset="formHelper"
        text={translations.useCase.statuses.disabledStatus}
        style={themed($centeredText)}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.passingContent.name}
      description={translations.useCase.passingContent.description}
    >
      <ControlledCheckbox
        value
        label={translations.useCase.passingContent.useCase.checkBox.label}
        helper={translations.useCase.passingContent.useCase.checkBox.helper}
      />
      <DemoDivider size={24} />
      <ControlledRadio
        value
        label={translations.demoViaSpecifiedTxProp({ prop: "label" })}
        helper={translations.demoViaSpecifiedTxProp({ prop: "helper" })}
      />
      <DemoDivider size={24} />
      <ControlledCheckbox
        value
        label={translations.useCase.passingContent.useCase.checkBoxMultiLine.helper}
        editable={false}
      />
      <DemoDivider size={24} />
      <ControlledRadio
        value
        label={translations.useCase.passingContent.useCase.radioChangeSides.helper}
        labelPosition="left"
      />
      <DemoDivider size={24} />
      <ControlledCheckbox
        value
        status="error"
        icon="ladybug"
        label={translations.useCase.passingContent.useCase.customCheckBox.label}
      />
      <DemoDivider size={24} />
      <ControlledSwitch
        value
        accessibilityMode="text"
        label={translations.useCase.passingContent.useCase.switch.label}
        status="error"
        helper={translations.useCase.passingContent.useCase.switch.helper}
      />
      <DemoDivider size={24} />
      <ControlledSwitch
        value
        labelPosition="left"
        accessibilityMode="icon"
        label={translations.useCase.passingContent.useCase.switchAid.label}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.styling.name}
      description={translations.useCase.styling.description}
      layout="row"
      itemStyle={$styles.flexWrap}
    >
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
      <Text
        preset="formHelper"
        text={translations.useCase.styling.outerWrapper}
        style={themed($centeredText)}
      />

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
      <Text
        preset="formHelper"
        text={translations.useCase.styling.innerWrapper}
        style={themed($centeredText)}
      />

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

      <Text
        preset="formHelper"
        text={translations.useCase.styling.inputDetail}
        style={themed($centeredText)}
      />

      <DemoDivider size={32} style={{ width: "100%" }} />

      <View style={{ width: "100%" }}>
        <ControlledRadio
          value
          label={translations.useCase.styling.labelTx}
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
          label={translations.useCase.styling.styleContainer}
          status="error"
          labelStyle={{ color: theme.colors.palette.neutral100 }}
        />
      </View>
    </DemoUseCase>,
  ],
}

// @demo remove-file
