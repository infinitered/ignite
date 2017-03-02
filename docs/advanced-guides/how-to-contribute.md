# How to Contribute to Ignite

First, thanks for reading this.

This is the quick & dirty version on how to get your development environment setup and ready for submitting pull requests to Ignite.

As you would expect, the `master` branch is Ignite's production branch. When you fork this repo, you can open pull requests against `master`. This is all common practice open source development, nothing surprising here.

## Requirements

* Node 7.6+
* NPM 4 (ships with Node 7)

## Getting Started

Head over to [https://github.com/infinitered/ignite](https://github.com/infinitered/ignite) and hit that shiny Fork button in the top right.

Next clone it and setup the dependencies.

```sh
git clone git@github.com:YOUR_GITHUB_USERNAME/ignite.git
cd ignite
npm install
npm run bootstrap
```

Sweet.

We now need to make the `ignite` command available globally. Usually end users will type `npm i -g ignite-cli` but we've chosen a hard life for ourselves as developers so a few more steps are required.

We must use `npm link`.

```sh
cd packages/ignite-cli
npm link
```

If you got an error, you probably have an older version of ignite installed.

If it was Ignite 1.0, `npm rm -g react-native-ignite` will sort you out.

If it was an earlier version of 2.0, then `rm /usr/local/bin/ignite && rm /usr/local/lib/node_modules/ignite` is what you want.

## Did it work?

Go to a brand new directory:

```sh
cd ~
mkdir fun
cd fun
ignite new UberForHeadLice
```

Answer a few questions and you're half way to disrupting the Grade 1 scalp hygiene industry.

Did it fail?  Come find us on our Slack at [http://community.infinite.red](http://community.infinite.red) in the #ignite channel.

<strong>For now, you can expect the version number to say 0.2.0.  I'm currently working on the build script and will bump this back up to 2.0.0-beta.1 (etc) when were ready. Today or tomorrow!  Sorry for the confusion.</strong>


## Important Directories

Ignite 2.0 lives under the `packages` directory.  We also have `package.json` and `lerna.json` in the root directory.

:rotating_light::rotating_light::rotating_light: Everything else is Ignite 1.0.  Why keep it?  Well, a step in the install process of Ignite 1.0 downloads our repo to use the base files.  So, we're going to keep those around until 2.0 launches.  Sorry about that.  Feel free to open your text editor starting at `packages` if you don't like the noise. :rotating_light::rotating_light::rotating_light:

Under the `packages` directory, you'll see:

* `ignite-cli` - this is the entry point.  It's the CLI, the core commands, and the main infrastructure.
* `ignite-infinite-red-app-template` - this is our recommended app template. It's what you get when you run `ignite new SweetApp`.
* `ignite-empty-app-template` - an app template that is `react-native init` but Ignite-ready due to one extra file: `ignite/ignite.json`.
* `ignite-basic-generators` - an Infinite Red set of generators that allow you to create components, screens, etc.
* `ignite-dev-screens` - A set of awesome developer-facing screens to help you build your app.
* `ignite-integration-tests` - is broken.  it makes me sad.  I will fix it.

## Debugging

As we iron out the kinks, you might find that passing `--debug` (as in `ignite new Thing --debug`) might help debugging things.
