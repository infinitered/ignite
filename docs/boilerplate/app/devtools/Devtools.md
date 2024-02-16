# Devtools Folder

## Reactotron

Ignite comes with Reactotron support for debugging your app.
By default, Reactotron is configured to work with web and mobile apps and is configured with a few plugins and commands we think are useful.

### ReactotronConfig.ts

The `reactotron-mst` plugin is included for MobX-State-Tree support.

```typescript
import { mst } from "reactotron-mst"
const reactotron = Reactotron.configure({
    ...
}).use(
  mst({
    /** ignore some chatty `mobx-state-tree` actions  */
    filter: (event) => /postProcessSnapshot|@APPLY_SNAPSHOT/.test(event.name) === false,
  }),
)
```

There are also a few custom commands included. You can use `reactotron.onCustomCommand` to add your own own custom debugging tools to Reactotron. Here is an example:

```typescript
reactotron.onCustomCommand({
  title: "Reset Navigation State",
  description: "Resets the navigation state",
  command: "resetNavigation",
  handler: () => {
    Reactotron.log("resetting navigation state")
    resetRoot({ index: 0, routes: [] })
  },
})
```

For more info check out the [Reactotron Documentation](https://docs.infinite.red/reactotron/)
