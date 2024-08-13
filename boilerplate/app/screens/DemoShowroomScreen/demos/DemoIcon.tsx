/* eslint-disable react/jsx-key */
import React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Icon, iconRegistry, IconTypes, Text } from "../../../components"
import { Demo } from "../DemoShowroomScreen"
import { DemoUseCase } from "../DemoUseCase"
import type { ThemedStyle } from "app/theme"
import { $styles } from "app/theme"

const $demoIconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
})

const $iconTile: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "33.333%",
  alignItems: "center",
  paddingVertical: spacing.xs,
})

const $iconTileLabel: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  marginTop: spacing.xxs,
  color: colors.textDim,
})

const $customIconContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.md,
  backgroundColor: colors.palette.angry500,
})

const $customIcon: ThemedStyle<ImageStyle> = ({ colors }) => ({
  tintColor: colors.palette.neutral100,
})

export const DemoIcon: Demo = {
  name: "Icon",
  description:
    "A component to render a registered icon. It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.",
  data: ({ theme, themed }) => [
    <DemoUseCase
      name="Icons"
      description="List of icons registered inside the component."
      layout="row"
      itemStyle={$styles.flexWrap}
    >
      {Object.keys(iconRegistry).map((icon) => (
        <View key={icon} style={themed($iconTile)}>
          <Icon icon={icon as IconTypes} color={theme.colors.tint} size={35} />

          <Text size="xs" style={themed($iconTileLabel)}>
            {icon}
          </Text>
        </View>
      ))}
    </DemoUseCase>,

    <DemoUseCase name="Size" description="There's a size prop." layout="row">
      <Icon icon="ladybug" containerStyle={themed($demoIconContainer)} />
      <Icon icon="ladybug" size={35} containerStyle={themed($demoIconContainer)} />
      <Icon icon="ladybug" size={50} containerStyle={themed($demoIconContainer)} />
      <Icon icon="ladybug" size={75} containerStyle={themed($demoIconContainer)} />
    </DemoUseCase>,

    <DemoUseCase name="Color" description="There's a color prop." layout="row">
      <Icon
        icon="ladybug"
        color={theme.colors.palette.accent500}
        containerStyle={themed($demoIconContainer)}
      />
      <Icon
        icon="ladybug"
        color={theme.colors.palette.primary500}
        containerStyle={themed($demoIconContainer)}
      />
      <Icon
        icon="ladybug"
        color={theme.colors.palette.secondary500}
        containerStyle={themed($demoIconContainer)}
      />
      <Icon
        icon="ladybug"
        color={theme.colors.palette.neutral700}
        containerStyle={themed($demoIconContainer)}
      />
      <Icon
        icon="ladybug"
        color={theme.colors.palette.angry500}
        containerStyle={themed($demoIconContainer)}
      />
    </DemoUseCase>,

    <DemoUseCase name="Styling" description="The component can be styled easily." layout="row">
      <Icon
        icon="ladybug"
        style={themed($customIcon)}
        size={40}
        containerStyle={themed($customIconContainer)}
      />
    </DemoUseCase>,
  ],
}

// @demo remove-file
