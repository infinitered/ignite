import { filesystem } from "gluegun"
import * as tempy from "tempy"
import { runIgnite } from "../_test-helpers"

const BOILERPLATE_PATH = filesystem.path(__dirname, "../../boilerplate")

const setup = (): { TEMP_DIR: string } => {
  const TEMP_DIR = tempy.directory({ prefix: "ignite-" })

  beforeEach(() => {
    filesystem.copy(BOILERPLATE_PATH, TEMP_DIR, { overwrite: true })
  })

  afterEach(() => {
    filesystem.remove(TEMP_DIR) // clean up our mess
  })

  return { TEMP_DIR }
}

const { read } = filesystem

describe("ignite-cli generate", () => {
  const { TEMP_DIR } = setup()
  const options = {
    pre: `cd ${TEMP_DIR}`,
    post: `cd ${process.cwd()}`,
  }

  /**
   * "/user/home/ignite" replaces the temp directory, so we don't get failures when it changes every test run
   * @returns command output with temp directory replaced
   */
  const replaceHomeDir = (result: string, { mock = "/user/home/ignite", temp = TEMP_DIR } = {}) =>
    result.replace(new RegExp(temp, "g"), mock)

  describe("model", () => {
    it("should generate Pizza model and test, patch index model export, and not patch RootStore", async () => {
      const result = await runIgnite(`generate model Pizza`, options)

      expect(replaceHomeDir(result)).toMatchInlineSnapshot(`
        "   
           
           Generated new files:
           /user/home/ignite/app/models/Pizza.test.ts
           /user/home/ignite/app/models/Pizza.ts
        "
      `)
      expect(read(`${TEMP_DIR}/app/models/Pizza.ts`)).toMatchInlineSnapshot(`
        "import { Instance, SnapshotIn, SnapshotOut, types } from \\"mobx-state-tree\\"
        import { withSetPropAction } from \\"./helpers/withSetPropAction\\"

        /**
         * Model description here for TypeScript hints.
         */
        export const PizzaModel = types
          .model(\\"Pizza\\")
          .props({})
          .actions(withSetPropAction)
          .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
          .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

        export interface Pizza extends Instance<typeof PizzaModel> {}
        export interface PizzaSnapshotOut extends SnapshotOut<typeof PizzaModel> {}
        export interface PizzaSnapshotIn extends SnapshotIn<typeof PizzaModel> {}
        export const createPizzaDefaultModel = () => types.optional(PizzaModel, {})
        "
      `)
      expect(read(`${TEMP_DIR}/app/models/Pizza.test.ts`)).toMatchInlineSnapshot(`
        "import { PizzaModel } from \\"./Pizza\\"

        test(\\"can be created\\", () => {
          const instance = PizzaModel.create({})

          expect(instance).toBeTruthy()
        })
        "
      `)
      expect(read(`${TEMP_DIR}/app/models/index.ts`)).toMatchInlineSnapshot(`
        "export * from \\"./RootStore\\"
        export * from \\"./helpers/getRootStore\\"
        export * from \\"./helpers/useStores\\"
        export * from \\"./helpers/setupRootStore\\"
        export * from \\"./Pizza\\"
        "
      `)
      expect(read(`${TEMP_DIR}/app/models/RootStore.ts`)).toEqual(
        read(`${BOILERPLATE_PATH}/app/models/RootStore.ts`),
      )
    })

    it("should generate PizzaStore model and test, patch index model export and RootStore", async () => {
      const result = await runIgnite(`generate model PizzaStore`, options)

      expect(replaceHomeDir(result)).toMatchInlineSnapshot(`
        "   
           
           Generated new files:
           /user/home/ignite/app/models/PizzaStore.test.ts
           /user/home/ignite/app/models/PizzaStore.ts
        "
      `)
      expect(read(`${TEMP_DIR}/app/models/PizzaStore.ts`)).toMatchInlineSnapshot(`
        "import { Instance, SnapshotIn, SnapshotOut, types } from \\"mobx-state-tree\\"
        import { withSetPropAction } from \\"./helpers/withSetPropAction\\"

        /**
         * Model description here for TypeScript hints.
         */
        export const PizzaStoreModel = types
          .model(\\"PizzaStore\\")
          .props({})
          .actions(withSetPropAction)
          .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
          .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

        export interface PizzaStore extends Instance<typeof PizzaStoreModel> {}
        export interface PizzaStoreSnapshotOut extends SnapshotOut<typeof PizzaStoreModel> {}
        export interface PizzaStoreSnapshotIn extends SnapshotIn<typeof PizzaStoreModel> {}
        export const createPizzaStoreDefaultModel = () => types.optional(PizzaStoreModel, {})
        "
      `)
      expect(read(`${TEMP_DIR}/app/models/PizzaStore.test.ts`)).toMatchInlineSnapshot(`
        "import { PizzaStoreModel } from \\"./PizzaStore\\"

        test(\\"can be created\\", () => {
          const instance = PizzaStoreModel.create({})

          expect(instance).toBeTruthy()
        })
        "
      `)
      expect(read(`${TEMP_DIR}/app/models/index.ts`)).toMatchInlineSnapshot(`
        "export * from \\"./RootStore\\"
        export * from \\"./helpers/getRootStore\\"
        export * from \\"./helpers/useStores\\"
        export * from \\"./helpers/setupRootStore\\"
        export * from \\"./PizzaStore\\"
        "
      `)
      expect(read(`${TEMP_DIR}/app/models/RootStore.ts`)).toMatchInlineSnapshot(`
        "import { Instance, SnapshotOut, types } from \\"mobx-state-tree\\"
        import { PizzaStoreModel } from \\"./PizzaStore\\"
        import { AuthenticationStoreModel } from \\"./AuthenticationStore\\" // @demo remove-current-line
        import { EpisodeStoreModel } from \\"./EpisodeStore\\" // @demo remove-current-line

        /**
         * A RootStore model.
         */
        export const RootStoreModel = types.model(\\"RootStore\\").props({
          pizzaStore: types.optional(PizzaStoreModel, {} as any),
          authenticationStore: types.optional(AuthenticationStoreModel, {}), // @demo remove-current-line
          episodeStore: types.optional(EpisodeStoreModel, {}), // @demo remove-current-line
        })

        /**
         * The RootStore instance.
         */
        export interface RootStore extends Instance<typeof RootStoreModel> {}
        /**
         * The data of a RootStore.
         */
        export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
        "
      `)
    })
  })
})
