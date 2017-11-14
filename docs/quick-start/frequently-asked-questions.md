# Frequently Asked Questions

*Question:* Where do I put 'non side-effect' business logic?

*Answer:* We don't really have a set convention, but [#1174](https://github.com/infinitered/ignite/issues/1174) should give you some ideas.

*Question:* How do I upgrade an old ignite project's dependencies?

*Answer:* It's still ReactNative ¯\\\_(ツ)\_/¯, but [#1124 may be what you're looking for.](https://github.com/infinitered/ignite/issues/1124)

*Question:* Why is `ignite new MyProject` not using latest react-native?

*Answer:* From [#1078](https://github.com/infinitered/ignite/issues/1078): Because ignite is a collection of components and those components all need to play nicely together. And sometimes they don't all cooperate when React Native's version increases.

*Question:* I'm new to React-Native and using Ignite. It would be so helpful to see a non-trivial real world application that uses Ignite.

*Answer:* A great example app is [ChainReact]https://github.com/infinitered/ChainReactApp, an app created for the annual conference by the same name. It was created by the makers of Ignite.
