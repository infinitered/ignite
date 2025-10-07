import { ReactElement } from "react"
import { TxKeyPath } from "@/i18n"
import type { Theme } from "@/theme/types"

export interface Demo {
  name: string
  description: TxKeyPath
  data: ({ themed, theme }: { themed: any; theme: Theme }) => ReactElement[]
}
