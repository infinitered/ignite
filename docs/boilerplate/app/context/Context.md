# Context folder

The `context` folder is where you can put your [React context providers](https://react.dev/learn/passing-data-deeply-with-context) or any other state management solutions you choose to use in your Ignited app.

Ignite used to include [mobx-state-tree](https://mobx-state-tree.js.org/) as the default state management solution, but over time our projects have had more and more diverse state management solutions. We still love MST, and it was our go-to solution for many years, but shipping it by default with Ignite makes less sense now that there are so many other great options out there. Since we haven't settled on a single state management solution, simple React contexts are the default in this boilerplate.

Currently this folder contains the following React contexts that are meant to be simple examples of how to use React context in your app:

- `AuthContext`: This is a basic context that provides the demo app with a way to manage simple authentication state. We persist the data using MMKV hooks in this context provider. The app can consume the AuthContext wih the `useAuth` hook.
- `EpisodeContext`: This context provides the demo app with a way to manage the list of episodes in the demo podcast screen. This context provides a `useEpisodes` hook that can be used to fetch the episodes and manage the state of the list.

## State management solutions

There are many state management solutions available for React Native apps. React context comes built in and is a is a reasonable solution for many apps. But you may want to consider other solutions depending on your app's complexity and needs.

Here are some popular state management solutions you might consider (not in any particular order):

- Redux using [Redux Toolkit](https://github.com/reduxjs/redux-toolkit): A predictable state container for JavaScript apps. It is widely used and has a large ecosystem of libraries and tools.
- [MobX](https://mobx.js.org/README.html): A simple, scalable state management solution that uses observable data structures.
- [Mobx State Tree (MST)](https://mobx-state-tree.js.org/): If MobX is a state management "engine", then MobX-State-Tree is a luxury car. MST gives you the structure, tools, and other features to get you where you're going.
- [Zustand](https://github.com/pmndrs/zustand): A small, fast and scalable bearbones state-management solution using simplified flux principles.
- [Legend State](https://github.com/LegendApp/legend-state): A super fast all-in-one state and sync library.
- [React Query](https://react-query.tanstack.com/): A powerful data-fetching library that can also manage local state.
- [XState](https://xstate.js.org/): Uses event-driven programming, state machines, statecharts, and the actor model to handle complex logic in predictable, robust, and visual ways.
