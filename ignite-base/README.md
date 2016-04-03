<img align=left src="https://raw.githubusercontent.com/infinitered/react_native_base/master/ignite-base/App/Images/ir.png">
#  React Native Ignite Base App
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://semaphoreci.com/api/v1/ir/ignite/branches/master/shields_badge.svg)](https://semaphoreci.com/ir/react_native_base)

_The ideal starting app for React Native:_
* Standard Compliant
* Multiple Platform Support
* Documented structure
* Redux State Management
* Redux persistence (uses AsyncStorage via [redux-persist](https://github.com/rt2zz/redux-persist))
* Sagas Redux Daemons
* Githooks
* Mocha Tests
* Networking Code
* Common Libs:
  * [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
  * [react-native-animatable](https://github.com/oblador/react-native-animatable)
  * [react-native-i18n](https://github.com/AlexanderZaytsev/react-native-i18n)

## iOS/Android/XDE support
Code is geared towards tested and cross platform functionality. [XDE](https://exponentjs.com/) is disabled by default, but see `index.js` for enabling.


## :arrow_up: How to Setup

**Step 1:** git clone this repo:
```
$git clone git@github.com:infinitered/ignite.git
```
**Step 2:** cd to the cloned repo:
```
cd ignite/ignite-base
```
**Step 3:** Install the Application
```
npm install
```

## :arrow_forward: How to Run App

1. cd to ignite-base
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

1. Install git-hooks => On a Mac `brew install git-hooks` - [Other](https://github.com/icefox/git-hooks/)
2. Setup on Repo => `git hooks --install`

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :us: Internationalization (i18n)
Translations are kept in the [I18n.js](https://github.com/infinitered/react_native_base/blob/master/App/I18n/I18n.js) file.  Edit this file for strings.  Even if your app doesn't support multi-languge, this is one of the best ways to keep strings uniform, and typos in check throughout an application.

## :open_file_folder: Related Articles
* [Understanding Keyboard Avoiding Code](https://shift.infinite.red/avoiding-the-keyboard-in-react-native-56d05b9a1e81#.s4bzjlc7l)
* [Understanding Redux Sagas](https://shift.infinite.red/using-redux-saga-to-simplify-your-growing-react-native-codebase-2b8036f650de#.2o2rmz888)

## :cool: Wishlist
* Fastlane
