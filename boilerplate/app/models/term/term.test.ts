import { TermModel } from "./term"

test("can be created", () => {
  const instance = TermModel.create({})

  expect(instance).toBeTruthy()
})
