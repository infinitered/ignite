/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import React from "react"
import { EmptyState } from "../../../components"
import { colors } from "../../../theme"
import { DemoDivider } from "../DemoDivider"
import { Demo } from "../DemoShowroomScreen"
import { DemoUseCase } from "../DemoUseCase"

export const DemoEmptyState: Demo = {
  name: "EmptyState",
  description:
    "A component to use when there is no data to display. It can be utilized to direct the user what to do next",
  data: [
    <DemoUseCase
      name="Presets"
      description="You can create different text/image sets. One is predefined called `generic`. Note, there's no default in case you want to have a completely custom EmptyState."
    >
      <EmptyState preset="generic" />
    </DemoUseCase>,

    <DemoUseCase
      name="Passing Content"
      description="There are a few different ways to pass content."
    >
      <EmptyState
        imageSource={require("../../../../assets/images/logo.png")}
        heading="Customize Image"
        content="You can pass in any image source."
      />

      <DemoDivider size={30} line />

      <EmptyState
        heading="Via `heading` Prop"
        content="Via `content` prop."
        button="Via `button` Prop"
      />

      <DemoDivider size={30} line />

      <EmptyState
        headingTx="demoShowroomScreen.demoViaSpecifiedTxProp"
        headingTxOptions={{ prop: "heading" }}
        contentTx="demoShowroomScreen.demoViaSpecifiedTxProp"
        contentTxOptions={{ prop: "content" }}
        buttonTx="demoShowroomScreen.demoViaSpecifiedTxProp"
        buttonTxOptions={{ prop: "button" }}
      />
    </DemoUseCase>,

    <DemoUseCase name="Styling" description="The component can be styled easily.">
      <EmptyState
        preset="generic"
        style={{ backgroundColor: colors.error, paddingVertical: 20 }}
        imageStyle={{ height: 75, tintColor: colors.palette.neutral100 }}
        ImageProps={{ resizeMode: "contain" }}
        headingStyle={{
          color: colors.palette.neutral100,
          textDecorationLine: "underline",
          textDecorationColor: colors.palette.neutral100,
        }}
        contentStyle={{
          color: colors.palette.neutral100,
          textDecorationLine: "underline",
          textDecorationColor: colors.palette.neutral100,
        }}
        buttonStyle={{ alignSelf: "center", backgroundColor: colors.palette.neutral100 }}
        buttonTextStyle={{ color: colors.error }}
        ButtonProps={{
          preset: "reversed",
        }}
      />
    </DemoUseCase>,
  ],
}

// @demo remove-file
