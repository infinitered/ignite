import { PaginationModel } from "./pagination"

test("can be created", () => {
  const instance = PaginationModel.create({})

  expect(instance).toBeTruthy()
})
