import { ViewStyle } from "react-native"
import { color } from "../../theme"

/**
 * All screen keyboard offsets.
 */
export const offsets = {
  none: 0,
}

/**
 * The variations of keyboard offsets.
 */
export type KeyboardOffsets = keyof typeof offsets

/**
 * All the variations of screens.
 */
export const presets = {
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    outer: {
      backgroundColor: color.background,
      flex: 1,
      height: "100%",
    } as ViewStyle,
    inner: {
      justifyContent: "flex-start",
      alignItems: "stretch",
      height: "100%",
      width: "100%",
    } as ViewStyle,
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   *
   * Pick this one if you don't know which one you want yet.
   */
  scroll: {
    outer: {
      backgroundColor: color.background,
      flex: 1,
      height: "100%",
    } as ViewStyle,
    inner: { justifyContent: "flex-start", alignItems: "stretch" } as ViewStyle,
  },

  /**
   * No scrolling if content fits the screen, otherwise it scrolls.
   *
   * Pick this one if you are unsure your content will fit the screen or if you want to automatically adapt to screen size.
   *
   * Offset options can be applied to tweak scroll toggling so content may not overfit the screen.
   */
  auto: {
    // When using 'auto' the 'scroll' ViewStyles will apply.
    // outer: {} as ViewStyle,
    // inner: {} as ViewStyle,
    offset: {
      percent: 0.92, // Manipulates the height comparison by percentage values. For example, 0.92 enables scroll when the contents height reaches 92% of the screen.
      point: 0, // Same as above but offsets the scroll break point value by the density-independent pixels.
    } as const,
  },
}

/**
 * The variations of screens.
 */
export type ScreenPresets = keyof typeof presets

/**
 * Is this preset a non-scrolling one?
 *
 * @param preset The preset to check
 */
export function isNonScrolling(preset?: ScreenPresets) {
  // any of these things will make you scroll
  return !preset || !presets[preset] || preset === "fixed"
}
