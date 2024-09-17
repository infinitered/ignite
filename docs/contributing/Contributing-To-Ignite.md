---
sidebar_position: 150
---

# Contributing to Ignite

## Documentation

We include a `README.md`, `LICENSE`, and `CODE_OF_CONDUCT.md` in the root of the folder. You should read all three of them. The license is a standard MIT permissive license, and the code of conduct ensures that people are to treat each other with respect.

## For contributors

### Testing changes from your local copy of Ignite

If you want to test changes to the Ignite CLI that you have in a local git repo, that haven't been published to NPM, you can run the `bin/ignite` script via node.

```sh
# Generate a new Ignite app from your local copy of the Ignite CLI
node your-ignite-repo-clone/bin/ignite new PizzaApp

# Use a built-in generator from your local copy
node your-ignite-repo-clone/bin/ignite generate component OrderButton
```

In addition, we have automated tests you can run with `yarn test`.

### Making PRs

We appreciate your contribution! To make it easier for us to review, please make sure to add a clear title and description that explains both what the change is, and why it's useful, if applicable.

Maintainers may choose to rewrite this description for our changelog, or squash your commits when merging.

## For maintainers

### Merging PRs

When merging PRs, we need maintainers to make sure that there's appropriately formatted commit message(s) for semantic-release to document changes for the release notes and pick the next-released version for Ignite. See [Releasing Ignite](./Releasing-Ignite.md) for more info on how to format commit messages.

You have two choices when merging to Ignite:

1. Merge with a merge commit, keeping the original commits. In this case, if the original commits are using the semantic-release conventions, those messages will be used for the changelog and release determinations.
  1. If everything in the PR is sufficiently documented by those commit messages, you don't need to add anything to the commit message.
  2. If there are no change entries, you should update the merge commit message when you merge to match the expected conventions.
2. Alternatively, if you don't want to keep the original commits, you can use a squash merge. You will need to update the merge commit message to match semantic-release conventions as required by the particular change.

Not every included commit in a PR needs to be formatted this way, only enough commits to ensure relevant changes have been documented.

In addition, if there's a feature branch for a future version of Ignite, you'll need to merge up `master` into this feature branch. See the next section for instructions.

### Managing future version branches

When we're working on a new release of Ignite, we'll create a feature branch for work that's exclusive to that version (e.g., `v10`).

If such a branch exists, whenever you merge a commit, you should also merge that change up from `master`->`next-version-branch`.

To do so, update your local branches, check out `next-version-branch`, and run `git merge --no-ff origin/master`. You do not need to customize this merge commit message.

It's a good idea to create a pull request for this merge-up if anyone else is working on Ignite along with you, so that they can be made aware of changes to `next-version-branch` ASAP. It also us to ensure tests are run before you update the branch.

## Further reading

Check out [A Tour of the Ignite CLI Code Base](./Tour-of-Ignite.md) for more information about Ignite's structure and features.

We also have a guide to [Releasing Ignite](./Releasing-Ignite.md).
