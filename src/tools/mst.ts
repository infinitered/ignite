export const MST_MARKUP_PREFIX = "@mst"

export const mstDependenciesToRemove = [
  "mobx",
  "mobx-react-lite",
  "mobx-state-tree",
  "reactotron-mst",
]

export const mstCommentRegex = /(\/\/|#)\s*@mst.*|{?\/.*@mst.*\/}?/gm
