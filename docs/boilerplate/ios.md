---
title: ios
sidebar_position: 30
---

# `ios` folder

If you choose the `DIY` option when spinning up a new app (or you run `yarn prebuild:clean`) you'll get an `ios` (and probably [`android`](./android.md)) folder in your project root. This folder contains your native iOS / Xcode project, which has been pre-configured to work with React Native.

We generally recommend using the [Expo CNG (continuous native generation)](../expo/CNG.md) workflow, but if you need to customize your native code manually, you can do so here.

Just like any React Native project, you can open this folder in Xcode and run your app on a simulator or device. Learn more here: [https://reactnative.dev/docs/native-debugging#debugging-native-code](https://reactnative.dev/docs/native-debugging#debugging-native-code)
