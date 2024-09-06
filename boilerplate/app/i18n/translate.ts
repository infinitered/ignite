import { TOptions } from "i18next"
import { i18n, TxKeyPath } from "./i18n"

/**
 * Translates text.
 * @param {TxKeyPath} key - The i18n key.
 * @param {i18n.TOptions} options - The i18n options.
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
 * import { translate } from "./i18n"
 *
 * translate("common.ok", { name: "world" })
 * // => "Hello world!"
 * ```
 */
export function translate(key: TxKeyPath, options?: TOptions): string {
  return i18n.t(key, options)
}
