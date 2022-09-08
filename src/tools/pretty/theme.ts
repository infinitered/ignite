import { print } from "gluegun"

const { white, bold, bgRed } = print.colors
const { underline } = print.colors

export const link = (m = "") => underline(white(m))

export const em = (m = "") => bold(white(m))

export const ir = (m = "") => bgRed(bold(white(m)))

export const theme = {
  em,
  link,
  ir,
}
