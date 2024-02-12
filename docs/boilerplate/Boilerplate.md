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
├── app
│   ├── components
│   ├── config
│   ├── devtools
│   ├── i18n
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── theme
│   ├── utils
│   ├── app.tsx
├── assets
├── ignite
│   └── templates
├── ios
├── plugins
│   └── withSplashScreen.ts
├── test
│   ├── i18n.test.ts
│   ├── mockFile.ts
│   ├── setup.ts
│   ├── test-tsconfig.json
├── app.config.ts
├── app.json
├── App.tsx
├── eas.json
├── package.json
└── README.md
```

### ./app directory

The vast majority of your code will live in the [/app folder](./app/app.md). This is where you'll spend most of your time.

**[components](./app/components/Components.md)**

This is where your components will live, the reusable building blocks to create your screens. A handful of built-in components come with Ignite that are adaptable to any custom design system you wish to implement.

**[config](./app/config/Config.md)**

This contains configuration for your app that might vary depending if you're running in development or production.

**[devtools](./app/devtools/Devtools.md)**

This is where setup and configuration of devtools like Reactotron occurs.

**[i18n (Internationalization)](./app/i18n/Internationalization.md)**

This is where your translations will live if you are using the included `react-native-i18n`.

**[models](./app/models/Models.md)**

This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc. In addition, a helpers directory contains utility functions such as `getRootStore` to access the root store.

**[navigators](./app/navigators/Navigation.md)**

This is where your `react-navigation` navigators will live.

**[screens](./app/screens/Screens.md)**

This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**[services](./app/services/Services.md)**

Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**[theme](./app/theme/Theming.md)**

Here lives the theme for your application, including spacing, colors, and typography.

- For help with adding custom fonts to your application, check out [Fonts & Typography](../boilerplate/app/theme/typography.ts.md).

**[utils](./app/utils/Utils.md)**

This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truely shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**[app.tsx](./app/app.tsx.md)**

The main entry point for your app!

### Root Directory

#### Directories

**[.maestro](./maestro.md)** - Maestro e2e tests

**[android](./android.md)** - Native Android / Android Studio project files for DIY workflows (non-Expo)

**[assets](./assets.md)** - icons and images

**[ignite](./ignite.md)** - all things Ignite, including generator templates.

**[ios](./ios.md)** - Native iOS / Xcode project files for DIY workflows (non-Expo)

**[plugins](./plugins/Plugins.md)** - any custom Expo Config Plugins to be applied during the prebuild process when generating the native code for the project.

**[test](./test/Test.md)** - Jest configs and mocks

#### Files

**[app.json/app.config.ts](./app.json.md)** - configuration files for your app. `app.json` contains the static configuration which will be fed into the dynamic configuration in `app.config.ts`, where Expo builds it's final configuration for the app.

**[App.tsx](./App.tsx.md)** - entry point to your app. This is where you will find the main App component which renders the rest of the application.

**[eas.json](./eas.json.md)** - build configurations for Expo EAS builds
