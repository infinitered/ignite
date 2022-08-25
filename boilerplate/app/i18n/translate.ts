import i18n from "i18n-js"
import { TxKeyPath } from "./i18n"

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(key: TxKeyPath, options?: i18n.TranslateOptions) {
  return key ? i18n.t(key, options) : null
}

export interface PlatformValuesProps {
  android?: string
  ios?: string
  web?: string
  macos?: string
  windows?: string
}

/**
 * Return translated text for all platforms
 *
 * @param defaultValue
 * @param platformValues
 * @returns
 */
export function PT(key: string, defaultValue: string, platformValues: PlatformValuesProps) {
  const platformOSTypes = ["android", "ios", "web", "macos", "windows"]

  let translationValues = platformOSTypes.reduce((data, platformType) => {
    const keyPath = platformType + key
    data[keyPath] = platformValues[platformType] || defaultValue
    return data
  }, {})

  return translationValues
}
