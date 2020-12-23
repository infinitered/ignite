import { withStatus } from "./with-status"
import { types } from "mobx-state-tree"
import { reaction, isObservableProp } from "mobx"

const ThingModel = types
  .model("Thing")
  .props({
    name: "",
    age: 1000,
  })
  .extend(withStatus)
  .actions((self) => ({
    switchToError() {
      self.status = "error"
    },
  }))

it("starts off as idle", () => {
  const thing = ThingModel.create()
  expect(thing.status).toBe("idle")
})

it("can be set", () => {
  const thing = ThingModel.create()
  thing.setStatus("pending")
  expect(thing.status).toBe("pending")
})

it("is an observable property", async () => {
  const thing = ThingModel.create()
  expect(isObservableProp(thing, "status")).toBe(true)
})

it("can be synchronously observed", () => {
  const thing = ThingModel.create()
  let changed: string
  reaction(
    () => thing.status,
    (value) => {
      changed = value
    },
  )
  thing.setStatus("done")
  expect(changed).toBe("done")
  expect(thing.status).toBe("done")
})

it("has a setter", () => {
  const thing = ThingModel.create()
  thing.switchToError()
  expect(thing.status).toBe("error")
  thing.status = "pending"
  expect(thing.status).toBe("pending")
})
