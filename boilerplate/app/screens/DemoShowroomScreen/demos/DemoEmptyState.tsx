/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import React from "react"
import { EmptyState } from "../../../components"
import { colors } from "../../../theme"
import { DemoDivider } from "../DemoDivider"
import { Demo } from "../DemoShowroomScreen"
import { DemoUseCase } from "../DemoUseCase"

export const DemoEmptyState: Demo = {
  name: "EmptyState",
  description: "demoEmptyState.description",
  data: [
    <DemoUseCase
      name="demoEmptyState.useCase.presets.name"
      description="demoEmptyState.useCase.presets.description"
    >
      <EmptyState preset="generic" />
    </DemoUseCase>,

    <DemoUseCase
      name="demoEmptyState.useCase.passingContent.name"
      description="demoEmptyState.useCase.passingContent.description"
    >
      <EmptyState
        imageSource={require("../../../../assets/images/logo.png")}
        headingTx="demoEmptyState.useCase.passingContent.customizeImageHeading"
        contentTx="demoEmptyState.useCase.passingContent.customizeImageContent"
      />

      <DemoDivider size={30} line />

      <EmptyState
        headingTx="demoEmptyState.useCase.passingContent.viaHeadingProp"
        contentTx="demoEmptyState.useCase.passingContent.viaContentProp"
        buttonTx="demoEmptyState.useCase.passingContent.viaButtonProp"
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

    <DemoUseCase
      name="demoEmptyState.useCase.styling.name"
      description="demoEmptyState.useCase.styling.description"
    >
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
        buttonStyle={{
          alignSelf: "center",
          backgroundColor: colors.palette.neutral100,
        }}
        buttonTextStyle={{ color: colors.error }}
        ButtonProps={{
          preset: "reversed",
        }}
      />
    </DemoUseCase>,
  ],
}

// @demo remove-file
