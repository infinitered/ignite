import "../i18n"
import React from "react"
import I18n from "i18n-js"
import { translate } from "./translate"
import { useStorage } from "../utils/storage"
import { UPDATE_LANGUAGE } from "../utils/constants"

const LocaleContext = React.createContext<any>(null)

export const LocaleContextProvider = (props) => {
  const [locale, changeLocale] = useStorage(UPDATE_LANGUAGE, "en")

  I18n.locale = locale

  const _changeLocale = (locale) => {
    I18n.locale = locale
    changeLocale(locale)
  }

  return (
    <LocaleContext.Provider
      value={{
        ...I18n,
        localeProvider: locale,
        translate,
        changeLocale: _changeLocale,
      }}
    >
      {props.children}
    </LocaleContext.Provider>
  )
}

export default LocaleContext
