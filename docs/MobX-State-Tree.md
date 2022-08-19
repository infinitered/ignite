# Why MobX-State-Tree?

If you've used Ignite Andross (the first Ignite stack), you know we formerly used Redux for state management, as does much of the community. However, we encountered some pain points with Redux so went in search of a different solution to meet our needs and landed on `mobx-state-tree` (also known as "MST"). We find that it’s a great middle-ground between completely structured (like `redux`) and completely freestyle (like `mobx`). It brings more than just state-management to the table as well (such as dependency injection, serialization, and lifecycle events).

### Some Highlights of MST

MST is...

- Intuitive
  - With concepts like `props` and `actions`, it feels familiar for React developers
  - Updating your data means calling functions on objects, rather than dispatching actions.
  - Feels similar to relational databases, with concepts like `identifiers` (primary keys), `references` (foreign keys), and `views` (calculated fields)
- Streamlined
  - No more `actionTypes`, `actionCreators`, or `reducers`
  - You don't have to declare your usage intentions with `mapStateToProps`; they are inferred
  - Side-effects are built-in; no need for 3rd party libraries like `redux-saga`, `redux-observable`, or `redux-thunk`
  - Immutability is built-in - no need for `immutable.js` or `seamless-immutable`
  - `types.compose` and `model.extend` allow for easy code-sharing of common patterns
- More than state management
  - Lifecycle hooks like `afterCreate`, `preProcessSnapshot`, and `beforeDestroy` let you have control over your data at various points in its lifecycle
- Performant
  - Round-trip store writes are much faster
  - Computed values (views) are only calculated when needed
  - `mobx-react-lite` makes React "MobX-aware" and only re-renders when absolutely necessary
- Customizable
  - MST ships with pre-built middlewares, including one which allows for [Redux interoperability](https://github.com/mobxjs/mobx-state-tree/blob/master/packages/mst-middlewares/README.md#redux). These middlewares can also serve as examples to create your own!

### Downsides

We also recognize no state management solution is perfect. MST has some known downfalls:

- Integration with TypeScript is clunky at times. MST's own typing system is sometimes at odds with what TypeScript wants
- `mobx` and `mobx-state-tree` both seem to have "magic" or "sorcery" that makes issues less straightforward to debug because you don't always have a clear picture of what's happening (but using [Reactotron](https://github.com/infinitered/reactotron), which has `mobx-state-tree` support built-in, helps a lot). The [MobX docs](https://mobx.js.org/) can also help illuminate some of the magic.
- The user base is small, so finding help on GitHub or Stack overflow is less convenient (however, the [Infinite Red Slack Community](http://community.infinite.red), as well as the [MobX State Tree GitHub Discussions group](https://github.com/mobxjs/mobx-state-tree/discussions) are both very helpful)
- Fatal errors are sometimes too-easily triggered and error messages can be verbose and hard to grok
- The API has a large surface area and the docs tend to be technical and unfriendly

## Learning MobX State Tree

MobX and MobX State Tree can be a lot to learn if you're coming from Redux, so here are a few of our favorite resources to learn the basics:

- Be sure to check out the official [Getting Started](https://mobx-state-tree.js.org/intro/getting-started) guide for MobX State Tree.

- There is also a free [egghead.io course](https://egghead.io/courses/manage-application-state-with-mobx-state-tree).

- For a great explanation and walkthrough of the basics, check out [State Management with MobX State Tree](https://medium.com/react-native-training/state-management-with-mobx-state-tree-373f9f2dc68a) by React Native Training.

- And for more in-depth reading, the [official documentation](https://github.com/mobxjs/mobx-state-tree/blob/master/README.md) is a great resource.

- The official docs for [MobX](https://mobx.js.org/) are another important resource, since MST is built on MobX.

- For help from real people in the community, make sure to check out the [Infinite Red Community Slack](https://community.infinite.red) as well as the [MobX State Tree GitHub Discussions group](https://github.com/mobxjs/mobx-state-tree/discussions).

- To see example code bases using Ignite (and MST), check out these repositories:
- https://github.com/robinheinze/ignite-trivia (based on [this tutorial](https://shift.infinite.red/creating-a-trivia-app-with-ignite-bowser-part-1-1987cc6e93a1) by @robinheinze)
- https://github.com/jamonholmgren/PlayerPopularity (simple implementation)
- https://github.com/jamonholmgren/TrailBlazers (simple implementation with hooks)
- https://github.com/infinitered/ChainReactApp2019 (more in-depth implementation)
