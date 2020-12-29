import { getEnv, IStateTreeNode } from "mobx-state-tree"
import { Environment } from "../environment"

/**
 * Adds a environment property to the node for accessing our
 * Environment in strongly typed.
 */
export const withEnvironment = (self: IStateTreeNode) => ({
  views: {
    /**
     * The environment.
     */
    get environment() {
      return getEnv<Environment>(self)
    },
  },
})
