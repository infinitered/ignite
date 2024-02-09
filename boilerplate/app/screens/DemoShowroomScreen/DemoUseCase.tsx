import React, { ReactNode } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { ThemedStyle, spacing, typography } from "../../theme"
import { useAppTheme } from "app/utils/useAppTheme"

interface DemoUseCaseProps {
  name: string
  description?: string
  layout?: "column" | "row"
  children: ReactNode
}

/**
 * @param {DemoUseCaseProps} props - The props for the `DemoUseCase` component.
 * @returns {JSX.Element} The rendered `DemoUseCase` component.
 */
export function DemoUseCase(props: DemoUseCaseProps) {
  const { name, description, children, layout = "column" } = props
  const { themed } = useAppTheme()

  return (
    <View>
      <Text style={$name}>{name}</Text>

      {description && <Text style={$description}>{description}</Text>}

      <View style={[layout === "row" && $rowLayout, themed($item)]}>{children}</View>
    </View>
  )
}

const $description: TextStyle = {
  marginTop: spacing.md,
}

const $item: ThemedStyle<ViewStyle> = (colors) => ({
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  padding: spacing.lg,
  marginVertical: spacing.md,
})

const $name: TextStyle = {
  fontFamily: typography.primary.bold,
}

const $rowLayout: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
}

// @demo remove-file
