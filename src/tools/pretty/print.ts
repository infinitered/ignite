import { print } from "gluegun"
import { INDENT } from "./indent"
import { asset, AssetName } from "../../assets"

const { gray, white, bold, red, yellow } = print.colors

export const p = (m = "") => print.info(gray(INDENT + m))

export const heading = (m = "") => p(white(bold(m)))

export const command = (
  m: string | { m: string; width: number } = "",
  second = "",
  examples: string[] = [],
) => {
  m = typeof m === "string" ? m : m.m + " ".repeat(m.width - m.m.length)
  p(white(m) + "  " + gray(second))
  const indent = m.length + 2
  if (examples) {
    examples.forEach((ex) => p(gray(" ".repeat(indent) + white(ex))))
  }
}

export const direction = (m = "") => p(red(m))

export const warning = (m = "") => p(yellow(m))

export const igniteHeading = () =>
  p(
    red(
      bold(
        "· · · · · · · · · · · · · · · · · · 🔥 Ignite 🔥 · · · · · · · · · · · · · · · · · ·\n",
      ),
    ),
  )

export const ascii = (assetname: AssetName) =>
  console.log(
    asset
      .get(assetname)
      .split("\n")
      .map((line) => INDENT + line)
      .join("\n"),
  )

export const hr = () => p(` ────────────────────────────────────────────────────`)

export const prettyprint = {
  ascii,
  command,
  direction,
  heading,
  hr,
  igniteHeading,
  p,
  warning,
}
