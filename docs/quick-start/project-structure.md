# Project Structure

When creating a new React Native project with Ignite CLI, your project will include a number of nested files and folders. This structure is one the React Native best practices included with Ignite's default boilerplate. With this structure, your project already has a head start. Let's take a closer look at Ignite's default structure and explain how to leverage its benefits.

_NOTE: If you're using a different boilerplate, your project structure will likely look quite different._

## Ignite Boilerplate Structure vs Vanilla React Native Structure

First let's take a look at a "Vanilla" React Native project's structure. To start, navigate to directory you'd like to create a new React Native project and run the `react-native init` command to create a project without Ignite.

```
cd projects
react-native init VanillaProject
cd VanillaProject
```

Your new React Native project should have a file structure similar to the following:

```
VanillaProject
├── __tests__
│   ├── index.android.js
│   └── index.ios.js
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── app.json
├── index.android.js
├── index.ios.js
├── ios
│   ├── VanillaProject
│   ├── VanillaProject-tvOS
│   ├── VanillaProject-tvOSTests
│   ├── VanillaProject.xcodeproj
│   ├── VanillaProjectTests
│   └── build
└── package.json
```

Now create a new Ignite boilerplate project and lets compare the folder structure:

Note: TODO: Maybe like what options we select when creating a new Ignite boilerplate project?

```
cd ..
ignite new IgniteProject
cd IgniteProject
```

The Ignite boilerplate project's structure will look similar to this:

```
IgniteProject
├── App
│   ├── Components
│   ├── Config
│   ├── Containers
│   ├── Fixtures
│   ├── Images
│   ├── Lib
│   ├── Navigation
│   ├── Redux
│   ├── Sagas
│   ├── Services
│   ├── Themes
│   └── Transforms
├── README.md
├── __tests__
│   ├── index.android.js
│   └── index.ios.js
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   ├── ignite.json
│   └── plugins
├── index.android.js
├── index.ios.js
├── ios
│   ├── IgniteProject
│   ├── IgniteProject-tvOS
│   ├── IgniteProject-tvOSTests
│   ├── IgniteProject.xcodeproj
│   └── IgniteProjectTests
└── package.json
```

## App directory

Included in an Ignite boilerplate project is the App directory. This is a directory you would normal have to create when using vanilla React Native.

The inside of the App directory looks similar to the following:

```
App
├── Components
│   └── Styles
├── Config
├── Containers
│   └── Styles
├── Fixtures
├── Images
├── Lib
├── Navigation
│   └── Styles
├── Redux
├── Sagas
├── Services
├── Themes
└── Transforms
```

**Components**
"Dumb" components are stored here. All data is passed into dumb component. These components are often used inside a "Container Component". Container components are described in more detail further on.

**Components ── Styles**
We separate component styles from component functionality. Use this folder to create and store style files that matches the naming of your components. For example, a component `AlertMessage.js` would have a matching styles file called `AlertMessageStyles.js`.

**Config**
All application specific configuration falls in this folder. For example, `DebugSettings.js` is used for development-wide globals and `ReactotronConfig.js` is used for Reactotron client settings.

**Containers**
A container is what they call a "Smart Component" in Redux. It is a component
which knows about Redux. They are usually used as "Screens".

Also located here are two special containers: `App.js` and `RootContainer.js`.

`App.js` is first component loaded after `index.ios.js` or `index.android.js`. The purpose of this file is to setup Redux or any other non-visual "global" modules. Having Redux setup here helps with the hot-reloading process in React Native during development as it won't try to reload your sagas and reducers should your colors change (for example).

`RootContainer.js` is the first visual component in the app. It is the ancestor of all other screens and components.

You'll probably find you can get quite far in an Ignite boilerplate app without even touching these two files. They, of course, belong to you, so when you're ready to add something non-visual, like Firebase, or something visual, like an overlay, you have places for these additions.

**Containers ── Styles**
This `/Containers/Styles` folder will house your container styles. Each container component will likely have a companion styles file, just like `/Components`.

**Fixtures**
TODO: Correct this, the description is outdated.

All key API responses are housed here.

These API responses can be used for several reasons.  _E.G._:
* To bypass logins when building any screen of the application
* To quickly test API parsing in unit tests
* To separate Network from Data concerns while coding

**Images**
Static images used in your project are stored here.

**Lib**
At first glance, this could appear to be a "miscellaneous" folder, but we recommend that you treat this as proving ground for components that could be reusable outside your project.

Maybe you're writing a set of utilities that you could use outside your project, but they're not quite ready or battle tested. This folder would be a great place to put them. They would ideally be pure functions and have no dependencies related to other things in your App folder.

**Navigation**
TODO: Update with information about new navigation.

**Redux**
A place to store your Redux files (reducers, stores, etc.).

**Sagas**
A place to store your Sagas (Redux side effects).

**Services**
API calls to external services?

**Themes**
A place to contain styles shared across you project (fonts, colors, etc.).

**Transforms**
A common pattern when working with APIs is to change data so that it plays nice between your app & the API.

We've found this to be the case in every project we've worked on. So much so that we're recommending that you use this folder for these transformations.

Transforms are not necessarily a bad thing (although an API might have you transforming more than you'd like).

For example, you may:

* turn appropriate strings to date objects
* convert snake case to camel case
* normalize or denormalize things
* create lookup tables

## Ignite directory

The `ignite` directory stores all things Ignite, including CLI and boilerplate items. Here you will find generators, plugins and examples to help you get started with React Native.
