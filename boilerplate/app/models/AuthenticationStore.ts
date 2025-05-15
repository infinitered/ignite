import { translate } from '@/i18n';
import { Instance, SnapshotOut, types } from 'mobx-state-tree';

function validateName(name: string) {
  if (name.length === 0) return translate('validationErrors:empty');
  if (name.length < 2) return translate('validationErrors:invalidName');
  if (!/^[a-zA-Z]+$/.test(name)) {
    return translate('validationErrors:onlyLetters');
  }
  return '';
}

export const AuthenticationStoreModel = types
  .model('AuthenticationStore')
  .props({
    authToken: types.maybe(types.string),
    userId: types.maybe(types.string),
    authFirstName: '',
    authLastName: '',
    authEmail: '',
    authPassword: '',
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken;
    },
    get validationFirstNameError() {
      return validateName(store.authFirstName);
    },
    get validationLastNameError() {
      return validateName(store.authLastName);
    },

    get validationPasswordError() {
      if (store.authPassword?.length === 0) {
        return translate('validationErrors:empty');
      }
      if (store.authPassword?.length < 12)
        return translate('validationErrors:invalidPassword');
      if (!/[a-z]/.test(store.authPassword))
        return translate('validationErrors:invalidPasswordLowercase');
      if (!/[A-Z]/.test(store.authPassword))
        return translate('validationErrors:invalidPasswordUppercase');
      if (!/[0-9]/.test(store.authPassword))
        return translate('validationErrors:invalidPasswordNumber');
      if (!/[^a-zA-Z0-9]/.test(store.authPassword))
        return translate('validationErrors:invalidPasswordSpecial');
      return '';
    },
    get validationEmailError() {
      if (store.authEmail.length === 0) {
        return translate('validationErrors:empty');
      }
      if (store.authEmail.length < 6) {
        return translate('validationErrors:invalidEmailLength');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return translate('validationErrors:invalidEmail');
      return '';
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value;
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, '');
    },
    setUserId(value: string) {
      store.userId = value;
    },
    setAuthFirstName(value: string) {
      store.authFirstName = value;
    },
    setAuthLastName(value: string) {
      store.authLastName = value;
    },
    setAuthPassword(value: string) {
      // This is a placeholder for setting the password
      store.authPassword = value;
    },
    logout() {
      store.authToken = undefined;
      store.authEmail = '';
      store.authFirstName = '';
      store.authLastName = '';
      store.authPassword = '';
    },
  }));

// export interface AuthenticationStore
//   extends Instance<typeof AuthenticationStoreModel> {}
// export interface AuthenticationStoreSnapshot
//   extends SnapshotOut<typeof AuthenticationStoreModel> {}
