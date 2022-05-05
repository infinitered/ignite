import { ApiErrorModel } from "./api-error"

test("can be created", () => {
  const instance = ApiErrorModel.create({})

  expect(instance).toBeTruthy()
})
