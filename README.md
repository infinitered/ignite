<p align="center">
  <a href="https://infinite.red/ignite"><img src="https://raw.githubusercontent.com/infinitered/ignite/master/_art/in_use.jpg" alt="React Native Ignite logo" width="300px"></a>
</p>

<p align="center">
  :fire: The ideal starting app for React Native, best practices, generators, and more. :fire:
  <br/>
  <a href="https://gitter.im/infinitered/ignite?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img src="https://badges.gitter.im/infinitered/ignite.svg" alt="Join the chat at https://gitter.im/infinitered/ignite"></a>
  <a href="https://www.codacy.com/app/gantman/ignite?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=infinitered/ignite&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/1c6e04abe7224bdc88095129b5eb43fb"/></a>
  <img src=https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat alt='js-standard-style'/>
  <img src=https://semaphoreci.com/api/v1/ir/ignite/branches/master/shields_badge.svg alt='Build Status'/>
  <a href="https://badge.fury.io/js/react-native-ignite"><img src="https://badge.fury.io/js/react-native-ignite.svg" alt="npm version" height="20"></a>

</p>

#### :earth_americas: [Tour Video and More on Ignite Web Page](https://infinite.red/ignite)

### Why Ignite?
* **No Need to Fork!**  Command-line Generator
  * Apps
  * Components/Styles
  * Containers (smart components)
  * Screens (opinionated containers)
  * _and more..._
* JS Code Standard - Standard Compliant
* ALL CODE works with iOS and Android
* Documented Structure
* **Battle Tested** - We use this!
* Redux State Management
* Optional Redux Persistence (uses AsyncStorage via [redux-persist](https://github.com/rt2zz/redux-persist))
* Redux Sagas
* Githooks
* AVA Tests - even React Native components!
* Code Coverage Reports
* API Ready
* Reactotron Ready
* Included Common Libs:
  * [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
  * [react-native-animatable](https://github.com/oblador/react-native-animatable)
  * [react-native-i18n](https://github.com/AlexanderZaytsev/react-native-i18n)
  * [react-native-drawer](https://github.com/root-two/react-native-drawer)
  * [apisauce](https://github.com/skellock/apisauce)
  * [reduxsauce](https://github.com/skellock/reduxsauce)
  * [react-native-maps](https://github.com/lelandrichardson/react-native-maps)
  * [rn-translate-template](https://github.com/hiaw/rn-translate-template)
* Included Developer Libs:
  * [reactotron](https://github.com/skellock/reactotron)
  * [AVA](https://github.com/avajs/ava)
  * [enzyme](https://github.com/airbnb/enzyme)
  * [react-native-mock](https://github.com/lelandrichardson/react-native-mock)
  * [mockery](https://github.com/mfncooper/mockery)
  * [nyc](https://github.com/bcoe/nyc)


To view the generated example project, just pull down the code and run ignite-base!

## :arrow_down: Install

Make sure you're set up for [React Native](https://facebook.github.io/react-native/docs/getting-started.html#content)

**Step 1: Install**

`npm install -g react-native-ignite`

or

`yarn global add react-native-ignite`

For those of you unfamiliar with the new package manager Yarn, it's basically a 1 for 1 replacement for npm, but with a significant speed boost. Check out this [yarn cheatsheet](https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc#.1ckrhd77a) for more info.

**Step 2: Use**

`ignite new MyApplication`

![install](_art/install.gif)

## :arrow_forward: How to Run Generated App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run the command `react-native run-ios`
  * for Android
    * Run Genymotion
    * run the command `react-native run-android`
3. If the packager does not automatically start, run `npm start` or `yarn start`
4. _**Enjoy!**_

![install](_art/screens.gif)

## :arrow_up: Built-In Generators

#### Generate an app: `ignite new MyApplication`
* The application generator uses the `ignite-base` template to provide a fresh application with all the common tech wired up and ready to roll.  Base applications come with common development screens, tools, and components.  _As for now, this is a 'Kitchen Sink' plan of attack.  Eventually to be pared down, and adjustable in v2.0_

#### Generate a component: `ignite generate component SmoothButton`
* The component generator creates a new 'dumb component' with the stylesheet.  Both files are created and placed in their appropriate folders.

#### Generate a container: `ignite generate container SubMenu`
* A generated container is a smart component that is connected to Redux.  Usually for containing other components.  The component and stylesheet are placed in the `Containers` folder.

#### Generate a screen: `ignite generate screen Settings`
* A generated screen is an opinionated container with a generated route.  Keyboard avoiding and other base code is placed in this connected smart component.

#### Generate a listview: `ignite generate listview HotDates`
* React Native listview container with easy step-by-step instructions on how to get started with an easy list template.

#### Generate a mapview: `ignite generate mapview MapScreen`
* react-native-maps container, component, and map helpers with easy step-by-step instructions on how to get started with an simple map screen.

#### Import images: `ignite import imagesfile`
* Imports all files in `Images` folder and converts the names into **key: value** pairs in the _image_ object inside of the `Images.js` file in the `Themes` folder.

## :arrow_upper_right: This Repo Explained
* **ignite-base** aka [BASE] - is the generated default app. Some files are different and have a `.template` extension.
* **ignite-cli** aka [CLI] - is the app that wraps our yeoman generators, and other commands.  This is the `react-native-ignite` node module.
* **ignite-generator** aka [GEN] - Yeoman generators for Ignite.  This is the `generator-react-native-ignite` node module that the CLI depends on for generating app items.
* **fireDrill.sh** - A shell script for verifying the necessary relationship between folders and files is in good shape.  Since versions, templates, and linting is enforce, we have it all in one friendly script for developers and CI.
* **testRelease.sh** - A shell script that automatically ignites a project based on the repo to make sure it generates correctly, and functions to the best of automated testability.  This script is run before every release.

## :up: Ignite Versions
##### Ignite is tested on every release: See [release history](https://github.com/infinitered/ignite/releases) for changes and upgrades.
##### Ignite `master` branch is tested against facebook's react-native `master` branch every 24 hours.  Though this doesn't immediately affect the current release of Ignite, it helps us detect early issues with upgrading:  Current status [![Build Status](https://travis-ci.org/infinitered/ignite.svg?branch=master)](https://travis-ci.org/infinitered/ignite)

## :twisted_rightwards_arrows: Where to Go From Here
#### [Contribute to Ignite](https://github.com/infinitered/ignite/blob/master/.github/CONTRIBUTING.md) - Getting up and running for your first pull request
#### [Chat with us on Gitter](https://gitter.im/infinitered/ignite?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) - Infinite Red devs standing by
#### [Chosen Tech Docs](https://github.com/infinitered/ignite/wiki/Chosen-Tech) - Understand the Tech Inside
#### [Roadmap Wiki Page](https://github.com/infinitered/ignite/wiki/Roadmap) - Future Plans of Ignite
#### [Who are We?](https://infinite.red) - Learn More About Infinite Red
#### [Project Web Page](http://infinitered.github.io/ignite/) - Our Github Page

## :heart: Special Thanks :heart:
Thank you to the numerous [contributors of Ignite](https://github.com/infinitered/ignite/graphs/contributors).  Additionally, our Gitter/Slack integration has been most graceously donated by [SameRoom.io](https://sameroom.io/).  Our awe and appreciation for the friendliness of Open Source is the fuel for all [Infinite Red](https://infinite.red/) projects like Ignite.
