---
sidebar_position: 1
---

# Ignite - the battle-tested React Native boilerplate

With over seven years of active development, Ignite is the most popular React Native app starter boilerplate for both Expo and bare React Native.

This is the React Native stack that the [Infinite Red](https://infinite.red) team uses on a day-to-day basis to build client apps. Developers who use Ignite report that it saves them two to four weeks of time on average off the beginning nd improves their confidence over the lifetime of the entire project.

## Getting Started

If you just want to kick off a new project, you can do that with the Ignite CLI:

```terminal
npx ignite-cli@latest new pizza-app
```

Prerequisites:

- Node.js LTS release or greater
- Recommended: recent versions of Xcode and Android Studio
- Recommended: Yarn or Bun package manager
- Recommended: macOS (for iOS development)

### Intro to Ignite

If you're new to Ignite, check out these resources:

- Check out the [Getting Started with Ignite](https://www.youtube.com/watch?v=KOSvDlFyg20) video for a 13 minute overview!
- Jamon's Code Quest on [What's new in Ignite 9](https://www.youtube.com/watch?v=QmkMsUYrTlk)
- Check out our [Guide](./Guide.md) for a walkthrough of the boilerplate project and how to use it

<table>
<tr>
<td><img alt="ignite-01-sign-in" src="https://github.com/infinitered/ir-docs/assets/1479215/d84d5efa-363d-44bc-a7b3-6ec70d878ae3" /></td>
<td><img alt="ignite-02-welcome" src="https://github.com/infinitered/ir-docs/assets/1479215/8cc22d39-f55c-4c0d-a847-463159f01c86" /></td>
<td><img alt="ignite-03-component" src="https://github.com/infinitered/ir-docs/assets/1479215/e86e3536-1896-411f-8c96-b5d014fa94e6" /></td>
</tr><tr>
<td><img alt="ignite-04-drawer" src="https://github.com/infinitered/ir-docs/assets/1479215/5bfbffd3-e10e-4b3e-ba1f-8c7ab8ae5cfa" /></td>
<td><img alt="ignite-06-radio" src="https://github.com/infinitered/ir-docs/assets/1479215/332a18b2-0b55-440a-9776-8440c9ecdf16" /></td>
<td><img alt="ignite-07-debug" src="https://github.com/infinitered/ir-docs/assets/1479215/248097a0-7fb9-46cc-9e64-c675c3b8b7cc" /></td>
</tr>
</table>

## Background

Ignite was born in early 2016 when two teams at [Infinite Red](https://infinite.red) were building new React Native apps for clients. As we built the projects, we noticed we were running into similar problems on each app -- what navigation library should we use? What about folder structure? How could we make sure our stack aligns across many future projects?

We built Ignite as a CLI and boilerplate project based on our learnings, and have continuously improved it over the past seven years. Along the way, we've built up an amazing [community of developers](https://community.infinite.red) who use Ignite to build their apps, share techniques, and contribute back to the project.

The guiding philosophy behind Ignite is that nothing makes it into the stack unless it's been proven on projects that Infinite Red has built. This means it evolves a bit slower than other boilerplates, but unlike others, it's based on real-world experience and not the latest new thing. But we also are continuously developing and pushing the stack forward, so it never stagnates.

With Ignite, you get proven patterns, best practices, and a robust, seasoned community. **Don't go alone!**

## Documentation

- [Command-line Interface (CLI)](./cli/Ignite-CLI.md) - How to spin up a new Ignite app
  - [CLI Generators](./concept/Generators.md) - Generate components, screens, and more
  - [Troubleshooting](./cli/Troubleshooting.md)
- [Components](./boilerplate/app/components/Components.md) - Ignite's built-in UI components
  - [AutoImage](./boilerplate/app/components/AutoImage.md)
  - [Button](./boilerplate/app/components/Button.md)
  - [Card](./boilerplate/app/components/Card.md)
  - [EmptyState](./boilerplate/app/components/EmptyState.md)
  - [Header](./boilerplate/app/components/Header.md)
  - [Icon](./boilerplate/app/components/Icon.md)
  - [ListItem](./boilerplate/app/components/ListItem.md)
  - [ListView](./boilerplate/app/components/ListView.md)
  - [Screen](./boilerplate/app/components/Screen.md)
  - [Text](./boilerplate/app/components/Text.md)
  - [TextField](./boilerplate/app/components/TextField.md)
- [Concepts](./concept/Concepts.md) - An overview of the concepts behind developing with Ignite

  - [Expo and Ignite](./expo/Expo-and-Ignite.md) - How Expo fits in with Ignite, and whether you should use it
  - [Folder Structure](./boilerplate/Boilerplate.md) - An overview of the Ignite folder structure
  - [Generators](./concept/Generators.md) - Everything you need to know about Ignite generators
  - [Generator Templates](./concept/Generator-Templates.md) - Writing your own generator templates
  - [Internationalization](./boilerplate/app/i18n/) — How to Internationalize your app
  - [Why MobX-State-Tree?](./concept/MobX-State-Tree.md) - All about MobX-State-Tree, and why we use it instead of Redux
  - [Navigation](./boilerplate/app/navigators/Navigation.md) - How [React Navigation](https://reactnavigation.org/docs/getting-started/) is used to navigate through your screens
  - [Styling](./concept/Styling.md) - How we approach styling components in Ignite
  - [Testing](./concept/Testing.md) - How to test your Ignite app
  - [TypeScript](./concept/TypeScript.md) - An explanation of TypeScript in Ignite and lots of resources
  - [Upgrades](./concept/Upgrades.md) - How to upgrade your app to the latest and greatest Ignite patterns

- [Theming](./boilerplate/app/theme/Theming.md) - How to customize the look and feel of your app
  - [Colors & Palettes](./boilerplate/app/theme/colors.ts.md) - Explanation of our palette-based approach to colors
  - [Fonts & Typography](./boilerplate/app/theme/typography.ts.md) - How we define fonts in a semantic way
  - [Spacing](./boilerplate/app/theme/spacing.ts.md) - How to approach consistent spacing throughout your Ignite app
- [Utils](./boilerplate/app/utils/Utils.md) - Collection of helpful utilities
  - [useSafeAreaInsetsStyle](./boilerplate/app/utils/useSafeAreaInsetsStyle.ts.md)
  - [useHeader](./boilerplate/app/utils/useHeader.tsx.md)

## Contributing

- [Tour of Ignite](./contributing/Tour-of-Ignite.md) - Tour of the Ignite code base for interested contributors
- [Releasing Ignite](./contributing/Releasing-Ignite.md) - How we release Ignite
