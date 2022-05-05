import { SimpleActionStoreModel } from "./simple-action-store"

test("can be created", () => {
  const instance = SimpleActionStoreModel.create({})

  expect(instance).toBeTruthy()
})
