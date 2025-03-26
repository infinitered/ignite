import { ReactNode } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { TxKeyPath, translate } from "@/i18n"
import { Text } from "../../components"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { $styles } from "@/theme"

interface DemoUseCaseProps {
  name: TxKeyPath
  description?: TxKeyPath
  layout?: "column" | "row"
  itemStyle?: ViewStyle
  children: ReactNode
}

/**
 * @param {DemoUseCaseProps} props - The props for the `DemoUseCase` component.
 * @returns {JSX.Element} The rendered `DemoUseCase` component.
 */
export function DemoUseCase(props: DemoUseCaseProps) {
  const { name, description, children, layout = "column", itemStyle = {} } = props
  const { themed } = useAppTheme()

  return (
    <View>
      <Text style={themed($name)}>{translate(name)}</Text>
      {description && <Text style={themed($description)}>{translate(description)}</Text>}

      <View style={[itemStyle, layout === "row" && $styles.row, themed($item)]}>{children}</View>
    </View>
  )
}

const $description: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})

const $item: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  padding: spacing.lg,
  marginVertical: spacing.md,
})

const $name: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.bold,
})

// @demo remove-file
