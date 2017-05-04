# Using Boilerplates

You can use an boilerplate as the starting point for your app by creating a new
Ignite CLI project with the `--boilerplate` (or `-b`) flag:

```
ignite new MyIgniteApp -b {boilerplate name}
```

Ignite CLI comes with a default boilerplate.

It creates your app with a host of opinions and options. This boilerplate reflects the way that we at Infinite Red prefer to start our apps. This is also Ignite CLI's default boilerplate; if you don't select a one, Ignite CLI will use this.

You can opt out of a boilerplate entirely by passing the option `--no-boilerplate`.  This will skip installing a boilerplate and only create a `ignite/ignite.json` file in your project; the bare minimum needed to become Ignite CLI sentient.

We intend to release new boilerplates as best practices change. For example, [React Navigation](https://reactnavigation.org) is a great new navigation library that we intend to support as soon as we feel it's ready. It will likely be released as a new boilerplate package, which in a future release of Ignite will be set to default once it's stable. You can view an unstable version in our [`ignite-ir-next` boilerplate](https://github.com/infinitered/ignite-ir-next).

