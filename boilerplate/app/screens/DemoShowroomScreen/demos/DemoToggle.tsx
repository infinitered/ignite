/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text, Toggle, ToggleProps } from "../../../components"
import { colors, spacing } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import { translate } from "app/i18n"

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
  marginTop: spacing.xs,
}

export const DemoToggle: Demo = {
  name: "Toggle",
  description: "demoToggle.description",
  data: [
    <DemoUseCase
      name="demoToggle.useCase.variants.name"
      description="demoToggle.useCase.variants.description"
    >
      <ControlledToggle
        variant="checkbox"
        labelTx="demoToggle.useCase.variants.checkbox.label"
        helperTx="demoToggle.useCase.variants.checkbox.helper"
      />
      <DemoDivider size={24} />
      <ControlledToggle
        variant="radio"
        labelTx="demoToggle.useCase.variants.radio.label"
        helperTx="demoToggle.useCase.variants.radio.helper"
      />
      <DemoDivider size={24} />
      <ControlledToggle
        variant="switch"
        labelTx="demoToggle.useCase.variants.switch.label"
        helperTx="demoToggle.useCase.variants.switch.helper"
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoToggle.useCase.statuses.name"
      description="demoToggle.useCase.statuses.description"
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
        {translate("demoToggle.useCase.statuses.noStatus")}
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
        {translate("demoToggle.useCase.statuses.errorStatus")}
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
        {translate("demoToggle.useCase.statuses.disabledStatus")}
      </Text>
    </DemoUseCase>,

    <DemoUseCase
      name="demoToggle.useCase.passingContent.name"
      description="demoToggle.useCase.passingContent.description"
    >
      <ControlledToggle
        variant="checkbox"
        value
        labelTx="demoToggle.useCase.passingContent.useCase.checkBox.label"
        helperTx="demoToggle.useCase.passingContent.useCase.checkBox.helper"
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
        labelTx="demoToggle.useCase.passingContent.useCase.checkBoxMultiLine.helper"
        editable={false}
      />
      <DemoDivider size={24} />
      <ControlledToggle
        variant="radio"
        value
        labelTx="demoToggle.useCase.passingContent.useCase.radioChangeSides.helper"
        labelPosition="left"
      />
      <DemoDivider size={24} />
      <ControlledToggle
        variant="checkbox"
        value
        status="error"
        checkboxIcon="ladybug"
        labelTx="demoToggle.useCase.passingContent.useCase.customCheckBox.label"
      />
      <DemoDivider size={24} />
      <ControlledToggle
        value
        variant="switch"
        switchAccessibilityMode="text"
        labelTx="demoToggle.useCase.passingContent.useCase.switch.label"
        status="error"
        helperTx="demoToggle.useCase.passingContent.useCase.switch.helper"
      />
      <DemoDivider size={24} />
      <ControlledToggle
        value
        variant="switch"
        labelPosition="left"
        switchAccessibilityMode="icon"
        labelTx="demoToggle.useCase.passingContent.useCase.switchAid.label"
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoToggle.useCase.styling.name"
      description="demoToggle.useCase.styling.description"
      layout="row"
    >
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
        {translate("demoToggle.useCase.styling.outerWrapper")}
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
        {translate("demoToggle.useCase.styling.innerWrapper")}
      </Text>

      <DemoDivider style={{ width: "100%" }} />

      <ControlledToggle
        value
        variant="checkbox"
        checkboxIcon="ladybug"
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
          width: 18,
          borderRadius: 36,
        }}
        switchAccessibilityMode="icon"
      />

      <Text preset="formHelper" style={$centeredText}>
        {translate("demoToggle.useCase.styling.inputDetail")}
      </Text>

      <DemoDivider size={32} style={{ width: "100%" }} />

      <View style={{ width: "100%" }}>
        <ControlledToggle
          value
          variant="radio"
          labelTx="demoToggle.useCase.styling.labelTx"
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
          labelTx="demoToggle.useCase.styling.styleContainer"
          status="error"
          labelStyle={{ color: colors.palette.neutral100 }}
        />
      </View>
    </DemoUseCase>,
  ],
}

// @demo remove-file
