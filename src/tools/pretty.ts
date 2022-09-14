import { print } from "gluegun"
import { asset, AssetName } from "../assets"
import type { PackagerName } from "./packager"

const { bgRed, bgWhite, underline, gray, white, bold, red, yellow } = print.colors

export const INDENT = "   "

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

export const ascii = (assetname: AssetName) => {
  console.log(
    asset
      .get(assetname)
      .split("\n")
      .map((line) => INDENT + line)
      .join("\n"),
  )
}

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

/**
 * enquirer style customization
 * @see https://github.dev/enquirer/enquirer/blob/36785f3399a41cd61e9d28d1eb9c2fcd73d69b4c/examples/select/option-elements.js#L19
 */
export const prefix = (state: { status: "pending" | "submitted" | "canceled" }): string => {
  return {
    pending: "📝",
    submitted: "✅",
    cancelled: "❌",
  }[state.status]
}

/** Format displayed messages for prompts */
export const format = {
  /** Format boolean values for human on prompts  */
  boolean: (value: string): string | Promise<string> => {
    return value ? "Yes" : "No"
  },
}

export const prettyPrompt = {
  prefix,
  format,
}

type Spinner = ReturnType<typeof print.spin>
const spinners: { [key: string]: Spinner } = {}

export const startSpinner = (m = "") => {
  let spinner = spinners[m]
  if (!spinner) {
    spinner = print.spin({ prefixText: INDENT, text: gray(m) })
    spinners[m] = spinner
  }
  return spinner
}

export const stopSpinner = (m: string, symbol: string) => {
  const spinner = spinners[m]
  if (spinner) {
    spinner.stopAndPersist({ symbol })
    delete spinners[m]
  }
}

export const clearSpinners = () => {
  Object.keys(spinners).forEach((m) => {
    spinners[m].stop()
    delete spinners[m]
  })
}

export const spinner = {
  start: startSpinner,
  stop: stopSpinner,
  clear: clearSpinners,
} as const

export const link = (m = "") => underline(white(m))

export const em = (m = "") => bold(white(m))

export const ir = (m = "") => bgRed(bold(white(m)))

export const highlight = (m = "") => bold(bgWhite(red(m)))

export const pkgColor = (packagerName: PackagerName) => {
  const packagerColors: Record<PackagerName, keyof typeof print.colors> = {
    npm: "red",
    yarn: "blue",
    pnpm: "yellow",
  }
  return print.colors[packagerColors[packagerName]] as (text: string) => string
}

export const theme = {
  em,
  highlight,
  link,
  ir,
}
