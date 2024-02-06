# Models folder

Ignite's perhaps most distinctive feature is its use of [MobX-State-Tree](https://mobx-state-tree.js.org/) (MST). This is a powerful and full-featured state management library that allows you to create strongly-typed observable models that can be used throughout your app and rerender on update intelligently without using selectors.

We have [very good reasons](../../../concept/MobX-State-Tree.md) for using MST, but if after reading that doc you're still not keen on using it, we also have an [Ignite Cookbook recipe](https://ignitecookbook.com/docs/recipes/Redux) for removing MST and using Redux instead.

## RootStore

The root of your MST tree is a single store (although you can create more if you want!). This usually contains high-level data that is used throughout your app, such as the user's authentication status, their locale, and more. It often contains other stores, such as AuthenticationStore, UserStore, ArticleStore, OrderStore, and so on.

```typescript
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { EpisodeStoreModel } from "./EpisodeStore"

export const RootStoreModel = types.model("RootStore", {
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  episodeStore: types.optional(EpisodeStoreModel, {}),
})
```

Each "store" is then made up of "models" (see below). (Note: In MST, "stores" and "models" are often used interchangeably, but we generally think of stores as being containers of multiple different models.)

## Models

You can [generate](../../../concept/Generators.md) models using the `npx ignite-cli generate model` command. This will create a new file in the `app/models` folder. You can also create models manually if you prefer.

```typescript
import { types } from "mobx-state-tree"

/**
 * This represents an episode of React Native Radio.
 */
export const EpisodeModel = types.model("Episode", {
  guid: types.identifier,
  title: "",
  link: "",
  author: "",
  thumbnail: "",
  description: "",
  content: "",
  categories: types.array(types.string),
})
```

You will be able to create instances and use them in observed components like this:

```typescript
import { useStores } from "../models/root-store"
import { observer } from "mobx-react-lite"

export const EpisodeScreen = observer(() => {
  const { episodeStore } = useStores()

  // automatically re-renders when the episode title changes
  // or if you change the current episode to a different one
  return <Text>{episodeStore.currentEpisode.title}</Text>
})
```

Explore the existing models in your models folder (if you left demo code in) to see how they work. You can also read the [MST docs](https://mobx-state-tree.js.org/) for more information.

And of course, you can always ask questions in the [Infinite Red Community Slack](http://community.infinite.red) or the [MobX-State-Tree GitHub Discussions group](https://github.com/mobxjs/mobx-state-tree/discussions).
