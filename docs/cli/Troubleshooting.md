---
sidebar_position: 145
---

# Troubleshooting

If you run into problems, first search the issues in the [GitHub repository](https://github.com/infinitered/ignite/issues). If you don't find anything, you can come talk to our friendly and active developers in the Infinite Red Community Slack ([community.infinite.red](http://community.infinite.red)).

## Troubleshooting setup

We recommend using `npx ignite-cli@latest [command]` to ensure you're using the latest & greatest Ignite.

### Remove a previous global install

You might run into version conflicts or environment differences if you have Ignite installed globally.
Check if Ignite is installed globally on your machine with:

```bash
ignite --info          # Should output cli information
where ignite           # identify where it's installed
```

You can uninstall previous versions of the cli with:

```bash
npm uninstall --global ignite-cli
# or
yarn global remove ignite-cli
```
