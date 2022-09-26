# Expo and Ignite

![ignite+expo](https://miro.medium.com/max/1400/1*Ii4JuTWmVLeVBcqFyX3v5g.jpeg)

> Expo is the easiest, nicest experience for Ignite apps. And I am convinced Ignite (especially the upcoming version 8, Maverick) is the nicest boilerplate for Expo apps you can possibly get. - Jamon Holmgren

If you're not familiar with [Expo](https://expo.dev), it's an open-source platform for making universal native apps for Android, iOS, and the web with [React Native](https://reactnative.dev). It's essentially a series of layers built around React Native. Here's a partial list of what Expo is:

- [Expo Go](https://expo.dev/client) -- an app for quickly previewing React Native apps without building them
- [EAS](https://eas.dev) -- a build & distribution service for mobile apps, especially RN
- A _lot_ of high quality, well-maintained [React Native libraries](https://github.com/expo/expo)
- Several integrated services, such as push notifications, over-the-air updates, [and much more](https://docs.expo.dev/)

## Overview

In previous versions of Ignite (versions 6 and 7), you could pass in a `--expo` flag to make the resulting generated app "Expo-ready". In version 8 (code-named "Maverick") we made the boilerplate "Expo-ready" by default -- but without locking you into using Expo Go or Expo's services if you don't want to. Every new Ignited app is ready to run with Expo CLI or with "vanilla" React Native CLI right out of the box.

```
# Spin up a new app
npx ignite-cli new PizzaApp
cd PizzaApp

# Expo CLI / Expo Go
yarn expo:start
yarn expo:ios
yarn expo:android

# React Native CLI
yarn ios
yarn android
```

### How it works

Ignite comes with the lightweight `expo` package pre-installed and configured, which enables use of any of Expo's great third-party libraries, such as `expo-device`, `expo-font`, `expo-splash-screen`, and others -- even if you aren't running it in Expo Go or a "managed app".

We've very carefully and intentionally made sure we choose packages that won't conflict with one or the other of the Expo CLI and/or the React Native CLI. It's not just our work -- huge kudos goes to the Expo team for making their packages work with vanilla RN CLI!

## Should I use Expo CLI or vanilla CLI with my new app?

As a general rule of thumb, it's not a bad idea to start with Expo CLI. You'll avoid having to compile the native dependencies of your app by using the Expo Go app and can focus on building your screens.

Where you generally will need to start considering diverging from standard Expo is when you need custom native functionality. Note that you can do a lot of custom native code with Expo's new [Config Plugins](https://docs.expo.dev/guides/config-plugins/) feature, too, so even native code is no longer much of a barrier.

If you still would rather not use Expo Go / CLI, then Ignite is already ready for you -- no "ejecting" necessary. Expo refers to this as the "bare workflow" (they're better at engineering than naming things). Just run `yarn ios` / `yarn android` and it'll build using the React Native CLI.

## Expo Snacks

You can't run an Ignite app directly in [Expo Snack](https://snack.expo.dev/), but we have a new command in Ignite that will set up your project so it can load in a Snack!

This is one of the coolest ways to demo an app to someone else without having to send them a build. They can try your app out right in their browser!

Note there are some limitations to Expo Snacks, and making those work (other than out of the box for Ignite) is beyond the scope of this documentation. You can learn more in [the Snack docs](https://docs.expo.dev/workflow/snack/).

TODO: add documentation for `npx ignite-cli snackify` here.
