import React from "react"
import { ViewStyle } from "react-native"

import { PressableIcon } from "@/components/Icon"
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"

interface DrawerIconButtonProps {
  onPress: () => void
}

export function DrawerIconButton({ onPress }: DrawerIconButtonProps) {
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  return (
    <PressableIcon
      icon="menu"
      onPress={onPress}
      style={themed($menuIconButton)}
      size={24}
      color={colors.text}
    />
  )
}

const $menuIconButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "absolute",
  top: spacing.lg,
  [isRTL ? "right" : "left"]: spacing.lg,
  zIndex: 100,
  backgroundColor: "rgba(0,0,0,0.1)",
  borderRadius: 20,
  padding: spacing.sm,
})
