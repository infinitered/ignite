<a href="https://badge.fury.io/js/ignite-cli" target="_blank"><img src="https://badge.fury.io/js/ignite-cli.svg" alt="npm version" height="20"></a>
<a href="https://semaphoreci.com/ir/ignite" target="_blank"><img src=https://semaphoreci.com/api/v1/ir/ignite/branches/master/shields_badge.svg alt='Build Status'/></a>
[![Coverage Status](https://coveralls.io/repos/github/infinitered/ignite/badge.svg?branch=master)](https://coveralls.io/github/infinitered/ignite?branch=master)
<a href="http://community.infinite.red/">
  <img src="https://infiniteredcommunity.herokuapp.com/badge.svg">
</a>
<a href="https://www.codacy.com/app/gantman/ignite?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=infinitered/ignite&amp;utm_campaign=Badge_Grade" target="_blank"><img src="https://api.codacy.com/project/badge/Grade/1c6e04abe7224bdc88095129b5eb43fb"/></a>
<img src=https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style%3Dflat alt='js-standard-style'/>

### Ignite

<p align="center">
  <a href="https://infinite.red/ignite"><img src="https://cloud.githubusercontent.com/assets/1479215/23348302/941b2d54-fc5d-11e6-9042-62501fa90b05.png" alt="Ignite 2 screenshot" width="300px"></a>
</p>

<p align="center">
  :fire: The hottest CLI for React Native, boilerplates, plugins, generators, and more. :fire:
  <br/>
</p>

### Ignite 2 is here!

After months of work and sweat and tears, Ignite 2 (beta) has landed! We're incredibly proud of where Ignite 2 is and where it's headed.

Cliff notes version of the difference between Ignite 1 and 2:

Ignite 1 was a (very nice!) [React Native](http://facebook.github.io/react-native/docs/getting-started.html) boilerplate. Ignite 2 is a CLI and generator for React Native with boilerplates, plugins, and more. Where before you had one choice -- [Infinite Red](https://infinite.red)'s boilerplate -- now you can choose from many boilerplates and also add standalone plugins as you need them. It's much more modular and extensible than Ignite 1.

If you really liked Ignite 1 as it was, then not much has changed! You just run `ignite new MyApp --max` and everything feels pretty normal from there.


### Quick Example

```
$ npm install -g ignite-cli
$ ignite new PizzaApp
$ cd PizzaApp
$ ignite add maps
$ ignite add vector-icons
$ ignite generate screen PizzaLocationList
$ ignite generate component PizzaLocation
$ ignite generate map StoreLocator
$ ignite add i18n
$ ignite remove i18n
$ ignite i love you
```

### Why Ignite?

* Easily spin up a new React Native app with best practices built-in
* No runtime! This is a developer tool only, not a library you have to depend on
* An ever-expanding list of boilerplates and plugins
* Powerful but well-defined behavior
* Battle tested and used every day by the developers at Infinite Red

And you also get (by default) all of the sweet, sweet goodness of our default boilerplate:

* Works with iOS and Android out of the box
* Useful generators, including components, screens, styles, and more
* API-ready -- hook it up and start talking to your server
* Standard-js compliant code
* Redux and redux-sagas state management
* Well-documented code
* Gorgeous Ava tests
* and much, much more... [go check out the readme](https://github.com/infinitered/ignite-ir-boilerplate-2016) (WIP during alpha)

## :arrow_down: Install

First, make sure you're set up for [React Native](https://facebook.github.io/react-native/docs/getting-started.html#content)

then...

Make sure you have Node 7.6+

While you are free to use whichever node version manager you like, we like using [n](https://github.com/tj/n)

If you currently use [nvm](https://github.com/creationix/nvm) and would like to switch, follow [these steps](./docs/quick-start/nvm-to-n.md)

You can check your version of node by running

```
node -v
```

then install [Yarn](https://yarnpkg.com/lang/en/docs/install/) for your system

finally...

_All global installs below are using npm over yarn because of [this bug](https://github.com/yarnpkg/yarn/issues/859) on Windows._
```
$ npm install -g ignite-cli
$ ignite new MyNewAppName
```
## :clipboard: Documentation :clipboard:

Want to dive into the Ignite 2 documentation? [Go here](./docs/README.md)
Looking for React Native's documentation? [Go here](http://facebook.github.io/react-native/docs/getting-started.html) 

## :electric_plug: Plugins :electric_plug:

Check out the list of [Plugins](./PLUGINS.md)

## :poop: Troubleshooting :poop:

If you run into problems, first search the issues in this repository. If you don't find anything, you can either [file an issue](https://github.com/infinitered/ignite/issues) or come talk to our friendly developers in the Infinite Red Community Slack ([community.infinite.red](http://community.infinite.red)).

## :telescope: Where to Go From Here :telescope:

#### [Contribute to Ignite](https://github.com/infinitered/ignite/blob/master/.github/CONTRIBUTING.md) - Getting up and running for your first pull request
#### [Chat with us on the IR Community](http://community.infinite.red) - Infinite Red devs standing by
#### [Who are We?](https://infinite.red) - Learn More About Infinite Red
#### [Project Web Page](https://infinite.red/ignite/) - Ignite on Infinite Red

## :heart: Special Thanks :heart:
Thank you to the numerous [contributors of Ignite](https://github.com/infinitered/ignite/graphs/contributors). Our awe and appreciation for the friendliness of Open Source is the fuel for all [Infinite Red](https://infinite.red/) projects like Ignite.

## Premium Support

[Ignite](https://infinite.red/ignite), as open source projects, is free to use and always will be. [Infinite Red](https://infinite.red/) offers premium Ignite support and general mobile app design/development services. Email us at [hello@infinite.red](mailto:hello@infinite.red) to get in touch with us for more details.

