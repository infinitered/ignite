<p align="center">
  <img src="http://ir_public.s3.amazonaws.com/projects/ignite/react-native-ignite-logo_500w.png" alt="React Native Ignite logo" width="250px">
</p>

<p align="center">
  The ideal starting app for React Native, best practices, generators, and more.
  <br/>
  <img src=https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat alt='js-standard-style'/>
  <img src=https://semaphoreci.com/api/v1/ir/ignite/branches/master/shields_badge.svg alt='Build Status'/>
</p>

### Why Ignite?
* Seed Apps/Components/Styles etc. with ignite generator
* JS Code Standard - Standard Compliant
* Multiple Platform Support
* Documented Structure
* Redux State Management
* Optional Redux Persistence (uses AsyncStorage via [redux-persist](https://github.com/rt2zz/redux-persist))
* Sagas Redux Daemons
* Githooks
* Mocha Tests
* API Client
* Include Common Libs:
  * [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
  * [react-native-animatable](https://github.com/oblador/react-native-animatable)
  * [react-native-i18n](https://github.com/AlexanderZaytsev/react-native-i18n)
  * [react-native-push-notification](https://github.com/zo0r/react-native-push-notification)
  * [react-native-drawer](https://github.com/root-two/react-native-drawer)
  * [apisauce](https://github.com/skellock/apisauce)
  * [reactotron](https://github.com/skellock/reactotron)
  * [reduxsauce](https://github.com/skellock/reduxsauce)

To view the generated example project, just pull down the code and run ignite-base!

## :arrow_up: How to Setup

Make sure you're setup for [React Native](https://facebook.github.io/react-native/docs/getting-started.html#content)

*Install*

`npm install -g react-native-ignite`

*Use*

`ignite new MyApplication`

## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run the command `react-native run-ios`
  * for Android
    * Run Genymotion
    * run the command `react-native run-android`

## :iphone: iOS/Android/XDE support
Code is geared towards tested and cross platform functionality. [XDE](https://exponentjs.com/) is disabled by default, but see `index.js` for enabling.

## :no_entry_sign: About Standard Compliance

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

1. Install git-hooks => On a Mac `brew install git-hooks` - [Other](https://github.com/icefox/git-hooks/)
2. Setup on Repo => `git hooks --install`

## :us: Internationalization (i18n)
Translations are kept in the [I18n.js](https://github.com/infinitered/react_native_base/blob/master/App/I18n/I18n.js) file.  Edit this file for strings.  Even if your app doesn't support multi-languge, this is one of the best ways to keep strings uniform, and typos in check throughout an application.

## :open_file_folder: Related Articles for this Code
* [Understanding Keyboard Avoiding Code](https://shift.infinite.red/avoiding-the-keyboard-in-react-native-56d05b9a1e81#.s4bzjlc7l)
* [Understanding Redux Sagas](https://shift.infinite.red/using-redux-saga-to-simplify-your-growing-react-native-codebase-2b8036f650de#.2o2rmz888)
* [Using Fastlane to Deploy](https://shift.infinite.red/simple-react-native-ios-releases-4c28bb53a97b#.bjifers3r)

## :cool: Built by the fine folks at [Infinite Red](http://infinite.red)

[![image](http://infinite.red/images/ir-logo.svg)](http://infinite.red)

_We're web (Elixir and Phoenix) and mobile (React Native) developers based in Portland and San Francisco._

##  :red_car: Roadmap
### Version 1.0
* - [x] Best Practices Base App
* - [x] Working App Generator
* - [x] Working Component Generator
* - [x] Working Container Generator
* - [x] Working Screen Generator
* - [x] Intro Screens
  * - [x] API Test Screen
  * - [x] Theme screen
  * - [x] Components Style Guide
  * - [ ] Device info screen
* - [ ]  Friendly UX for generators 

### Version 1.1
* - [ ] Generators
  * - [ ] Feature specific genertors
    * _e.g._ Gifted form, Realm etc. 
* - [ ] Working Reducer Generator
* - [ ] Working Saga Generator
* - [ ] Left menu item Generator

### Version 2.0
* - [ ] Pick and choose formulas in Generator
  * e.g. `Did you want a drawer?`
  * e.g. `Did you want i18n?`
* - [ ] Utilize composabilities of generator
* - [ ] Example app can still be generated with it's own command (not default)

### Version 3.0
* - [ ] Generated apps can have some supportablity for upgrades
* - [ ] Upgradable commands
