# Frequently Asked Questions

*Question:* Where do I put 'non side-effect' business logic?

*Answer:* We don't really have a set convention, but [#1174](https://github.com/infinitered/ignite/issues/1174) should give you some ideas.

*Question:* How do I upgrade an old ignite project's dependencies?

*Answer:* It's still ReactNative ¯\\\_(ツ)\_/¯, but [#1124 may be what you're looking for.](https://github.com/infinitered/ignite/issues/1124)

*Question:* Why is `ignite new MyProject` not using latest react-native?

*Answer:* From [#1078](https://github.com/infinitered/ignite/issues/1078): Because ignite is a collection of components and those components all need to play nicely together. And sometimes they don't all cooperate when React Native's version increases.

*Question:* What is a good non-trivial real world example of an Ignite project?

*Answer:* See the [ChainReact]https://github.com/infinitered/ChainReactApp app for the React-Native conference of the same name. It was created by the authors of Ignite.
