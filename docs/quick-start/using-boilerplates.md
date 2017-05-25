# Using Boilerplates

You can use an boilerplate as the starting point for your app by creating a new
Ignite CLI project with the `--boilerplate` (or `-b`) flag:

```
ignite new MyIgniteApp -b {boilerplate name}
```

Ignite CLI comes with a default boilerplate.

It creates your app with a host of opinions and options. This boilerplate reflects the way that we at Infinite Red prefer to start our apps. This is also Ignite CLI's default boilerplate; if you don't select a one, Ignite CLI will use this.

You can opt out of a boilerplate entirely by passing the option `--no-boilerplate`.  This will skip installing a boilerplate and only create a `ignite/ignite.json` file in your project; the bare minimum needed to become Ignite CLI sentient.

We intend to release new boilerplates as best practices change. For example, [React Navigation](https://reactnavigation.org) is a great new navigation library that we recently released in our brand new [`ignite-ir-boilerplate` boilerplate](https://github.com/infinitered/ignite-ir-boilerplate).

