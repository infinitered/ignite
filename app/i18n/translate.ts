import i18n from 'i18next';
import type { TOptions } from 'i18next';

import type { TxKeyPath } from '.';

/**
 * Translates text.
 * @param {TxKeyPath} key - The i18n key.
 * @param {TOptions} options - The i18n options.
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
 * translate("hello", { name: "world" })
 * // => "Hello world!"
 * ```
 */
export function translate(key: TxKeyPath, options?: TOptions): string {
  if (i18n.isInitialized) {
    return options ? i18n.t(key, options) : i18n.t(key);
  }
  return key;
}
