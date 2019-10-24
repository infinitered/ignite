<p align="center"><img src="http://ir_public.s3.amazonaws.com/projects/ignite/ignite-logo-red-on-white-1000w.jpg" alt="header image" width="500px"></p>

<a href="https://badge.fury.io/js/ignite-cli" target="_blank"><img src="https://badge.fury.io/js/ignite-cli.svg" alt="npm version" height="20"></a>
<a href="http://community.infinite.red/"><img src="https://infiniteredcommunity.herokuapp.com/badge.svg"></a>
<a href="https://reactnative.cc" target="_blank"><img src="https://img.shields.io/badge/React%20Native%20Newsletter-Featured-blueviolet"></a>

# Ignite CLI

<p align="center">
  :fire: The hottest CLI for React Native: boilerplates, plugins, generators, and more. :fire:
  <br/>
</p>

<img width="794" alt="screen shot 2018-12-14 at 9 20 31 am" src="https://user-images.githubusercontent.com/1479215/50017668-a04c0200-ff81-11e8-9b61-a1ae28363798.png">

### Why Ignite CLI?

- **Easily spin up a new React Native app** with best practices built-in
- **No runtime!** This is a developer tool only, not a library you have to depend on and figure out how to upgrade
- **An ever-expanding list of [boilerplates](./BOILERPLATES.md) and [plugins](./PLUGINS.md)** to jump-start your app
- **An amazing [community](http://community.infinite.red)** of other Ignite / React Native developers when you need help
- **Battle tested** and used every day by the developers at Infinite Red and thousands of developers around the world
- **Works on macOS, Windows, and Linux** because not all React Native developers are on one platform
- **Saves an average of two weeks** on your React Native development

And you also get (by default) all of the sweet, sweet goodness of [our default boilerplate, Bowser](https://github.com/infinitered/ignite-bowser), or choose [one of many others](./BOILERPLATES.md).

> Ignite saved me a few weeks (if not months) getting started with React Native.

_Jon Ruddell_

## :arrow_down: Install

First, make sure you're set up for [React Native](https://facebook.github.io/react-native/docs/getting-started.html#content)

then...

Make sure you have a reasonably recent version of Node (7.6+ minimum). You can check your version of node by running

```
node -v
```

then...

Install [Yarn](https://yarnpkg.com/lang/en/docs/install/) for your system.

finally...

```
$ yarn global add ignite-cli
$ ignite new MyNewAppName
```

## Quick Example

Infinite Red provides two primary boilerplates; they are:

- **Andross** - the tried and true (React Navigation, Redux, & Redux Saga)
- **Bowser** - the latest and greatest (React Navigation, MobX State Tree, & TypeScript). [Why MST over redux?](https://github.com/infinitered/ignite-bowser#why-this-stack)

### Use Ignite Bowser: [Infinite Red Bowser boilerplate](https://github.com/infinitered/ignite-bowser)

Watch Jamon Holmgren's talk at React Live Amsterdam where he uses Ignite Bowser to build an app in less than 30 minutes:

[https://www.youtube.com/watch?v=Pb8MWkQ9GOc](https://www.youtube.com/watch?v=Pb8MWkQ9GOc)

```
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

### Use Ignite Andross [Infinite Red Andross boilerplate](https://github.com/infinitered/ignite-andross)

```
$ yarn global add ignite-cli
$ ignite new PizzaApp
  ( Choose Andross when prompted )
$ cd PizzaApp
$ ignite add maps
$ ignite add vector-icons
$ ignite generate screen PizzaLocationList
$ ignite generate component PizzaLocation
$ ignite generate map StoreLocator
$ ignite add i18n
$ ignite remove i18n
$ ignite --help
```

## :clipboard: Documentation :clipboard:

- Want to dive into the Ignite CLI documentation? [Go here](./docs/README.md)
- Looking for React Native's documentation? [Go here](http://facebook.github.io/react-native/docs/getting-started.html).

## :electric_plug: Plugins :electric_plug:

Check out the list of [Plugins](./PLUGINS.md).

## :plate_with_cutlery: Boilerplates :plate_with_cutlery:

Check out the list of [Boilerplates](./BOILERPLATES.md).

```
$ ignite new MyNewAppName -b ir-boilerplate
```

## :poop: Troubleshooting :poop:

If you run into problems, first search the issues in this repository. If you don't find anything, you can either [file an issue](https://github.com/infinitered/ignite/issues) or come talk to our friendly and active developers in the Infinite Red Community Slack ([community.infinite.red](http://community.infinite.red)).

## :telescope: Where to Go From Here :telescope:

#### [Watch a live coding talk](https://www.youtube.com/watch?v=Pb8MWkQ9GOc) using Ignite and Ignite Bowser

#### [Contribute to Ignite CLI](https://github.com/infinitered/ignite/blob/master/.github/CONTRIBUTING.md) - Getting up and running for your first pull request

#### [Take a tour of Ignite CLI source code](https://github.com/infinitered/ignite/blob/master/docs/advanced-guides/tour.md)

#### [Get inspired by apps built with Ignite](https://github.com/infinitered/ignite/blob/master/docs/quick-start/built-with-ignite.md)

#### [Chat with us on the IR Community](http://community.infinite.red) - Infinite Red devs standing by

#### [Who are We?](https://infinite.red) - Learn More About Infinite Red

#### [Project Web Page](https://infinite.red/ignite/) - Ignite on Infinite Red

#### [Check out Gluegun](https://github.com/infinitered/gluegun) - Ignite CLI is powered by Gluegun, which lets you build CLI apps painlessly!

## :heart: Special Thanks :heart:

Thank you to the numerous [contributors of Ignite CLI](https://github.com/infinitered/ignite/graphs/contributors). Our awe and appreciation for the friendliness of Open Source is the fuel for all [Infinite Red](https://infinite.red/) projects like Ignite CLI.

## Premium Support

[Ignite CLI](https://infinite.red/ignite), as an open source project, is free to use and always will be. To help support providing Ignite CLI and boilerplates for free, [Infinite Red](https://infinite.red/) offers premium [React Native](https://infinite.red/react-native) app design/development services. Get in touch [here](https://infinite.red/contact) or email us at [hello@infinite.red](mailto:hello@infinite.red).
