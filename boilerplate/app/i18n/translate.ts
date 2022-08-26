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

export type PTKeyPath<keyPath extends string | number> = {
  [TKey in keyof PlatformValuesProps as `${TKey}${keyPath}`]: string
}

/**
 * Return translated text for all platforms
 *
 * @param defaultValue
 * @param platformValues
 * @returns
 */
export function PT<keyPath extends string | number>(
  key: string | number,
  defaultValue: string,
  platformValues: PlatformValuesProps,
): PTKeyPath<keyPath> {
  const platformOSTypes = ["android", "ios", "web", "macos", "windows"]

  const translationValues = platformOSTypes.reduce((data, platformType) => {
    const keyPath = platformType + key
    data[keyPath] = platformValues[platformType] || defaultValue
    return data
  }, {})

  return translationValues
}
