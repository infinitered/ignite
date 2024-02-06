<p align="center"><img src="https://user-images.githubusercontent.com/1479215/206780298-2b98221d-9c57-4cd3-866a-cf85ec1ddd9e.jpg" alt="Ignite README Splash Image" /></p>

# Ignite - the battle-tested React Native boilerplate

<a href="https://badge.fury.io/js/ignite-cli" target="_blank"><img src="https://badge.fury.io/js/ignite-cli.svg" alt="npm version" height="20"></a>
![GitHub Repo stars](https://img.shields.io/github/stars/infinitered/ignite)
![Twitter Follow](https://img.shields.io/twitter/follow/ir_ignite)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/infinitered/ignite/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/infinitered/ignite/tree/master)

## Proven React Native boilerplate

The culmination of over seven years of constant React Native development, Ignite is the most popular React Native app boilerplate for both Expo and bare React Native.

This is the React Native boilerplate that the [Infinite Red](https://infinite.red) team uses on a day-to-day basis to build client apps. Developers who use Ignite report that it saves them two to four weeks of time on average off the beginning of their React Native project!

## Intro Videos

- Check out the [Getting Started with Ignite](https://www.youtube.com/watch?v=KOSvDlFyg20) video for a 13 minute overview!
- Jamon's Code Quest on [Ignite 9](https://www.youtube.com/watch?v=QmkMsUYrTlk)

## [Full Documentation](https://github.com/infinitered/ignite/blob/master/docs/README.md)

We've put great effort into the documentation as a team, please [read through it here](https://github.com/infinitered/ignite/blob/master/docs). If you're unsure why a certain decision was made related to this boilerplate or how to proceed with a particular feature, it's likely documented. If it still isn't clear, go through the proper [help channels](#reporting-bugs--getting-help) and we always welcome PRs to improve the docs!

## Tech Stack

Nothing makes it into Ignite unless it's been proven on projects that Infinite Red works on. Ignite apps include the following rock-solid technical decisions out of the box:

| Library           | Category             | Version | Description                                    |
| ----------------- | -------------------- | ------- | ---------------------------------------------- |
| React Native      | Mobile Framework     | v0.72   | The best cross-platform mobile framework       |
| React             | UI Framework         | v18     | The most popular UI framework in the world     |
| TypeScript        | Language             | v5      | Static typechecking                            |
| React Navigation  | Navigation           | v6      | Performant and consistent navigation framework |
| MobX-State-Tree   | State Management     | v5      | Observable state tree                          |
| MobX-React-Lite   | React Integration    | v3      | Re-render React performantly                   |
| Expo              | SDK                  | v49     | Allows (optional) Expo modules                 |
| Expo Font         | Custom Fonts         | v11     | Import custom fonts                            |
| Expo Localization | Internationalization | v14     | i18n support (including RTL!)                  |
| Expo Status Bar   | Status Bar Library   | v1      | Status bar support                             |
| RN Reanimated     | Animations           | v3      | Beautiful and performant animations            |
| AsyncStorage      | Persistence          | v1      | State persistence                              |
| apisauce          | REST client          | v2      | Communicate with back-end                      |
| Reactotron RN     | Inspector/Debugger   | v3      | JS debugging                                   |
| Hermes            | JS engine            |         | Fine-tuned JS engine for RN                    |
| Jest              | Test Runner          | v26     | Standard test runner for JS apps               |
| Maestro           | Testing Framework    |         | Automate end-to-end UI testing                 |
| date-fns          | Date library         | v2      | Excellent date library                         |
| FlashList         | FlatList replacement | v1      | A performant drop-in replacement for FlatList  |

Ignite also comes with a [component library](./docs/boilerplate/components/Components.md) that is tuned for custom designs, theming support, testing, custom fonts, generators, and much, much more.

## Quick Start

Prerequisites:

- For [Expo-powered React Native apps](https://expo.io/), no prerequisites are necessary ([why choose Expo?](https://medium.com/@adhithiravi/building-react-native-apps-expo-or-not-d49770d1f5b8))
- For vanilla React Native, make sure you're set up for React Native by following [the official documentation](https://reactnative.dev/docs/environment-setup).

Run the CLI:

```bash
# Get walked through the prompts for the different options to start your new app
npx ignite-cli@latest new PizzaApp

# Accept all the recommended defaults and get straight to coding!
npx ignite-cli@latest new PizzaApp --yes
```

Once you're up and running, check out our new [Getting Started Guide](/docs/Guide.md) guide or the rest of our [docs](https://github.com/infinitered/ignite/blob/master/docs).

If you'd like to follow a tutorial, check out [this one from Robin Heinze](https://shift.infinite.red/creating-a-trivia-app-with-ignite-bowser-part-1-1987cc6e93a1). _Note that this was created for a previous version of Ignite -- we are working on updating it!_

## Generators

_The hidden gem of Ignite._ Generators help you scaffold your app very quickly, be it for a proof-of-concept, a demo, or a production app. Generators are there to save you time, keep your code consistent, and help you with the basic structure of your app.

```
npx ignite-cli generate --help
```

...will give you information on what generators are present. To learn more, check out our [Generators](/docs/concept//Generators.md) documentation.

### Troubleshooting

The above commands may fail with various errors, depending on your operating system and dependency versions. Some troubleshooting steps to follow:

- Uninstall global versions of the Ignite CLI via `npm uninstall -g ignite-cli` and use the CLI via `npx ignite-cli`
- Make sure you are using a reasonably recent version of Node. This can be checked via the `node --version` command. If you require multiple Node versions on your system, install `nvm`, and then run `nvm install --lts`. At the time of writing, Node LTS is v16.x.x.
- If the installation fails because of an Xcode error (missing Xcode command line tools), the easiest way to install them is to run `sudo xcode-select --install` in your terminal.
- If Xcode and command line tools are already installed, but the installation complains about missing patch dependencies, you may need to switch the Xcode location to something else: `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
- Opening the project in Xcode can give you other insights into what's happening: `open ./ios/<yourapp>.xcworkspace`
- Add the `--debug` switch to the Ignite CLI new command to provide additional output during project initialization

Note:

- Navigation persistence is OFF by default in production.
- Error boundary is set to 'always' display by default.

## Reporting Bugs / Getting Help

If you run into problems, first search the issues and discussions in this repository. If you don't find anything, you can come talk to our friendly and active developers in the Infinite Red Community Slack ([community.infinite.red](http://community.infinite.red)).

If you still need help after reaching out to the proper channels, feel free to open a new GitHub issue via `npx ignite-cli issue "Unable to Ignite new app"` (as an example). This will help start writing your issue with the correct diagnostic information included.

## Need Inspiration?

If you need battle-tested solutions from Infinite Red experts on everything from Accessibility, to CI/CD configuration, head to [Ignite Cookbook](https://ignitecookbook.com) for code snippets from our team and the community!

## No time to learn React Native? Hire Infinite Red for your next project

We get it – sometimes there just isn’t enough time on a project to learn the ins and outs of a new framework. Infinite Red’s here to help! Our experienced team of React Native engineers have worked with companies like Microsoft, GasBuddy, Zoom, and Mercari to bring some of the most complex React Native projects to life.

Whether it’s running a full project or training a team on React Native, we can help you solve your company’s toughest engineering challenges – and make it a great experience at the same time.

Ready to see how we can work together? [Send us a message](https://infinite.red/contact)

## Further Reading

- Watch Jamon Holmgren's talk at React Live Amsterdam 2019 where he uses Ignite to build an app in less than 30 minutes: [https://www.youtube.com/watch?v=OgiFKMd_TeY](https://www.youtube.com/watch?v=OgiFKMd_TeY)
- Prior art includes [Ignite Andross](https://github.com/infinitered/ignite-andross) and [Ignite Bowser](https://github.com/infinitered/ignite-bowser) (which is very similar to the current version of Ignite).
- [Who are We?](https://infinite.red) - Learn More About Infinite Red
