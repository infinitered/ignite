# Getting Started with Ignite CLI and React Native

Welcome to Ignite CLI, a command line tool for generating React Native projects, components, and more. This page will walk you through installing Ignite CLI and using Ignite CLI to generate a React Native Project.

To use Ignite CLI, you will need to install React Native. The best way to install React Native is to follow the React Native installation instructions found on official React Native website, [here](http://facebook.github.io/react-native/docs/getting-started.html). These instructions will walk your through installing React Native on your specific platform.

You will also need to have Node 7.6+ installed. We recommend using [n](https://github.com/tj/n) to manage node versions. If you already use [nvm](https://github.com/creationix/nvm) and would like to switch, follow [these steps](./nvm-to-n.md).

## Installing Ignite CLI

Installing Ignite CLI is easy with one simple terminal command:

```sh
$ npm install -g ignite-cli
```

## Testing your Ignite Installation

To test your Ignite CLI installation, let’s generate and run a new React Native project. In your terminal, navigate to the directory you’d like to create a new React Native project, then run the Ignite CLI new command:

```sh
$ cd projects
$ ignite new MyIgniteProject
? Would you like Ignite Development Screens?
  No
> Yes
? What Vector icon library will you use?
  none
> react-native-vector-icons
...
```

The `ignite new` command will ask you if you’d like to add several different plugins. We recommend you use these plugins that ship with Ignite CLI. This way, your new Ignite CLI project will be a playground to learn about React Native and best practices.

After Ignite CLI creates your project, navigate into the project’s directory and start the application with the following commands:

```
To run in iOS:
  cd MyIgniteProject
  npx react-native run-ios

To run in Android:
  cd MyIgniteProject
  npx react-native run-android
```

You can also learn more about Ignite CLI in the command line:

```
To see what Ignite CLI can do for you:
  cd MyIgniteProject
  ignite
```

## Attaching to Existing Projects

If you already have an existing project on the go, you can make it enable ignite support by typing `ignite attach` in the project directory. This creates a `ignite` directory with a file called `ignite.json` and an empty `plugins` directory (with a `.gitkeep` to play nice with `git`).

You're now ready to start using ignite plugins!

This works great for:

- [create-react-native-app](https://github.com/react-community/create-react-native-app)
- [Expo](https://expo.io)
- [create-react-app](https://github.com/facebookincubator/create-react-app)
- normal React JS projects
- empty directories ( not even joking! you can use this with other programming languages. :O )

Not all plugins work in all environments, but you can certainly take advantage of the many features of Ignite CLI (such as the code generators).
