# Releasing Ignite

Ignite is released via CI and [semantic release](https://semantic-release.gitbook.io/semantic-release/). When you merge a PR into `master`, you'll have the opportunity to edit the squash commit message, which determines what version level will be bumped as well as the automatically generated changelog that will be generated.

We like to include the PR author's name in the commit, as well, which will tag them in the release.

## A note about semver

Ignite, being a CLI/boilerplate and not a dependency, doesn't _strictly_ follow semver (there isn't really a public API being used, other than the CLI itself). We tend to use fixes and features as you'd expect, but major bumps tend to be more major features, stack updates, etc.

Since you're unlikely to be directly depending on Ignite in your app, this shouldn't affect you.

### bugfixes

```bash
fix(cli): Check for undefined in packager - fixes #1234 (#1300 by @jamonholmgren)
```

This bumps the last number, aka the 3 in `1.2.3` would be come 4 (`1.2.4`). We call this a "patch-level" release.

The important part is the `fix:` ... the parenthesis are optional, and simply provide a bolded category for the release notes. Go look at recent releases to see how this is displayed.

### features

```bash
feat(tests): Added react-native-testing-library (#1300 by @joshuayoes)
```

This will bump the middle number, aka the 2.3 in `1.2.3` would become 3.0 (`1.3.0`).

The important part is the `feat:` .. the parenthesis are optional, as above.

### breaking changes

For breaking changes (bumping the first number, aka `2.0.0`), you need to include `BREAKING CHANGE:` in your commit message. Generally, the title of the commit will be something like `fix:` or `feat:` or `deps:` with `BREAKING CHANGE:` in the body.

Example:

```bash
feat(cli): Changes init to new in CLI (#1234 by @GantMan)

BREAKING CHANGE: To spin up a new app, you'll use "ignite new" instead of "ignite init".
```

## Manual Beta Releases

For beta releases, the process is manual. Here are the steps:

### 1. Ensure you have access to the npm package

Run this to find your username:

```bash
npm whoami
```

In my case, it's `jamonholmgren`. Then run this to see if you have access:

```bash
npm author list ignite-cli
```

If your name is not included, you'll need to be added to the Infinite Red team:

[https://www.npmjs.com/settings/infinitered/members](https://www.npmjs.com/settings/infinitered/members)

Then run the author list command again to ensure you are listed.

### 2. Build the CLI

Run these commands from the Ignite root to clean & build the CLI:

```bash
yarn clean
yarn build
```

### 3. Update the version manually

Update the version to what you want. Note that you will NOT be checking this into git. Just set it before we release and then reset back to where it was afterward.

```json
{
  "name": "hello-world",
  "version": "9.5.0-beta.1",
  "private": true,
  "main": "node_modules/expo/AppEntry.js"
  // ...
}
```

### 4. Release!

You'll want to use `npm` for this, not `yarn`. I don't remember why.

```bash
npm publish --tag=next
```

This will publish a new version and set the @next tag to it. Note that `--tag=latest` is the same as not providing a tag and will publish as the main package version.

Check that the size of the newly published package is on the order of 3MB or less. If it's much more than that, you forgot to run `yarn clean`.

### 5. Test

If you do it as listed above, you'll be able to test the new beta version using something like `npx ignite-cli@next ...`.

### Rolling back a release

You can quickly roll back an erroneous release with:

```bash
npm unpublish ignite-cli@1.2.3
```

You have to do this [fairly quickly](https://docs.npmjs.com/policies/unpublish), as it won't work after a while.

Note that that version number is "burned", even if unpublished -- you'll have to increment the version and try again.
