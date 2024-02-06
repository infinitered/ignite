---
sidebar_position: 1
---

# Ignite's Boilerplate

:::tip
A "boilerplate" project is one that you can use as a starting point for your own project.
:::

At its heart, Ignite is a boilerplate. Rather than using a basic template from something like react-native-cli or Expo, Ignite is more full-featured and opinionated. However, it still really customizable -- after all, we have many different types of projects we work on and don't want to be painted into a corner either.

When you [spin up a new Ignite project](../Guide.md), you'll get a project with several folders. Feel free to explore each one and see what's inside.

## Explanation of the Ignite folder structure

A new Ignite boilerplate project's structure looks similar to this:

```
your-project
├── .maestro
├── android
├── ios
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
├── test
│   ├── __snapshots__
│   ├── mock-i18n.ts
│   ├── mock-reactotron.ts
│   ├── setup.ts
├── ignite
│   └── templates
├── plugins
│   └── withSplashScreen.ts
├── app.config.ts
├── app.json
├── App.tsx
├── eas.json
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

This is where your components will live, the reusable building blocks to create your screens. A handful of built-in components come with Ignite that are adaptable to any custom design system you wish to implement. Below are links to further documentation about each component:

- [Component Overview](../)
- [AutoImage](../boilerplate/app/components/AutoImage.md)
- [Button](../boilerplate/app/components/Button.md)
- [Card](../boilerplate/app/components/Card.md)
- [EmptyState](../boilerplate/app/components/EmptyState.md)
- [Header](../boilerplate/app/components/Header.md)
- [Icon](../boilerplate/app/components/Icon.md)
- [ListItem](../boilerplate/app/components/ListItem.md)
- [ListView](../boilerplate/app/components/ListView.md)
- [Screen](../boilerplate/app/components/Screen.md)
- [Text](../boilerplate/app/components/Text.md)
- [TextField](../boilerplate/app/components/TextField.md)
- [Toggle](../boilerplate/app/components/Toggle.md)

**i18n**

This is where your translations will live if you are using the included `react-native-i18n`.

**models**

This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc. In addition, a helpers directory contains utility functions such as `getRootStore` to access the root store.

**navigators**

This is where your `react-navigation` navigators will live.

**screens**

This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**

Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**

Here lives the theme for your application, including spacing, colors, and typography. For help with adding custom fonts to your application, [check out the readme in Fonts & Typography/](../boilerplate/app/theme/typography.ts.md).

**utils**

This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truely shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.json/app.config.ts**

These are the configuration files for your application. `app.json` contains the static configuration which will be fed into the dynamic configuration in `app.config.ts`, where Expo builds it's final configuration for the app.

**App.tsx**

This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

### ./ignite directory

The `ignite` directory stores all things Ignite, including generator templates.

### ./plugins directory

The `plugins` directory stores any custom Expo Config Plugins you want to be applied during the prebuild process when generating the native code for the project.

### ./test directory

This directory will hold your Jest configs and mocks.
