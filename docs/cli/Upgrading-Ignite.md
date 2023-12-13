# Upgrading Ignite

If you run into problems, first search the issues in this repository. If you don't find anything, you can come talk to our friendly and active developers in the Infinite Red Community Slack ([community.infinite.red](http://community.infinite.red)).

## Troubleshooting setup

### Remove a previous global install

Double check if the greatest Ignite is installed on your machine with:

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
