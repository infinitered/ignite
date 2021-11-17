import { print } from "gluegun"

const { cyan, gray, white, bold, red, yellow } = print.colors
const { underline } = print.colors

type Spinner = ReturnType<typeof print.spin>
const spinners: { [key: string]: Spinner } = {}

export const p = (m = "") => print.info(gray(`   ${m}`))

export const startSpinner = (m = "") => {
  let spinner = spinners[m]
  if (!spinner) {
    spinner = print.spin({ prefixText: "   ", text: gray(m) })
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

export const heading = (m = "") => p(white(bold(m)))

export const link = (m = "") => underline(white(m))

// export const igniteHeading = (m = "") => p(red(bold(m)))

export const igniteHeading = () =>
  p(
    red(
      bold(
        "· · · · · · · · · · · · · · · · · · 🔥 Ignite 🔥 · · · · · · · · · · · · · · · · · ·\n",
      ),
    ),
  )

export const command = (m = "", second = "", examples: string[] = []) => {
  p(white(m) + "  " + gray(second))
  const indent = m.length + 2
  if (examples) {
    examples.forEach((ex) => p(gray(" ".repeat(indent) + ex)))
  }
}

export const direction = (m = "") => p(cyan(m))

export const warning = (m = "") => p(yellow(m))
