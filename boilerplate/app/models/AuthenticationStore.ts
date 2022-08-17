import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: types.optional(types.string, ""),
    authPassword: types.optional(types.string, ""),
  })
  .views((self) => ({
    get isAuthenticated() {
      return !!self.authToken
    },
    get validationErrors() {
      return {
        authEmail: (function () {
          if (self.authEmail.length === 0) return "can't be blank"
          if (self.authEmail.length < 6) return "must be at least 6 characters"
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(self.authEmail))
            return "must be a valid email address"
          return ""
        })(),
        authPassword: (function () {
          if (self.authPassword.length === 0) return "can't be blank"
          if (self.authPassword.length < 6) return "must be at least 6 characters"
          return ""
        })(),
      }
    },
  }))
  .actions((self) => ({
    setAuthToken(value?: string) {
      self.authToken = value
    },
    setAuthEmail(value: string) {
      self.authEmail = value.replace(/ /g, "")
    },
    setAuthPassword(value: string) {
      self.authPassword = value.replace(/ /g, "")
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
