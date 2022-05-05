import { SimpleStoreModel } from "./simple-store"

test("can be created", () => {
  const instance = SimpleStoreModel.create({})

  expect(instance).toBeTruthy()
})
