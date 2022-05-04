import { ViewStyle } from 'react-native'
import { spacing } from '../../theme'

/**
 * The default style of the container.
 */
const ROOT: ViewStyle = {
  paddingTop: spacing[5],
}

/**
 * What each of the presets look like.
 */
export const PRESETS = {

  smallRow: {
    ...ROOT,
    paddingTop: spacing[4],
  },
  /**
   * Rounded borders on the the top only.
   */
  row: {
    ...ROOT,
  },
  bigRow: {
    ...ROOT,
    paddingTop: spacing[7],
  },
  /**
   * Transparent borders useful to keep things lined up.
   */
  clear: {
    paddingVertical: spacing[0],
  },
}

/**
 * The names of the presets supported by FormRow.
 */
export type FormRowPresets = keyof typeof PRESETS
