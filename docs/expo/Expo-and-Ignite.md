---
sidebar_position: 10
---

# Expo and Ignite

![ignite+expo](https://miro.medium.com/max/1400/1*Ii4JuTWmVLeVBcqFyX3v5g.jpeg)

> Expo is the easiest, nicest experience for Ignite apps. And I am convinced Ignite (especially version 9) is the nicest boilerplate for Expo apps you can possibly get. - Jamon Holmgren

If you're not familiar with [Expo](https://expo.dev), it's an open-source platform for making universal native apps for Android, iOS, and the web with [React Native](https://reactnative.dev). It's essentially a series of layers built around React Native. Here's a partial list of what Expo is:

- [Expo Go](https://expo.dev/client) -- an app for quickly previewing React Native apps without building them
- [EAS](https://eas.dev) -- a build & distribution service for mobile apps, especially RN
- A _lot_ of high quality, well-maintained [React Native libraries](https://github.com/expo/expo)
- Several integrated services, such as push notifications, over-the-air updates, [and much more](https://docs.expo.dev/)

## Overview

In previous versions of Ignite (versions 6 and 7), you could pass in a `--expo` flag to make the resulting generated app "Expo-ready". In version 8 (code-named "Maverick") we made the boilerplate "Expo-ready" by default -- but without locking you into using Expo Go or Expo's services if you don't want to.

In version 9 (code-named "Exp[ress]o") we let Expo drive the native template initially. If you want to take over the native template and maintain all native code yourself, you are free to do so! However, if you want to opt-in to [Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/) you can modify/extend the native template via Expo's [Config Plugins](https://docs.expo.dev/guides/config-plugins/). The Ignite template includes a Config Plugin that adds in a bug fix for `expo-splash-screen` when on Android 12.

Now in version 10 (or Ignite X), we no longer support the option for the Expo Go during setup. This is due to Expo's recommendation for building and distributing production applications. You can read more [here](https://docs.expo.dev/develop/tools/#expo-go). This allowed for us to bring in some better dependencies to the boilerplate, which would not have been supported under Expo's ecosystem (such as `react-native-mmkv`). You can of course convert your Ignite project back to being [Expo Go compatible](https://ignitecookbook.com/docs/recipes/SwitchBetweenExpoGoCNG).

```
# Spin up a new app
npx ignite-cli new PizzaApp
cd PizzaApp
yarn ios
yarn android
```

### How it works

Ignite comes with the lightweight `expo` package pre-installed and configured, which enables use of any of Expo's great third-party libraries, such as `expo-device`, `expo-font`, `expo-splash-screen`, and others -- even if you aren't running it in Expo Go or a "managed app".
