# Getting Started

## What is Ignite?

Ignite is best described as "[Infinite Red](https://infinite.red)'s favorite way to build React Native apps". It's a CLI and a boilerplate React Native project dating back to the early days of React Native (2016), as well as some command-line generators. It's also a community of like-minded developers who like the way we do things!

In short -- if you use Ignite to start your next React Native project, you're using a battle-tested, familiar stack.

## Ignite CLI

In order to start a new Ignite project, you can use the CLI. No need to install it globally as it works great with `npx`:

```bash
npx ignite-cli new PizzaApp --expo
```

Once it's up and running, you can use the Ignite CLI to [generate](./Generators.md) components, screens, MST models, and more.

## Ignite Boilerplate

Your new Ignite project (whether you start with Expo or not) comes with a full stack of useful libraries, pre-set up for you so you can start coding.

- React Native
- React Navigation 6
- MobX-State-Tree [(Why not Redux?)](https://github.com/infinitered/ignite/blob/master/docs/MobX-State-Tree.md)
- MobX-React-Lite
- TypeScript
- AsyncStorage (integrated with MST for restoring state)
- apisauce (to talk to REST servers)
- Flipper-ready
- Reactotron-ready (and pre-integrated with MST)
- Supports Expo (and Expo web) out of the box
- And more!

## Where do I start?

First, spin up the app and make sure you can see the welcome screen. If you have any issues, please report them.

Once it's running, you'll want to get familiarized with the following concepts:

### Navigation

We use React Navigation v6 in the current version of Ignite. You'll find any navigators in `./app/navigators`, with the `app-navigator.tsx` being the primary one.

There's also a `navigation-utilities.tsx` file which provides some utility functions we find useful in building apps, such as `getActiveRouteName`, `useBackButtonHandler` and `useNavigationPersistence`.

Learn more in our Navigation
