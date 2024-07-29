/* eslint-disable react/jsx-key */
import React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Icon, iconRegistry, IconTypes, Text } from "../../../components"
import { colors, spacing } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoUseCase } from "../DemoUseCase"

const $demoIconContainer: ViewStyle = {
  padding: spacing.xs,
}

const $iconTile: ViewStyle = {
  width: "33.333%",
  alignItems: "center",
  paddingVertical: spacing.xs,
}

const $iconTileLabel: TextStyle = {
  marginTop: spacing.xxs,
  color: colors.textDim,
}

const $customIconContainer: ViewStyle = {
  padding: spacing.md,
  backgroundColor: colors.palette.angry500,
}

const $customIcon: ImageStyle = {
  tintColor: colors.palette.neutral100,
}

export const DemoIcon: Demo = {
  name: "Icon",
  description: "demoIcon.description",
  data: [
    <DemoUseCase
      name="demoIcon.useCase.icons.name"
      description="demoIcon.useCase.icons.description"
      layout="row"
    >
      {Object.keys(iconRegistry).map((icon) => (
        <View key={icon} style={$iconTile}>
          <Icon icon={icon as IconTypes} color={colors.tint} size={35} />

          <Text size="xs" style={$iconTileLabel}>
            {icon}
          </Text>
        </View>
      ))}
    </DemoUseCase>,

    <DemoUseCase
      name="demoIcon.useCase.size.name"
      description="demoIcon.useCase.size.description"
      layout="row"
    >
      <Icon icon="ladybug" containerStyle={$demoIconContainer} />
      <Icon icon="ladybug" size={35} containerStyle={$demoIconContainer} />
      <Icon icon="ladybug" size={50} containerStyle={$demoIconContainer} />
      <Icon icon="ladybug" size={75} containerStyle={$demoIconContainer} />
    </DemoUseCase>,

    <DemoUseCase
      name="demoIcon.useCase.color.name"
      description="demoIcon.useCase.color.description"
      layout="row"
    >
      <Icon icon="ladybug" color={colors.palette.accent500} containerStyle={$demoIconContainer} />
      <Icon icon="ladybug" color={colors.palette.primary500} containerStyle={$demoIconContainer} />
      <Icon
        icon="ladybug"
        color={colors.palette.secondary500}
        containerStyle={$demoIconContainer}
      />
      <Icon icon="ladybug" color={colors.palette.neutral700} containerStyle={$demoIconContainer} />
      <Icon icon="ladybug" color={colors.palette.angry500} containerStyle={$demoIconContainer} />
    </DemoUseCase>,

    <DemoUseCase
      name="demoIcon.useCase.styling.name"
      description="demoIcon.useCase.styling.description"
      layout="row"
    >
      <Icon icon="ladybug" style={$customIcon} size={40} containerStyle={$customIconContainer} />
    </DemoUseCase>,
  ],
}

// @demo remove-file
