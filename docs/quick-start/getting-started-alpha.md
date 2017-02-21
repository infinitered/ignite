# Getting Started with Ignite 2.0 Alpha and React Native

Welcome to Ignite, the ideal starting app for React Native, best practices, generators, and more. This page will walk you through installing Ignite and using Ignite to generate a React Native Project.

To use Ignite, you will need to install React Native. The best way to install React Native is to follow the React Native installation instructions found on official React Native website, [here](http://facebook.github.io/react-native/docs/getting-started.html). These instructions will walk your through installing React Native on your specific platform.

## Installing Ignite 2.0 Alpha

> Note: Ignite 2.0 is in alpha currently, so if you want to use it, you'll
have to follow these instructions

If you are looking to contribute to Ignite, or want to use it before the
official release, then follow these instructions.

We'll need node *v7.5.0*; install that if it isn't already: `nvm install v7.5.0`

Next, you'll need to clone Ignite from Github and check out the branch where
version 2 is being developed:

```
git clone git@github.com:infinitered/ignite.git
cd ignite
git fetch --all # to make sure your repo has a reference to the branch
git checkout -b next origin/next
```

Install dependencies

```
npm install
npm run bootstrap
```

Installing Ignite is easy with one simple terminal command:

```
npm install -g react-native-ignite
```

This command will install Ignite globally so you can use Ignite’s command line tools in any directory on your computer.

Because Ignite 2.0 is not on npm yet, we need to link npm with our current repo:

> Note: if you already have Ignite installed via npm, you'll need to remove the
symlink in order to link the current repo. You can put back your previous
symlink when you're done with the alpha.

```
cd packages/ignite
npm link
```

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
