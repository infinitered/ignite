# A Tour of the Ignite CLI Code Base

If you're interested in contributing to Ignite and want to know more about how the code base is set up, this is a great place to start!

Ignite is the result of over five years and well over 2,000 commits. We've put our blood, sweat, and tears into this boilerplate and given it away for free for many years. It's a great source of pride within Infinite Red and we spend a lot of time maintaining it.

Without further ado, let's get into it.

## TypeScript, ESLint, and Prettier

We use TypeScript extensively throughout Ignite CLI and Ignite's boilerplate (more on this later). So, in the root folder _and_ in the boilerplate folder, you'll find a `tsconfig.json` file that configures how we use TypeScript in the project.

When we build and publish the CLI, we compile the TypeScript source into JavaScript that will run with a reasonably recent version of Node.js on the command line.

We also use ESLint. The configuration for this is in the respective `package.json` files. Wherever possible, we try to keep our configuration in `package.json` rather than creating a new file in the root. ESLint is set up how Infinite Red prefers to write code.

Prettier is also used in this project. You won't find terminal semicolons, generally speaking. You'll be fine, don't panic.

## Documentation

We include a `README.md`, `LICENSE`, and `CODE_OF_CONDUCT.md` in the root of the folder. You should read all three of them. The license is a standard MIT permissive license, and the code of conduct ensures that people are to treat each other with respect.

There's also a `docs` folder which contains more documentation, including this file. They're all written in Markdown for a better/simpler developer authoring experience.

## CircleCI and GitHub

There are a couple folders at the root, `.circleci` and `.github`. These contain configuration for both services. Feel free to take a look.

## Automatic Releases

We use `semantic-release`, an excellent package that allows for automatically releasing new versions of Ignite based on commit messages. You can read more about how Infinite Red uses semantic-release in [this document](https://github.com/infinitered/open-source/blob/master/Continuous-Deployment-Setup-NPM.md).

## Manual Beta Releases

If you need to manually release a beta version, [the steps are documented here]().

## Gluegun

Ignite's CLI (`ignite-cli` on npm) is powered by [Gluegun](https://github.com/infinitered/gluegun). Gluegun is another Infinite Red library that makes building a full-featured command line interface (CLI) much easier.

## bin

This folder contains one file, `ignite`. This file is what is initially run when you run `npx ignite-cli`. It figures out if you're running in production or dev mode and loads the appropriate file from there. It uses `ts-node` for dev mode, which allows you to test changes without having to rebuild your TypeScript every time.

## src

In this folder are a couple folders that Gluegun uses, `commands` and `tools`. There's also a `cli.ts` and `types.ts` file.

`cli.ts` is where the whole thing kicks off (called from the `./bin/ignite` JS executable).

`types.ts` holds the project's primary types, and most of the project's source files import their types from this centralized place.

#### src/commands

This contains the various CLI commands.

For example, `npx ignite-cli new` would run the `src/commands/new.ts` file ([link](https://github.com/infinitered/ignite/blob/master/src/commands/new.ts)).

The code in these files tends to rely heavily on functions contained in `./src/tools`. It acts more as a coordinator between the command-line options that are passed in and then calls out to the appropriate tools to actually, you know, do the thing that the user wants to do. It handles user input and also (for the most part) communicating back to the user what happened.

#### src/tools

This folder contains functionality that is useful for Ignite to spin up new React Native apps and also inspect your environment, validate inputs, and whatnot.

Some of this functionality, such as the `packager.ts`, could probably be moved upstream into Gluegun. If you're reading this, perhaps you could help us with this effort! (Don't forget to update this section when you do!)

The rest is key functionality that is needed for Ignite CLI to do its job. If you're fixing bugs, chances are you'll be in this folder mucking around.

## test

Back in the root, there's a `test` folder. This contains Jest tests for Ignite CLI.

We rely heavily on integration tests, which is why Ignite CLI's test suite is kinda slow. We mainly spin up a new Ignite app (in a temporary location) and then inspect the textual output from the result of the command as well as look at folders and files that it generates to ensure that it's actually doing what we want it to do.

We also run the default tests in a generated Ignite app, which further ensures that the CLI is generating a valid Ignite app.

## boilerplate

In the root is another folder called `boilerplate`. This used to be called `Ignite Bowser` and was originally located here: https://github.com/infinitered/ignite-bowser [deprecated].

However, we now include the boilerplate in the main CLI for convenience (as of version 6.0). We used to support multiple boilerplates with Ignite CLI, but that was a fairly underutilized feature, so this made sense for maintainability. You can read more here: https://shift.infinite.red/introducing-ignite-4-0-flame-1dfc891f9966.

Inside the boilerplate is a functioning React Native app! That's right, you can actually _run_ the boilerplate app when you clone Ignite down to your machine. Just `cd` into the `boilerplate` folder, run `yarn` and `npx pod-install`, and then `npx react-native run-ios` or `npx react-native run-android`.

This is one of the best changes from the previous system, as you can now work on the boilerplate in realtime and not have to make changes, spin up a new app, test, repeat, which was such a slowwww process before.

We won't go into the boilerplate itself, here. You can instead check out the [Folder Structure](https://github.com/infinitered/ignite/blob/master/docs/Folder-Structure.md) documentation.

Happy contributing!
