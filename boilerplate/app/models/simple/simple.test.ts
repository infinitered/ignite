import { SimpleModel } from "./simple"

test("can be created", () => {
  const instance = SimpleModel.create({})

  expect(instance).toBeTruthy()
})
