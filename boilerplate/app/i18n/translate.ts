import i18n from "i18n-js"
import { TxKeyPath } from "./i18n"

/**
 * Translates text.
 * @param {TxKeyPath} key - The i18n key.
 * @param {i18n.TranslateOptions} options - The i18n options.
 * @returns {string} - The translated text.
 * @example
 * Translations:
 *
 * ```en.ts
 * {
 *  "hello": "Hello, {{name}}!"
 * }
 * ```
 *
 * Usage:
 * ```ts
 * import { translate } from "i18n-js"
 *
 * translate("common.ok", { name: "world" })
 * // => "Hello world!"
 * ```
 */
export function translate(key: TxKeyPath, options?: i18n.TranslateOptions): string {
  return i18n.t(key, options)
}
