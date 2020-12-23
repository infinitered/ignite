import { observable, IObservableValue } from "mobx"

export type StatusType = "idle" | "pending" | "done" | "error"

/**
 * Adds a status field to the model often for tracking api access.
 *
 * This property is a string which can be observed, but will not
 * participate in any serialization.
 *
 * Use this to extend your models:
 *
 * ```ts
 *   types.model("MyModel")
 *     .props({})
 *     .actions(self => ({}))
 *     .extend(withStatus) // <--- time to shine baby!!!
 * ```
 *
 * This will give you these 3 options:
 *
 *   .status            // returns a string
 *   .status = "done"   // change the status directly
 *   .setStatus("done") // change the status and trigger an mst action
 */
export const withStatus = () => {
  /**
   * The observable backing store for the status field.
   */
  const status: IObservableValue<string> = observable.box("idle")

  return {
    views: {
      // a getter
      get status() {
        return status.get() as StatusType
      },
      // as setter
      set status(value: StatusType) {
        status.set(value)
      },
    },
    actions: {
      /**
       * Set the status to something new.
       *
       * @param value The new status.
       */
      setStatus(value: StatusType) {
        status.set(value)
      },
    },
  }
}
