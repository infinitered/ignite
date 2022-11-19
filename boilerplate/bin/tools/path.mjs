export const APP_DIR = path.join(__dirname, "..", "..", "app")

/** @param {...string} args */
export const app = (...args) => path.join(APP_DIR, ...args)

export const dir = {
  /**
   * `path.join` with `app/components` prefix
   * @param {...string} args
   */
  components: (...args) => app("components", ...args),
  /**
   * `path.join` with `app/config` prefix
   * @param {...string} args
   */
  config: (...args) => app("config", ...args),
  /**
   * `path.join` with `app/i18n` prefix
   * @param {...string} args
   */
  i18n: (...args) => app("i18n", ...args),
  /**
   * `path.join` with `app/models` prefix
   * @param {...string} args
   */
  models: (...args) => app("models", ...args),
  /**
   * `path.join` with `app/navigators` prefix
   * @param {...string} args
   */
  navigators: (...args) => app("navigators", ...args),
  /**
   * `path.join` with `app/screens` prefix
   * @param {...string} args
   */
  screens: (...args) => app("screens", ...args),
  /**
   * `path.join` with `app/services` prefix
   * @param {...string} args
   */
  services: (...args) => app("services", ...args),
  /**
   * `path.join` with `app/theme` prefix
   * @param {...string} args
   */
  theme: (...args) => app("theme", ...args),
  /**
   * `path.join` with `app/utils` prefix
   * @param {...string} args
   */
  utils: (...args) => app("utils", ...args),
}
