/* eslint-disable react/jsx-key */
import React from "react"
import { Text } from "../../../components"
import { colors } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import { translate } from "app/i18n"

export const DemoText: Demo = {
  name: "Text",
  description: "demoText.description",
  data: [
    <DemoUseCase
      name="demoText.useCase.presets.name"
      description="demoText.useCase.presets.description"
    >
      <Text>{translate("demoText.useCase.presets.default")}</Text>

      <DemoDivider />

      <Text preset="bold">{translate("demoText.useCase.presets.bold")}</Text>

      <DemoDivider />

      <Text preset="subheading">{translate("demoText.useCase.presets.subheading")}</Text>

      <DemoDivider />

      <Text preset="heading">{translate("demoText.useCase.presets.heading")}</Text>
    </DemoUseCase>,

    <DemoUseCase
      name="demoText.useCase.sizes.name"
      description="demoText.useCase.sizes.description"
    >
      <Text size="xs">{translate("demoText.useCase.sizes.xs")}</Text>

      <DemoDivider />

      <Text size="sm">{translate("demoText.useCase.sizes.sm")}</Text>

      <DemoDivider />

      <Text size="md">{translate("demoText.useCase.sizes.md")}</Text>

      <DemoDivider />

      <Text size="lg">{translate("demoText.useCase.sizes.lg")}</Text>

      <DemoDivider />

      <Text size="xl">{translate("demoText.useCase.sizes.xl")}</Text>

      <DemoDivider />

      <Text size="xxl">{translate("demoText.useCase.sizes.xxl")}</Text>
    </DemoUseCase>,

    <DemoUseCase
      name="demoText.useCase.weights.name"
      description="demoText.useCase.weights.description"
    >
      <Text weight="light">{translate("demoText.useCase.weights.light")}</Text>

      <DemoDivider />

      <Text weight="normal">{translate("demoText.useCase.weights.normal")}</Text>

      <DemoDivider />

      <Text weight="medium">{translate("demoText.useCase.weights.medium")}</Text>

      <DemoDivider />

      <Text weight="semiBold">{translate("demoText.useCase.weights.semibold")}</Text>

      <DemoDivider />

      <Text weight="bold">{translate("demoText.useCase.weights.bold")}</Text>
    </DemoUseCase>,

    <DemoUseCase
      name="demoText.useCase.passingContent.name"
      description="demoText.useCase.passingContent.description"
    >
      <Text text={translate("demoText.useCase.passingContent.viaText")} />

      <DemoDivider />

      <Text>
        <Text tx="demoText.useCase.passingContent.viaTx" />
        <Text tx="demoShowroomScreen.lorem2Sentences" />
      </Text>

      <DemoDivider />

      <Text>{translate("demoText.useCase.passingContent.children")}</Text>

      <DemoDivider />

      <Text>
        <Text>{translate("demoText.useCase.passingContent.nestedChildren")}</Text>
        <Text preset="bold">{translate("demoText.useCase.passingContent.nestedChildren2")}</Text>
        {` `}
        <Text preset="default">{translate("demoText.useCase.passingContent.nestedChildren3")}</Text>
        {` `}
        <Text preset="bold"> {translate("demoText.useCase.passingContent.nestedChildren4")}</Text>
      </Text>
    </DemoUseCase>,

    <DemoUseCase
      name="demoText.useCase.styling.name"
      description="demoText.useCase.styling.description"
    >
      <Text>
        <Text style={{ color: colors.error }}>{translate("demoText.useCase.styling.text")}</Text>
        {` `}
        <Text
          style={{
            color: colors.palette.neutral100,
            backgroundColor: colors.error,
          }}
        >
          {translate("demoText.useCase.styling.text2")}
        </Text>
        {` `}
        <Text
          /* eslint-disable react-native/no-inline-styles */
          style={{
            textDecorationLine: "underline line-through",
            textDecorationStyle: "dashed",
            color: colors.error,
            textDecorationColor: colors.error,
          }}
        >
          {translate("demoText.useCase.styling.text3")}
        </Text>
      </Text>
    </DemoUseCase>,
  ],
}

// @demo remove-file
