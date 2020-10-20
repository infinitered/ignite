import { print } from "gluegun/print"

const { cyan, gray, white, bold, red, yellow } = print.colors

export const p = (m = "") => print.info(gray(`   ${m}`))
export const heading = (m = "") => p(white(bold(m)))
export const igniteHeading = (m = "") => p(red(bold(m)))
export const command = (m = "", second = "", examples: string[] = []) => {
  p(white(m) + "  " + gray(second))
  const indent = m.length + 2
  if (examples) {
    examples.forEach((ex) => p(gray(" ".repeat(indent) + ex)))
  }
}
export const direction = (m = "") => p(cyan(m))
export const warning = (m = "") => p(yellow(m))
