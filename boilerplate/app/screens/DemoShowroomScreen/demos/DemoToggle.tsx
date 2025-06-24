/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import { useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import { Checkbox, CheckboxToggleProps } from "@/components/Toggle/Checkbox"
import { Radio, RadioToggleProps } from "@/components/Toggle/Radio"
import { Switch, SwitchToggleProps } from "@/components/Toggle/Switch"
import { translate } from "@/i18n/translate"
import type { ThemedStyle } from "@/theme/types"
import { $styles } from "@/theme/styles"

import { DemoDivider } from "../DemoDivider"
import { Demo } from "../DemoShowroomScreen"
import { DemoUseCase } from "../DemoUseCase"

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

export const DemoToggle: Demo = {
  name: "Toggle",
  description: "demoToggle:description",
  data: ({ theme, themed }) => [
    <DemoUseCase
      name="demoToggle:useCase.variants.name"
      description="demoToggle:useCase.variants.description"
    >
      <ControlledCheckbox
        labelTx="demoToggle:useCase.variants.checkbox.label"
        helperTx="demoToggle:useCase.variants.checkbox.helper"
      />
      <DemoDivider size={24} />
      <ControlledRadio
        labelTx="demoToggle:useCase.variants.radio.label"
        helperTx="demoToggle:useCase.variants.radio.helper"
      />
      <DemoDivider size={24} />
      <ControlledSwitch
        labelTx="demoToggle:useCase.variants.switch.label"
        helperTx="demoToggle:useCase.variants.switch.helper"
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoToggle:useCase.statuses.name"
      description="demoToggle:useCase.statuses.description"
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
      <Text preset="formHelper" style={themed($centeredText)}>
        {translate("demoToggle:useCase.statuses.noStatus")}
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
        {translate("demoToggle:useCase.statuses.errorStatus")}
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
        {translate("demoToggle:useCase.statuses.disabledStatus")}
      </Text>
    </DemoUseCase>,

    <DemoUseCase
      name="demoToggle:useCase.passingContent.name"
      description="demoToggle:useCase.passingContent.description"
    >
      <ControlledCheckbox
        value
        labelTx="demoToggle:useCase.passingContent.useCase.checkBox.label"
        helperTx="demoToggle:useCase.passingContent.useCase.checkBox.helper"
      />
      <DemoDivider size={24} />
      <ControlledRadio
        value
        labelTx="demoShowroomScreen:demoViaSpecifiedTxProp"
        labelTxOptions={{ prop: "label" }}
        helperTx="demoShowroomScreen:demoViaSpecifiedTxProp"
        helperTxOptions={{ prop: "helper" }}
      />
      <DemoDivider size={24} />
      <ControlledCheckbox
        value
        labelTx="demoToggle:useCase.passingContent.useCase.checkBoxMultiLine.helper"
        editable={false}
      />
      <DemoDivider size={24} />
      <ControlledRadio
        value
        labelTx="demoToggle:useCase.passingContent.useCase.radioChangeSides.helper"
        labelPosition="left"
      />
      <DemoDivider size={24} />
      <ControlledCheckbox
        value
        status="error"
        icon="ladybug"
        labelTx="demoToggle:useCase.passingContent.useCase.customCheckBox.label"
      />
      <DemoDivider size={24} />
      <ControlledSwitch
        value
        accessibilityMode="text"
        labelTx="demoToggle:useCase.passingContent.useCase.switch.label"
        status="error"
        helperTx="demoToggle:useCase.passingContent.useCase.switch.helper"
      />
      <DemoDivider size={24} />
      <ControlledSwitch
        value
        labelPosition="left"
        accessibilityMode="icon"
        labelTx="demoToggle:useCase.passingContent.useCase.switchAid.label"
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoToggle:useCase.styling.name"
      description="demoToggle:useCase.styling.description"
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
      <Text preset="formHelper" style={themed($centeredText)}>
        {translate("demoToggle:useCase.styling.outerWrapper")}
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
        {translate("demoToggle:useCase.styling.innerWrapper")}
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
        {translate("demoToggle:useCase.styling.inputDetail")}
      </Text>

      <DemoDivider size={32} style={{ width: "100%" }} />

      <View style={{ width: "100%" }}>
        <ControlledRadio
          value
          labelTx="demoToggle:useCase.styling.labelTx"
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
          labelTx="demoToggle:useCase.styling.styleContainer"
          status="error"
          labelStyle={{ color: theme.colors.palette.neutral100 }}
        />
      </View>
    </DemoUseCase>,
  ],
}

// @demo remove-file
