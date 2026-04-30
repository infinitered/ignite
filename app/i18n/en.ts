const en = {
  common: {
    ok: 'OK',
    cancel: 'Cancel',
    back: 'Back',
    retry: 'Retry',
    save: 'Save',
  },
  errorScreen: {
    title: 'Something went wrong',
    friendlySubtitle:
      'We had an unexpected hiccup. Please try again, or restart the app if the problem persists.',
    reset: 'Restart',
  },
  emptyStateComponent: {
    generic: {
      heading: 'Nothing here yet',
      content: 'No data found yet. Try refreshing or come back later.',
      button: 'Try again',
    },
  },
  errors: {
    invalidEmail: 'Please enter a valid email address.',
    required: 'This field is required.',
    network: 'You appear to be offline. Check your connection and try again.',
    offline: 'You are offline. Some features may be unavailable.',
    loadFailed: "Couldn't load. Please try again.",
  },
  example: {
    title: 'Example',
    counter: 'Counter: {{count}}',
    increment: 'Increment',
    reset: 'Reset',
    fetchedPosts: 'Posts',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    submit: 'Submit',
    submitted: 'Form submitted',
  },
};

export default en;
export type Translations = typeof en;
