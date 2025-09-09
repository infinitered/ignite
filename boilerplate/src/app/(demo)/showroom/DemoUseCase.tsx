import { ReactElement } from "react"
import { TextStyle, ViewStyle } from "react-native"

import { Card } from "@/components/Card"
import { Text } from "@/components/Text"
import { TxKeyPath } from "@/i18n"
import { translate } from "@/i18n/translate"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"

export interface DemoUseCaseProps {
  name: TxKeyPath
  description: TxKeyPath
  children: ReactElement | ReactElement[]
}

export function DemoUseCase(props: DemoUseCaseProps) {
  const { name, description, children } = props
  const { themed } = useAppTheme()

  return (
    <Card
      style={themed($container)}
      HeadingComponent={
        <Text preset="bold" size="lg" style={themed($name)}>
          {translate(name)}
        </Text>
      }
      content={translate(description)}
      contentStyle={themed($description)}
    >
      {children}
    </Card>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
  marginBottom: spacing.lg,
})

const $name: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $description: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})
