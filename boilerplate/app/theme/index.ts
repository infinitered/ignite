import { colors as colorsLight } from "./colors"
import { colors as colorsDark } from "./colorsDark"
import { spacing as spacingLight } from "./spacing"

// Export the theme objects with backwards compatibility for the old theme structure.
export { colorsLight as colors }
export { colorsDark }
export { spacingLight as spacing }

export * from "./types.d"
export * from "./theme"
export * from "./context"

export * from "./styles"
export * from "./typography"
export * from "./timing"
