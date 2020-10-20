<p align="center"><img src="http://ir_public.s3.amazonaws.com/projects/ignite/ignite-bowser-launch-screen.png" alt="logo" width="414px"></p>

# Ignite - the hottest React Native boilerplate

<a href="https://badge.fury.io/js/ignite" target="_blank"><img src="https://badge.fury.io/js/ignite.svg" alt="npm version" height="20"></a>

## Battle-tested React Native boilerplate

The culmination of five years of constant React Native development, Ignite is the most popular React Native app boilerplate for both Expo and bare React Native.

This is the React Native boilerplate that the [Infinite Red](https://infinite.red) team uses on a day-to-day basis to build client apps. Developers who use Ignite report that it saves them two to four weeks of time on average off the beginning of their React Native project!

- **Easily spin up a new React Native app** with best practices built-in
- **No runtime!** This is a developer tool only, not a library you have to depend on and figure out how to upgrade
- **An ever-expanding list of [boilerplates](./BOILERPLATES.md) and [plugins](./PLUGINS.md)** to jump-start your app
- **An amazing [community](http://community.infinite.red)** of other Ignite / React Native developers when you need help
- **Battle-tested** and used every day by the developers at Infinite Red and thousands of developers around the world
- **Works on macOS, Windows, and Linux** because not all React Native developers are on one platform
- **Saves an average of two weeks** on your React Native development

## Tech Stack

Ignite apps include the following rock-solid technical decisions out of the box:

- React Native
- React Navigation 5
- MobX-State-Tree [(Why not Redux?)](#About-The-Stack)
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

Make sure you have a reasonably recent version of Node (7.6+ minimum). You can check your version of Node by running

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

### Use Ignite Bowser: [Infinite Red Bowser boilerplate](https://github.com/infinitered/ignite-bowser)

Watch Jamon Holmgren's talk at React Live Amsterdam, where he uses Ignite Bowser to build an app in less than 30 minutes:

[https://www.youtube.com/watch?v=Pb8MWkQ9GOc](https://www.youtube.com/watch?v=Pb8MWkQ9GOc)

```sh
$ yarn global add ignite-cli
$ ignite new PizzaApp
  ( Choose `Bowser` when prompted )
$ cd PizzaApp
$ ignite generate screen pizza-location-list
  ( Choose `example` domain when prompted. This determines where your new screen will go in the directory structure. )
$ ignite generate component pizza-location
  ( Choose `example` domain when prompted. This determines where your new screen will go in the directory structure. )
$ ignite --help
```
ignite generate --list
```

...will give you information on what generators are present. To learn more, check out our [Generators](https://github.com/infinitered/ignite/blob/master/docs/Generators.md) documentation.

## Troubleshooting

If you run into problems, first search the issues in this repository. If you don't find anything, you can come talk to our friendly and active developers in the Infinite Red Community Slack ([community.infinite.red](http://community.infinite.red)).

## Further Reading

[Ignite CLI](https://infinite.red/ignite), as an open-source project, is free to use and always will be. To help support providing Ignite CLI and boilerplates for free, [Infinite Red](https://infinite.red/) offers premium [React Native](https://infinite.red/react-native) app design/development services. Get in touch [here](https://infinite.red/contact) or email us at [hello@infinite.red](mailto:hello@infinite.red).
