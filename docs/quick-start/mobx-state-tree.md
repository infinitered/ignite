# # React Native + mobx-state-tree
We need a guide to on how to use `mobx-state-tree` (or `mst` for short), so @robinheinze and I are putting this one together.

This is the output of our brainstorm on what to cover.

Feedback welcome!


## Audience - Who is this for?
* People upgrading from Ignite 2 to Ignite 3
* People discovering Ignite for the first time.


# Possible Sections
* Intro to `mst`.  Why.
* What is our dialect here at Infinite Red?
* What problems have we seen so far?


## Why?
There's a bazillion other state management libs. Why a bazillion + 1?

Because it does a lot for you.  It’s a great middle ground between completely structure (like `redux`) and completely freestyle (like `mobx`).

It brings more than just state-management to the table as well (such as dependency injection, serialization, and lifecycle events.

## Small Note about TypeScript
Not only have we switched to `mst` from `redux`, but we also switched from `JavaScript` to `TypeScript`.  


# Some of the Highlights
* Mostly intuitive (concept props and actions).
* Computed values are only recalculated if their upstream sources change.
* Computed values are only calculated if someone care
* Some guidance is given to how you should structure your app
* It feels database-y - (identifiers & references & views)
* `onSnapshot`, `onAction`, and `onPatch` is brilliant
* `extends` & `compose` is pretty great
* life cycle events are pretty great

# Some of the Fumbles
* Typing with `TypeScript` can be tricky.  Since a model can be made out of separate blocks, the type system doesn’t have a complete picture.
* Some people have said `mobx` and `mobx-state-tree` has too much sorcery or magic.
* Finding information about it is hard on the inter-tubes.  It’s a bit of a sleeper library.
* Error messages and tooltips are sometimes hilariously verbose.
* The api has a huge surface area.
* Docs aren't beginner-friendly.  They’re very advanced-friendly though.
* Not a fan of the name `views` for computed fields.

# Installing
3 Packages.

```sh
# if you use npm
npm i mobx-state-tree mobx mobx-react

# if you use yarn
yarn add mobx-state-tree mobx mobx-react
```

# Example
We want to have a canonical example.  Something @derekgreenberg would call “completing the circuit”.

A Login form can be a little complicated, so we talked about using the github api to retrieve the last 5-10 commits from a repo.

It would cover:

* a root store
* a store model with a status field
* a record (have a view)
* a `FlatList` illustrating a hack for observing
* a screen illustrating  `@observer` & `@inject`
* a component illustrating `@observer` alone
* an action to fetch (last 5 commits) -- show the transform
* an action to mutate (setStatus)
* an api (via environment)


# Compared To Redux
#### Better than `redux`
* you don't declare your usage intentions with `mapStateToProps`, they are inferred (no need to use `reselect`)
* you don't `dispatch` actions, you call functions (feels idiomatic to `js`)
* no more `action types`
* no more `actionCreators`
* no more `reducers` * (your functions are now guardians of state)
* no more needing 3rd party library to perform side effects (`redux-saga`, `redux-observable`, `redux-thunk`)
* no need to use `immutable.js` or `seamless-immutable` to enforce immutability

#### Worse than `redux`
* `redux` has much better ecosystem of add-ons, middleware, and debuggers
* `redux` scales beautifully -- adding feature #39 is the same as adding feature #2
* `redux` has a tonne of information about it


## Gotchas
* String indexer accessors doesn't trigger observers.  This is a `mobx` thing.

```ts
// given
const o = { name: 'robin' }
  
// this doesn't work
o['name']

// but these do
o.name
const { name } = o
const name = prop('name', o) // from ramda
```

* Views & actions that depend on other views & actions can be a bit tricky to get right in TypeScript (there are some workarounds).
* SnapshotType makes all the properties `any?` even though we have type information and know if something is optional.
* `flow()` being generators are kinda backwards since we’re used to `await`ing `Promise`s, not `yield`ing them.
* `identifier()`s must have the thing they point exist *first*  in the state tree.  Think of this like a foreign key constraint.
* `identifier`s are objects, however you can put a key (like an id) in the snapshot type. User will have a `car` instead of a `car_id`, but the value is a `string`. An example will make this clearer.
* `slice()` -- `FlatList` integration needs a "hack" (e.g. `extraData = {{ lulz: users.length }}`)
* Too much data is slow in `__DEV__` mode (especially in Android) because they use `Object.freeze`.  This doesn't happen in production.

# Patterns We Use
## Structure
* 1 root store model (`RootStore` holds the environment)
* which holds many store models (domains)
* which hold what we call “records” (structures)

## Stores & Records
#### Record Models
* kinda like a structure
* can have validations????
* examples: login form, user, 

#### Store Models
* can talk to other stores `getRoot`
* can be injected into views `@inject`
* can access the environment `getEnv`
* mostly this is where your side-effect live (in `action`s)
* have an environment containing all services
* prefer deriving data (computed) to duplicating data
* stores are held by a `RootStore` which provides no other functionality
* Stores grow code fast, so prefer many smaller stores to monolith stores (instead of a giant `UserStore`, prefer a `CurrentUserStore`, `LoginStore`, `SignupStore`, `UserPreferencesStores`)

## Computed Views
These are awesome.  Use as many as you can. Much of the calculations in your React components can be lifted up here.

## Actions
* use `flow`
* how to hook service events
* how to trigger side effects
* talking to other stores


## Snapshots
How we save things with AsyncStorage. To/from.


## Environment
These are things like `api`s.  Generally there to communicate data into and out of your app.

* configured at startup
* examples: api, firebase, analytics, biometrics, pusher, push notifications, etc.
* `store`-models are not passed into these, but `record`-models can be
* results should be strongly typed and exhaustive if they can have multiple things it could return (e.g. an api has the happy path and several problem paths)
* offers events to which `store`-models can subscribe to (`Pusher`, for example) — we use an event emitter for this.


## .extend() — Advanced
* `withSideEffect`
* `withRootStore`
* `withEnvironment`
* `withValidation`
* `withStatus`

## Reactotron
Talk about `reactotron-mst` and custom actions.


