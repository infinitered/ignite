import { View, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"

export function DemoDivider() {
  const { themed } = useAppTheme()
  return <View style={themed($divider)} />
}

const $divider: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: spacing.sm,
})
