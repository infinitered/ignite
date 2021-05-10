<p align="center"><img src="http://ir_public.s3.amazonaws.com/projects/ignite/ignite-bowser-launch-screen.png" alt="logo" width="414px"></p>

# Ignite - the hottest React Native boilerplate

<a href="https://badge.fury.io/js/ignite" target="_blank"><img src="https://badge.fury.io/js/ignite.svg" alt="npm version" height="20"></a>

## Battle-tested React Native boilerplate

The culmination of five years of constant React Native development, Ignite is the most popular React Native app boilerplate for both Expo and bare React Native.

This is the React Native boilerplate that the [Infinite Red](https://infinite.red) team uses on a day-to-day basis to build client apps. Developers who use Ignite report that it saves them two to four weeks of time on average off the beginning of their React Native project!

_NOTE: Ignite CLI version 6.0 now includes the boilerplate -- read [the blog post](https://shift.infinite.red/introducing-ignite-4-0-flame-1dfc891f9966) to find out why!_

## Tech Stack

Ignite apps include the following rock-solid technical decisions out of the box:

- React Native
- React Navigation 5
- MobX-State-Tree [(Why not Redux?)](https://github.com/infinitered/ignite/blob/master/docs/MobX-State-Tree.md)
- MobX-React-Lite
- TypeScript
- AsyncStorage (integrated with MST for restoring state)
- apisauce (to talk to REST servers)
- Flipper-ready
- Reactotron-ready (and pre-integrated with MST)
- Supports Expo out of the box
- And more!

## Quick Start

Prerequisites:

- For [Expo-powered React Native apps](https://expo.io/), no prerequisites are necessary ([why choose Expo?](https://medium.com/@adhithiravi/building-react-native-apps-expo-or-not-d49770d1f5b8))
- For vanilla React Native, make sure you're set up for React Native [by following our free Infinite Red Academy course](https://academy.infinite.red/p/installing-react-native-tutorial-on-macos) first

Run the CLI:

```bash
# for vanilla React Native
npx ignite-cli new PizzaApp
# or for Expo-powered:
npx ignite-cli new PizzaApp --expo
```

Ignite will walk you through the rest. If you'd like to follow a tutorial, check out [this one from Robin Heinze](https://shift.infinite.red/creating-a-trivia-app-with-ignite-bowser-part-1-1987cc6e93a1).

## Generators

_The true gem of Ignite._ Generators help you scaffold your app very quickly, be it for a proof-of-concept, a demo, or a production app. Generators are there to save you time, keep your code consistent, and help you with the basic structure of your app.

```
npx ignite-cli generate --help
```

...will give you information on what generators are present. To learn more, check out our [Generators](https://github.com/infinitered/ignite/blob/master/docs/Generators.md) documentation.

## Troubleshooting

If you run into problems, first search the issues in this repository. If you don't find anything, you can come talk to our friendly and active developers in the Infinite Red Community Slack ([community.infinite.red](http://community.infinite.red)).

## Further Reading

- Watch Jamon Holmgren's talk at React Live Amsterdam where he uses Ignite to build an app in less than 30 minutes: [https://www.youtube.com/watch?v=Pb8MWkQ9GOc](https://www.youtube.com/watch?v=Pb8MWkQ9GOc)
- Prior art includes [Ignite Andross](https://github.com/infinitered/ignite-andross) and [Ignite Bowser](https://github.com/infinitered/ignite-bowser) (which is very similar to the current version of Ignite).
- [Check out Gluegun](https://github.com/infinitered/gluegun) - Ignite CLI is powered by Gluegun, which lets you build CLI apps painlessly!
- [Who are We?](https://infinite.red) - Learn More About Infinite Red
