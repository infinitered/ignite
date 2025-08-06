---
sidebar_position: 1
---

<p align="center"><img src="https://user-images.githubusercontent.com/1479215/206780298-2b98221d-9c57-4cd3-866a-cf85ec1ddd9e.jpg" alt="Ignite README Splash Image" /></p>

# Ignite - the battle-tested React Native boilerplate

<a href="https://badge.fury.io/js/ignite-cli" target="_blank"><img src="https://badge.fury.io/js/ignite-cli.svg" alt="npm version" height="20" /></a>
![GitHub Repo stars](https://img.shields.io/github/stars/infinitered/ignite)
![Twitter Follow](https://img.shields.io/twitter/follow/ir_ignite)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/infinitered/ignite/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/infinitered/ignite/tree/master)

## Proven React Native boilerplate

Developed and maintained consistently since 2016, Ignite is the oldest active and most popular third-party React Native / Expo app boilerplate.

This is the React Native starting point that the [Infinite Red](https://infinite.red/react-native-app-development-company) team uses on a day-to-day basis to build client apps. Developers who use Ignite report that it saves them two to four weeks of time on average off the beginning of their React Native project!

## Intro Videos

Here are a few videos / talks that introduce Ignite and show off some of its features. Check them out!

<table>
  <tr>
    <td width="50%">
      <figure>
        <a href="https://www.youtube.com/watch?v=KOSvDlFyg20">
          <img src="https://img.youtube.com/vi/KOSvDlFyg20/sddefault.jpg" alt="Getting Started with Ignite"  width="100%" /><br />
        <figcaption><strong>Getting Started with Ignite</strong></figcaption>
        </a>
      </figure>
    </td>
    <td>
      <figure>
        <a href="https://www.youtube.com/watch?v=dNWkJOpD6YE&list=PLFHvL21g9bk0XOO9XK6d6S9w1jBU6Dz_U&index=16">
          <img src="https://img.youtube.com/vi/dNWkJOpD6YE/sddefault.jpg" alt="Sweetening React Native Development With Ignite" width="100%" /><br />
        <figcaption><strong>Ignite talk at Chain React 2024 - Robin Heinze</strong></figcaption>
        </a>
      </figure>
    </td>
  </tr>
</table>

## [Full Documentation](https://github.com/infinitered/ignite/blob/master/docs/README.md)

We've put great effort into the documentation as a team, please [read through it here](https://github.com/infinitered/ignite/blob/master/docs). If you're unsure why a certain decision was made related to this boilerplate or how to proceed with a particular feature, it's likely documented. If it still isn't clear, go through the proper [help channels](#reporting-bugs--getting-help) and we always welcome PRs to improve the docs!

## Tech Stack

Nothing makes it into Ignite unless it's been proven on projects that Infinite Red works on. Ignite apps include the following rock-solid technical decisions out of the box:

| Library                          | Category             | Version | Description                                    |
| -------------------------------- | -------------------- | ------- | ---------------------------------------------- |
| React Native                     | Mobile Framework     | v0.79   | The best cross-platform mobile framework       |
| React                            | UI Framework         | v19     | The most popular UI framework in the world     |
| TypeScript                       | Language             | v5      | Static typechecking                            |
| React Navigation                 | Navigation           | v7      | Performant and consistent navigation framework |
| Expo                             | SDK                  | v53     | Allows (optional) Expo modules                 |
| Expo Font                        | Custom Fonts         | v13     | Import custom fonts                            |
| Expo Localization                | Internationalization | v16     | i18n support (including RTL!)                  |
| Expo Status Bar                  | Status Bar Library   | v2      | Status bar support                             |
| RN Reanimated                    | Animations           | v3      | Beautiful and performant animations            |
| MMKV                             | Persistence          | v3      | State persistence                              |
| apisauce                         | REST client          | v3      | Communicate with back-end                      |
| Jest                             | Test Runner          | v29     | Standard test runner for JS apps               |
| date-fns                         | Date library         | v4      | Excellent date library                         |
| react-native-keyboard-controller | Keyboard library     | v1      | Great keyboard manager library                 |
| react-native-edge-to-edge        | UI library           | v1      | Enables edge-to-edge in Android                |
| Reactotron RN                    | Inspector/Debugger   | v5      | JS debugging                                   |
| Maestro                          | Testing Framework    |         | Automate end-to-end UI testing                 |
| Hermes                           | JS engine            |         | Fine-tuned JS engine for RN                    |

Ignite also comes with a [component library](./boilerplate/app/components/Components.md) that is tuned for custom designs, theming support, testing, custom fonts, generators, and much, much more.

## Quick Start

Prerequisites:

- You'll need at least a recent version of [Node](https://nodejs.org/en) to run the CLI
- For compiling/running in a simulator, make sure you're set up for React Native by following [the official documentation](https://reactnative.dev/docs/environment-setup).

The Ignite CLI will walk you through the steps to ignite a new React Native app:

```bash
# Get walked through the prompts for the different options to start your new app
npx ignite-cli@latest new PizzaApp

# Accept all the recommended defaults and get straight to coding!
npx ignite-cli@latest new PizzaApp --yes
```

Once you're up and running, check out our [Getting Started Guide](https://docs.infinite.red/ignite-cli/Guide/).

If you'd like to follow a tutorial, check out [this one from Robin Heinze](https://shift.infinite.red/creating-a-trivia-app-with-ignite-bowser-part-1-1987cc6e93a1).

### Troubleshooting

The above commands may fail with various errors, depending on your operating system and dependency versions. Some troubleshooting steps to follow:

- Uninstall global versions of the Ignite CLI via `npm uninstall -g ignite-cli` and use the CLI via `npx ignite-cli`
- Make sure you are using a reasonably recent version of Node. This can be checked via the `node --version` command. If you require multiple Node versions on your system, install `nvm`, and then run `nvm install --lts`. At the time of writing, Node LTS is v20.x.x.
- If the installation fails because of an Xcode error (missing Xcode command line tools), the easiest way to install them is to run `sudo xcode-select --install` in your terminal.
- If Xcode and command line tools are already installed, but the installation complains about missing patch dependencies, you may need to switch the Xcode location to something else: `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
- Opening the project in Xcode can give you other insights into what's happening: `open ./ios/<yourapp>.xcworkspace`
- Add the `--debug` switch to the Ignite CLI new command to provide additional output during project initialization

## Reporting Bugs / Getting Help

If you run into problems, first search the issues and discussions in this repository. If you don't find anything, you can come talk to our friendly and active developers in the Infinite Red Community Slack ([community.infinite.red](https://community.infinite.red)).

If you still need help after reaching out to the proper channels, feel free to open a new GitHub issue via `npx ignite-cli issue "Unable to Ignite new app"` (as an example). This will help start writing your issue with the correct diagnostic information included.

## Contributing to Ignite

Want to contribute to Ignite? Check out [the contributing guide](./contributing/Contributing-To-Ignite.md) for more info on how to work with the codebase.

## Need Inspiration?

If you need battle-tested solutions from Infinite Red experts on everything from Accessibility, to CI/CD configuration, head to [Ignite Cookbook](https://ignitecookbook.com) for code snippets from our team and the community!

## No time to learn React Native? Hire Infinite Red for your next project

We get it – sometimes there just isn’t enough time on a project to learn the ins and outs of a new framework. Infinite Red’s here to help! Our experienced team of React Native engineers have worked with companies like Microsoft, GasBuddy, Zoom, and Mercari to bring some of the most complex React Native projects to life.

Whether it’s running a full project or training a team on React Native, we can help you solve your company’s toughest engineering challenges – and make it a great experience at the same time.

Ready to see how we can work together? [Send us a message](https://infinite.red/contact)

## Further Reading

- Watch Jamon Holmgren's talk at React Live Amsterdam 2019 where he uses Ignite to build an app in less than 30 minutes: [https://www.youtube.com/watch?v=OgiFKMd_TeY](https://www.youtube.com/watch?v=OgiFKMd_TeY)
- Prior art includes [Ignite Andross](https://github.com/infinitered/ignite-andross) and [Ignite Bowser](https://github.com/infinitered/ignite-bowser) (which is very similar to the current version of Ignite).
- [Who are We?](https://infinite.red/react-native-app-development-company) - Learn More About Infinite Red, the top React Native app development company

## License and Trademark Notice

This project's source code is licensed under the [MIT License](https://github.com/infinitered/ignite/blob/master/LICENSE). The Ignite name, its logo, and any other brand assets associated with Ignite and Infinite Red are the exclusive property of Infinite Red, Inc. These marks are not covered by the MIT License provided herein and may not be used without explicit written permission from Infinite Red, Inc.

### Note on Generated Code

The MIT License applies solely to the source code of the Ignite CLI and the source code of the included boilerplate project. Any source code generated by using the Ignite CLI, not including trademark assets described above, is owned entirely by the individual or entity that generated it.

However, some files may be added or installed automatically as part of the generation process (e.g. through npm packages). These files are subject to their own licenses, which may include more restrictive terms. It is your responsibility to review and comply with the licenses of any third-party dependencies included in the generated project.
