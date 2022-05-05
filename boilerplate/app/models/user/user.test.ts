import { UserModel } from "./user"

test("can be created", () => {
  const instance = UserModel.create({})

  expect(instance).toBeTruthy()
})
