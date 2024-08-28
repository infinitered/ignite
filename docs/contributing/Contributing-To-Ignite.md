---
sidebar_position: 150
---

# Contributing to Ignite

## Documentation

We include a `README.md`, `LICENSE`, and `CODE_OF_CONDUCT.md` in the root of the folder. You should read all three of them. The license is a standard MIT permissive license, and the code of conduct ensures that people are to treat each other with respect.

## Testing changes from your local copy of Ignite

If you want to test changes to the Ignite CLI that you have in a local git repo, that haven't been published to NPM, you can run the `bin/ignite` script via node.

```sh
# Generate a new Ignite app from your local copy of the Ignite CLI
node your-ignite-repo-clone/bin/ignite new PizzaApp

# Use a built-in generator from your local copy
node your-ignite-repo-clone/bin/ignite generate component OrderButton
```

In addition, we have automated tests you can run with `yarn test`.

## Further reading

Check out [A Tour of the Ignite CLI Code Base](./Tour-of-Ignite.md) for more information about Ignite's structure and features.

We also have a guide to [Releasing Ignite](./Releasing-Ignite.md).
