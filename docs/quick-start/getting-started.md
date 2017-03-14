# Getting Started with Ignite and React Native

Welcome to Ignite, the ideal starting app for React Native, best practices, generators, and more. This page will walk you through installing Ignite and using Ignite to generate a React Native Project.

To use Ignite, you will need to install React Native. The best way to install React Native is to follow the React Native installation instructions found on official React Native website, [here](http://facebook.github.io/react-native/docs/getting-started.html). These instructions will walk your through installing React Native on your specific platform.

## Installing Ignite 2.0


Installing Ignite is easy with one simple terminal command:

```
npm install -g ignite-cli
```

## Testing your Ignite Installation

To test your Ignite installation, let’s generate and run a new React Native project using Ignite. In your terminal, navigate to the directory you’d like to create a new Ignite project, then run the Ignite new command:

```
cd projects
ignite new MyIgniteProject
? Would you like Ignite Development Screens?
  No
> Yes
? What Vector icon library will you use?
  none
> react-native-vector-icons
...
```

The `ignite new` command will ask you if you’d like to add several different plugins. We recommend you use these plugins that ship with Ignite. This way, your new Ignite project will be a playground to learn about React Native and best practices.

After Ignite creates your project, navigate into the project’s directory and start the application with the following commands:


```
To run in iOS:
  cd MyIgniteProject
  react-native run-ios

To run in Android:
  cd MyIgniteProject
  react-native run-android
```

You can also learn more about Ignite in the command line:

```
To see what ignite can do for you:
  cd MyIgniteProject
  ignite
```

## Attaching to Existing Projects

If you already have an existing project on the go, you can make it enable ignite support by typing `ignite attach` in the project directory.  This creates a `ignite` directory with a file called `ignite.json` and an empty `plugins` directory (with a `.gitkeep` to play nice with `git`).

You're now ready to start using ignite plugins!

This works great for:

* [create-react-native-app](https://github.com/react-community/create-react-native-app)
* [Expo](https://expo.io)
* [create-react-app](https://github.com/facebookincubator/create-react-app)
* normal React JS projects
* empty directories ( not even joking! you can use this with other programming languages.  :O )

Not all plugins work in all environments, but you can certainly take advantage of the many features of Ignite (such as the code generators).

## Continue your Learning

To continue your introduction to Ignite, see the Editing an Ignite App (working title) page.
