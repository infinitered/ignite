### Users
It is preferred that you use the ignite-cli instead of using the generator directly.   Only continue researching here if you are planning on adding new functionality that the CLI will call.

### Developers

## Requirements
Make sure you have [Yeoman](http://yeoman.io/):

`npm install -g yo`

Now install irrigate generator

`npm install -g generator-irrigate`

## Use
* `yo irrigate AppName` -- Generate new React Native app based off of [IR RNBase](https://github.com/infinitered/react_native_base)
* `yo irrigate:container ContainerName` -- Simple container
* `yo irrigate:screen ScreenName` -- An opinionated container
* `yo irrigate:component ComponentName` -- Creates a base component
* `yo irrigate:redux ActionReducerSet` -- Coming One Day :sunrise_over_mountains:
* `yo irrigate:saga SagaName` -- Coming One Day :sunrise_over_mountains:


## When Developing
Run `npm link` to link this code base locally and so you don't have to keep reinstalling, you've got a symlink.

## Compile
Code is written in ES2015+, so `npm run compile` will babelfy the source.

