export const DEMO_MARKUP_PREFIX = "@demo"

export const demoDependenciesToRemove = [
  "@react-navigation/bottom-tabs",
  "expo-application",
  "react-native-drawer-layout",
]

export const demoCommentRegex = /(\/\/|#)\s*@demo.*|{?\/.*@demo.*\/}?/gm
