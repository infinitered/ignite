export { GluegunCommand, GluegunToolbox } from "gluegun"

export type CLIType = "ignite-classic" | "react-native-cli" | "expo-cli" | "create-react-native-app"

export type CLIOptions = {
  cli: CLIType
  template: string
}

export type CookbookRecipe = {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
  _links: {
    self: string
    git: string
    html: string
  }
  // added later by us
  contents?: string
  title?: string
  description?: string
  tags?: string
  lastUpdate?: string
  author?: string
  publishDate?: string
}
