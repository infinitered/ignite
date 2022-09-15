# Generator Templates

Generator templates are written in [ejs](https://ejs.co/), which is a templating language using JavaScript.

You write the template however you want, and use `<%= foo %>` to run and output JavaScript.

You can also use control statements like "if" with `<% if (condition) { %>Stuff here<% } %>`.

## Folder naming conventions

Templates are located in your app's `./ignite/templates` folder, and the name of the folder should match the name of the generator.

For example, if you want to run `npx ignite-cli generate header Pizza`, you'd put the header templates in the `./ignite/templates/header/` folder.

Any files in that folder will be copied over & run through the generator with the `Pizza` name applied.

## File naming conventions

If you use all upper-case `NAME` in your template filenames, that will be replaced by a pascal-case version of the name provided by the person running the generator.

It's best to just look at an example:

Let's say you have a file called `NAMEScreen.ts`.

If they run `npx ignite-cli generate screen Pizza`, it'll name the file `PizzaScreen.ts`.

If you'd like to customize the filename you can provide a filename option in the frontmatter of the template like so:

```
---
filename: <%= props.camelCaseName %>.tsx
---
```

## Props

There's a provided `props` object that contains the following properties:

```
props.skipIndexFile  // boolean, if --skip-index-file is passed it's `true`
props.filename       // string, the name of the file being generated (e.g. "UserModel.tsx")
props.pascalCaseName // string, PascalCase version of the name that is passed in (e.g. "UserModel")
props.camelCaseName  // string, camelCase version of the name (e.g. "userModel")
props.kebabCaseName  // string, kebab-case version of the name (e.g. "user-model")
```

Example of using these in a template:

```ejs
type <%= props.pascalCaseName %>Props = { some: string }
export function <%= props.pascalCaseName %>(props: <%= props.pascalCaseName %>Props) {
  return <Text>{props.some} in a <%= props.pascalCaseName %> component!</Text>
}
```

## Front Matter

"Front matter" is a way to specify meta-data about a template in the template itself. It's stripped out of the generated file. You delineate front matter by three dashes (`---`) above and below, and it has to be the very first thing in the template.

We use this in Ignite to customize the destination of a given template. For example, in `./ignite/templates/navigator/*` we could have:

```
---
destinationDir: app/navigation
---
import { StackNavigator } from "react-navigation"

// ...
```

This would copy files to `./app/navigation/*` instead of the default `./app/navigators/*`.

Other front matter options include:

### patch

This lets you patch another file, such as an index file. Example:

```tsx
---
patch:
  path: "app/screens/index.ts"
  append: "export * from \"./<%= props.kebabCaseName %>/<%= props.kebabCaseName %>-screen\"\n"
  skip: <%= props.skipIndexFile %>
---
```

### patches

You can patch multiple files with `patches`. It works just the same as `patch`, but allows for multiple.

```tsx
---
patches:
  - path: "app/models/RootStore.ts"
    after: "from \"mobx-state-tree\"\n"
    insert: "import { <%= props.pascalCaseName %>Model } from \"../<%= props.kebabCaseName %>/<%= props.kebabCaseName %>\"\n"
    skip: <%= !props.kebabCaseName.endsWith('store') %>
  - path: "app/models/RootStore.ts"
    after: "types.model(\"RootStore\").props({\n"
    insert: "  <%= props.camelCaseName %>: types.optional(<%= props.pascalCaseName %>Model, {} as any),\n"
    skip: <%= !props.kebabCaseName.endsWith('store') %>
  - path: "app/models/index.ts"
    append: "export * from \"./<%= props.kebabCaseName %>/<%= props.kebabCaseName %>\"\n"
    skip: <%= props.skipIndexFile %>
---
```

Front matter is very powerful, but not necessarily super intuitive. If you have questions about it, ask in the [Ignite Slack community](https://community.infinite.red) or post a [Discussion](https://github.com/infinitered/ignite/discussions).
