![irrigate](https://raw.githubusercontent.com/GantMan/irrigate/master/_art/logo.png)

Hydrate React components/styles and screens the Infinite Red way.
## Requirements
Make sure you have [Yeoman](http://yeoman.io/):

`npm install -g yo`

Now install irrigate generator

`npm install -g generator-irrigate`

## Use
* `yo irrigate AppName` -- Coming Soon
* `yo irrigate:screen ContainerName` -- Simple container
* `yo irrigate:screen ScreenName` -- An opinionated container
* `yo irrigate:component ComponentName` -- Creates a base component
* `yo irrigate:redux ActionReducerSet` -- Coming One Day :sunrise_over_mountains:
* `yo irrigate:saga SagaName` -- Coming One Day :sunrise_over_mountains:


## When Developing
Run `nmp link` to link this code base locally and so you don't have to keep reinstalling, you've got a symlink.

## Compile
Code is written in ES2015+, so `npm run compile` will babelfy the source.

## TODO LIST
This was originally concevied without Yeoman, so there's a good bit of overlap with yeoman functionality over included functionality.   Once we're sure we're going 100% with Yeoman or not it would be ideal to unify the syntax.

Sagas

Reducers
