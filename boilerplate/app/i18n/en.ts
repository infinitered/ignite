const en = {
  common: {
    ok: 'OK!',
    cancel: 'Cancel',
    back: 'Back',
    logOut: 'Log Out',
    hello: 'Hello',
    lang: 'En/Zh',
    yes: 'Yes',
    no: 'No',
  },
  validationErrors: {
    empty: "can't be blank",
    onlyLetters: 'must contain only letters',
    invalidName: 'must be at least 2 characters',
    invalidEmail: 'must be a valid email address',
    invalidEmailLength: 'must be at least 6 characters',
    invalidPassword: 'must be at least 12 characters',
    invalidPasswordLowercase: 'must contain at least one lowercase letter',
    invalidPasswordUppercase: 'must contain at least one uppercase letter',
    invalidPasswordNumber: 'must contain at least one number',
    invalidPasswordSpecial: 'must contain at least one special character',
  },
  errorScreen: {
    title: 'Something went wrong!',
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: 'RESET APP',
    traceTitle: 'Error from %{name} stack',
  },
  errors: {
    invalidEmail: 'Invalid email address.',
  },
  homeScreen: {
    addItem: 'Add Item',
    itemName: 'Item Name',
    itemDescription: 'Item Description',
    itemNamePlaceholder: 'Enter item name',
    itemDescriptionPlaceholder: 'Enter item description',
    removeItem: 'Are you sure you want to remove this item?',
    createdOn: 'Created on',
  },
  loginScreen: {
    logIn: 'Log In',
    enterDetails:
      'Enter your details below to access Spacebox React Native app.',
    emailFieldLabel: 'Email',
    passwordFieldLabel: 'Password',
    firstNameFieldLabel: 'First Name',
    lastNameFieldLabel: 'Last Name',
    emailFieldPlaceholder: 'Enter your email address',
    passwordFieldPlaceholder: 'Super secret password here',
    firstNameFieldPlaceholder: 'Enter your first name',
    lastNameFieldPlaceholder: 'Enter your last name',
    tapToLogIn: 'Tap to log in!',
  },
};

export default en;
export type Translations = typeof en;
