# Explanation of folder structure

A new Ignite boilerplate project's structure looks similar to this:

```
ignite-project
├── android (if not Expo)
├── ios (if not Expo)
├── app
│   ├── components
│   ├── i18n
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── theme
│   ├── utils
│   ├── app.tsx
|   ├── assets/fonts/
├── storybook
│   ├── views
│   ├── index.ts
│   ├── storybook-registry.ts
│   ├── storybook.ts
├── test
│   ├── __snapshots__
│   ├── storyshots.test.ts.snap
│   ├── mock-i18n.ts
│   ├── mock-reactotron.ts
│   ├── setup.ts
│   ├── storyshots.test.ts
├── e2e
│   └── config.json
├── ignite
│   └── templates
├── index.js
├── package.json
└── README.md
```

### ./app directory

Included in an Ignite boilerplate project is the `app` directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the `app` directory looks similar to the following:

```
app
│── components
│── i18n
├── models
├── navigators
├── screens
├── services
├── theme
├── utils
├── app.tsx
```

**components**

This is where your basic components will live. Each component will have a directory containing the `.tsx` file, along with a story file, and optionally `.presets`, and `.props` files for larger components. The app will come with some commonly used components like Button.

**i18n**

This is where your translations will live if you are using the included `react-native-i18n`.

**models**

This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc. There's also an extensions directory with useful shared extensions that you can include in your models like `.extend(withEnvironment)` to access the environment. In addition, a helpers directory contains utility functions such as `getRootStore` to access the root store.

**navigators**

This is where your `react-navigation` navigators will live.

For a walkthrough about how React Navigation v5 works, check out Harris Robin's post: [Getting Started with the New React Navigation v5 and Ignite Bowser v5](https://shift.infinite.red/getting-started-with-the-new-react-navigation-v5-and-ignite-bowser-v5-31fb4a57f2b9).

**screens**

This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**

Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**

Here lives the theme for your application, including spacing, colors, and typography. For help with adding custom fonts to your application, [check out the readme in ./assets/fonts/](./boilerplate/assets/fonts/custom-fonts.md).

**utils**

This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truely shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx**

This is the entry point to your app. This is where you will find the main App component which renders the rest of the application. This is also where you will specify whether you want to run the app in storybook mode.

### ./ignite directory

The `ignite` directory stores all things Ignite, including generator templates.

### ./storybook directory

This is where your stories will be registered and where the Storybook configs will live

### ./test directory

This directory will hold your Jest configs and mocks, as well as your [storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) test file. This is a file that contains the snapshots of all your component storybooks.
