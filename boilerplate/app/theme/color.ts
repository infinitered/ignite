import { palette } from './palette'

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The screen background.
   */
  background: palette.offBlack,
  /**
   * The main tinting color.
   */
  primary: palette.orange,
  /**
   * The main tinting color, but darker.
   */
  primaryLighter: palette.orangeLighter,
  secondary: palette.blue,
  secondaryLighter: palette.blueLighter,
  /**
   * A subtle color used for borders and lines.
   */
  line: palette.offWhite,
  /**
   * The default color of text in many components.
   */
  text: palette.white,
  secondaryText: palette.lightGrey,
  /**
   * Secondary information.
   */
  dim: palette.lightGrey,
  /**
   * Error messages and icons.
   */
  error: palette.angry,

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: palette.black,

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: palette.black,
  primaryDarkGradient: [ '#121212', '#1C1C1C', '#252525' ],
  secondaryDarkGradient: [ '#121212', '#222223', '#323233' ],
  reverseDarkGradient: [
    'rgba(18, 18, 18, 0)',
    'rgba(18, 18, 18, 0.1)',
    'rgba(18, 18, 18, 0.2)',
    'rgba(18, 18, 18, 0.4)',
    'rgba(18, 18, 18, 0.5)',
    'rgba(18, 18, 18, 0.5)',
    'rgba(18, 18, 18, 0.7)',
    'rgba(18, 18, 18, 1)',
    'rgba(18, 18, 18, 1)',
    'rgba(18, 18, 18, 1)',
    'rgba(18, 18, 18, 1)',
  ]
}
