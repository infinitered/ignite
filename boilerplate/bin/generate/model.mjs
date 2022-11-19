#!/usr/bin/env zx
import "zx/globals"
import { insert, update } from "../tools/patch.mjs"
import { camelCase, prettier } from "../tools/string.mjs"
import { dir } from "../tools/path.mjs"

const name = await question("Model name? ")
const fileName = name;
const ext = "ts";

const file = prettier(
  /*ts*/ `
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const NameModel = types
  .model("Name")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Name extends Instance<typeof NameModel> {}
export interface NameSnapshotOut extends SnapshotOut<typeof NameModel> {}
export interface NameSnapshotIn extends SnapshotIn<typeof NameModel> {}
export const createNameDefaultModel = () => types.optional(NameModel, {})
`,
  { Name: name },
)
await fs.writeFile(dir.models(`${fileName}.${ext}`), file)

await update(dir.models("index.ts"), (file) => file + `export * from "./${fileName}"` + "\n")

if (!name.endsWith("Store")) {
  process.exit(0)
}

await update(
  dir.models("RootStore.ts"),
  (file) =>
    insert(file, `"mobx-state-tree"`, (s) => s + `\n` + `import { ${name}Model } from "./${fileName}"`),
  (file) =>
    insert(
      file,
      `types.model("RootStore").props({`,
      (s) => s + `\n` + `  ${camelCase(name)}: types.optional(${name}Model, {}),`,
    ),
)
