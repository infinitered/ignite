# Project Structure

When creating a new React Native project with Ignite, your project will include a number of nested files and folders. This structure is one the React Native best practices included with Ignite. With this structure, your project already has a head start. Let's take a closer look at Ignite's structure and explain how to leverage its benefits.

## Ignite React Native vs Vanilla React Native

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

Now create a new Ignite project and lets compare the folder structure:

Note: TODO: Maybe like what options we select when creating a new Ignite project?

```
cd ..
ignite new IgniteProject
cd IgniteProject
```

The Ignite project's structure will look similar to this:

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

Included in an Ignite project is the App directory. This is a directory you would normal have to create when using vanilla React Native.

The inside of the App directory looks similar to the following:

```
App
├── Components
├── Config
├── Containers
├── Fixtures
├── Images
├── Lib
├── Navigation
├── Redux
├── Sagas
├── Services
├── Themes
└── Transforms
```

**Components**
Used for "dumb" components. All data is passed into "dumb".

**Config**
TODO

**Containers**
Containers are the top level React Components. Containers interact with Redux and the data of your application. Often, when your data object is updated, a container component will send the data/properties down to the "dumb" components, which in turn will update themselves.

**Fixtures**
TODO

**Images**
Static images used in your project.

**Lib**
TODO: Business logic used throughout your project?

**Navigation**
This is changing?

**Redux**
A place to store your Redux files (reducers, actions, stores, etc.).

**Sagas**
TODO

**Services**
API calls to external services?

**Themes**
A place to contain your project styles.

**Transforms**
TODO

## Ignite directory

TODO:
The Ignite directory stores all things Ignite. Here you will find generators, plugins and examples to help you get started with React Native.

****
