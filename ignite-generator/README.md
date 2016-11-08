### Users
It is preferred that you use the ignite-cli instead of using the generator directly.   Only continue researching here if you are planning on adding new functionality that the CLI will call.

### Developers

## Requirements
Make sure you have [Yeoman](http://yeoman.io/):

`npm install -g yo`

Now install ignite generator

`npm install -g generator-react-native-ignite`

## Use
* `yo react-native-ignite AppName` -- Generate new React Native app based off of [IR RNBase](https://github.com/infinitered/ignite)
* `yo react-native-ignite:container ContainerName` -- Simple container
* `yo react-native-ignite:screen ScreenName` -- An opinionated container
* `yo react-native-ignite:component ComponentName` -- Creates a base component
* `yo react-native-ignite:redux ReduxName` --  Create a Redux with three actions: request, success and failure.
* `yo react-native-ignite:saga SagaName` -- Saga for use with `redux-saga`


## When Developing
Run `npm link` to link this code base locally and so you don't have to keep reinstalling, you've got a symlink.
Have a look :eyes: at our helpers in `src\utilties.js`, to save reinventing the wheel. 

## Compile
Code is written in ES2015+, so `npm run compile` will babelfy the source.
