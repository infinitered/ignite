import { ReactElement } from "react"
import type { Theme, ThemedStyle } from "@/theme/types"
import { TxKeyPath } from "@/i18n"

export interface Demo {
  name: string
  description: TxKeyPath
  data: ({ themed, theme }: { themed: any; theme: Theme }) => ReactElement[]
}
