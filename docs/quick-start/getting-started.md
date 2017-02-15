# Getting Started with Ignite and React Native

Welcome to Ignite, the ideal starting app for React Native, best practices, generators, and more. This page will walk you through installing Ignite and using Ignite to generate a React Native Project.

To use Ignite, you will need to install React Native. The best way to install React Native is to follow the React Native installation instructions found on official React Native website, [here](http://facebook.github.io/react-native/docs/getting-started.html). These instructions will walk your through installing React Native on your specific platform.

## Installing Ignite Dependencies

Installing Ignite is easy with one simple terminal command:

```
npm install -g react-native-ignite
```

This command will install Ignite globally so you can use Ignite’s command line tools in any directory on your computer.

## Testing your Ignite Installation

To test your Ignite installation, let’s generate and run a new React Native project using Ignite. In your terminal, navigate to the directory you’d like to create a new Ignite project, then run the Ignite generate command:

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

## Continue your Learning

To continue your introduction to Ignite, see the Editing an Ignite App (working title) page.
