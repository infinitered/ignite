import { useContext } from "react"
import LocaleContext from "../i18n/LocaleContext"

export const useTranslation = (_props?) => {
  return useContext(LocaleContext)
}
