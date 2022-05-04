import { ImageModel } from "./image"

test("can be created", () => {
  const instance = ImageModel.create({})

  expect(instance).toBeTruthy()
})
