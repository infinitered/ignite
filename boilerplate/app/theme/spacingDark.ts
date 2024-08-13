const SPACING_MULTIPLIER = 1.0

// This is an example of how you can have different spacing values for different themes.
export const spacing = {
  xxxs: 2 * SPACING_MULTIPLIER,
  xxs: 4 * SPACING_MULTIPLIER,
  xs: 8 * SPACING_MULTIPLIER,
  sm: 12 * SPACING_MULTIPLIER,
  md: 16 * SPACING_MULTIPLIER,
  lg: 24 * SPACING_MULTIPLIER,
  xl: 32 * SPACING_MULTIPLIER,
  xxl: 48 * SPACING_MULTIPLIER,
  xxxl: 64 * SPACING_MULTIPLIER,
} as const
