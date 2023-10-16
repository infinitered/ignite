# Welcome to the Ignite Contributing Guide

Thank you for investing your time in contributing to our project! There are two parts of Ignite that you can contribute to:

## The Ignite CLI

The Ignite CLI is a command-line tool that helps you create new Ignite projects, as well as generate components, screens, MST models, and more. The CLI can be found in the root of the project under `./src`.

You can test any changes made to the CLI locally by running the following command from the root of the project:

```bash
yarn build && ./bin/ignite new PizzaApp
```

> You can also watch for changes by running `yarn build:watch` in one terminal window and `./bin/ignite new PizzaApp` in another.

## The Ignite Boilerplate

The Ignite Boilerplate is the React Native project that is created when you run `ignite new`. It can be found in the `./boilerplate` directory and is a standalone React Native project. You can `cd` into the directory and run `yarn` to install dependencies and then `yarn ios` or `yarn android` to start the app.
