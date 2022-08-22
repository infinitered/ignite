<p align="center"><img src="http://ir_public.s3.amazonaws.com/projects/ignite/ignite-bowser-launch-screen.png" alt="logo" width="414px"></p>

# Ignite - the hottest React Native boilerplate

<a href="https://badge.fury.io/js/ignite-cli" target="_blank"><img src="https://badge.fury.io/js/ignite-cli.svg" alt="npm version" height="20"></a>
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/infinitered/ignite/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/infinitered/ignite/tree/master)

## Battle-tested React Native boilerplate

The culmination of five years of constant React Native development, Ignite is the most popular React Native app boilerplate for both Expo and bare React Native.

This is the React Native boilerplate that the [Infinite Red](https://infinite.red) team uses on a day-to-day basis to build client apps. Developers who use Ignite report that it saves them two to four weeks of time on average off the beginning of their React Native project!

## Tech Stack

Ignite apps include the following rock-solid technical decisions out of the box:

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
- Hermes enabled
- React native Reanimated
- And more!

## Quick Start

Prerequisites:

- For [Expo-powered React Native apps](https://expo.io/), no prerequisites are necessary ([why choose Expo?](https://medium.com/@adhithiravi/building-react-native-apps-expo-or-not-d49770d1f5b8))
- For vanilla React Native, make sure you're set up for React Native by following our free Infinite Red Academy course [for macOS](https://academy.infinite.red/p/installing-react-native-tutorial-on-macos) or [for Windows 10](https://academy.infinite.red/p/installing-react-native-tutorial-on-windows-10) first

Run the CLI:

```bash
# Get walked through the prompts for the different options to start your new app
npx ignite-cli new PizzaApp

# Accept all the recommended defaults and get straight to coding!
npx ignite-cli new PizzaApp --yes
```

Once you're up and running, check out our new [Getting Started Guide](https://github.com/infinitered/ignite/blob/master/docs/Guide.md) guide or the rest of our [docs](https://github.com/infinitered/ignite/blob/master/docs).

If you'd like to follow a tutorial, check out [this one from Robin Heinze](https://shift.infinite.red/creating-a-trivia-app-with-ignite-bowser-part-1-1987cc6e93a1).

### Troubleshooting

The above commands may fail with various errors, depending on your operating system and dependency versions. Some troubleshooting steps to follow:

- Uninstall global versions of the Ignite CLI via `npm uninstall -g ignite-cli` and use the CLI via `npx ignite-cli`
- Make sure you are using the LTS version of Node. This can be checked via the `node --version` command. If you require multiple Node versions on your system, install `nvm`, and then run `nvm install --lts`. At the time of writing, Node LTS is v16.x.x.
- If the installation fails because of an Xcode error (missing Xcode command line tools), the easiest way to install them is to run `sudo xcode-select --install` in your terminal.
- If Xcode and command line tools are already installed, but the installation complains about missing patch dependencies, you may need to switch the Xcode location to something else: `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
- Add the `--debug` switch to the Ignite CLI new command to provide additional output during project initialization

## Generators

_The hidden gem of Ignite._ Generators help you scaffold your app very quickly, be it for a proof-of-concept, a demo, or a production app. Generators are there to save you time, keep your code consistent, and help you with the basic structure of your app.

```
npx ignite-cli generate --help
```

...will give you information on what generators are present. To learn more, check out our [Generators](https://github.com/infinitered/ignite/blob/master/docs/Generators.md) documentation.

## Troubleshooting

If you run into problems, first search the issues in this repository. If you don't find anything, you can come talk to our friendly and active developers in the Infinite Red Community Slack ([community.infinite.red](http://community.infinite.red)).

Note:

- Navigation persistence is OFF by default in production.
- Error boundary is set to 'always' display by default.

## No time to learn React Native? Hire Infinite Red for your next project

We get it – sometimes there just isn’t enough time on a project to learn the ins and outs of a new framework. Infinite Red’s here to help! Our experienced team of React Native engineers have worked with companies like Microsoft, Zoom, and Mercari to bring even some of the most complex projects to life.

Whether it’s running a full project or training a team on React Native, we can help you solve your company’s toughest engineering challenges – and make it a great experience at the same time.
Ready to see how we can work together? [Send us a message](mailto:hello@infinite.red)

## Further Reading

- Watch Jamon Holmgren's talk at React Live Amsterdam where he uses Ignite to build an app in less than 30 minutes: [https://www.youtube.com/watch?v=OgiFKMd_TeY](https://www.youtube.com/watch?v=OgiFKMd_TeY)
- Prior art includes [Ignite Andross](https://github.com/infinitered/ignite-andross) and [Ignite Bowser](https://github.com/infinitered/ignite-bowser) (which is very similar to the current version of Ignite).
- [Check out Gluegun](https://github.com/infinitered/gluegun) - Ignite CLI is powered by Gluegun, which lets you build CLI apps painlessly!
- [Who are We?](https://infinite.red) - Learn More About Infinite Red
