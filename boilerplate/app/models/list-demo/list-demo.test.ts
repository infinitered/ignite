import { ListDemoModel } from "./list-demo"

test("can be created", () => {
  const instance = ListDemoModel.create({})

  expect(instance).toBeTruthy()
})
