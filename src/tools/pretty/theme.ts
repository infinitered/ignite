import { print } from "gluegun"
import type { PackagerName } from "../packager"

const { white, bold, red, bgRed, bgWhite } = print.colors
const { underline } = print.colors

export const link = (m = "") => underline(white(m))

export const em = (m = "") => bold(white(m))

export const ir = (m = "") => bgRed(bold(white(m)))

export const highlight = (m = "") => bold(bgWhite(red(m)))

export const pkgBgColor = (packagerName: PackagerName) => {
  const packagerColors: Record<PackagerName, keyof typeof print.colors> = {
    npm: "bgRed",
    yarn: "bgBlue",
    pnpm: "bgYellow",
  }
  return print.colors[packagerColors[packagerName]] as (text: string) => string
}

export const theme = {
  em,
  highlight,
  link,
  ir,
}
