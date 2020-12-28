# Generators

_NOTE: This documentation is for Ignite CLI version 4.0+. For apps spun up by Ignite CLI 3.x or below (Andross or Bowser), please refer to [the previous documentation](https://github.com/infinitered/ignite/tree/2dd42a5957ff18211c9edd7524b6af5f4231baf6/docs)._

_The true gem of Ignite._ When you spin up a new app with Ignite CLI, we copy in several generator templates into `./ignite/templates/*`. Generators help you scaffold your app very quickly, be it for a proof-of-concept, a demo, or a production app. Generators are there to save you time, keep your code consistent, and help you with the basic structure of your app.

```
ignite generate --list
```

...will give you information on what generators are present.

## Built-in generators

### Component generator

This is the generator you will be using most often. They come pre-wrapped with mobx-react-lite's `observer` function, which you'll need to trigger re-renders if any MobX-State-Tree properties that are being used in this component change.

```
ignite generate component MyAwesomeButton
```

- Creates the component/function
- Creates a style file
- Creates a storybook test

### Screen generator

Generates a "hooks enabled" screen that is also pre-wrapped with mobx-react-lite's `observer` function, making it automatically re-render anytime a relevant MST property changes.

```
ignite generate screen Settings
```

### Model generator

Creates a Mobx-State-Tree model.

```
ignite generate model No
```

- Creates the model
- Creates a unit test file
- Will make the required additions to configuration files.

## Making your own generators

Your generators live in your app, in `./ignite/templates/*`. To make a new generator, go look at the ones that are there when you start your app. You'll see that they have `*.ejs` files (which get interpreted when you generate them).

```
ignite g screen Settings
```

This will copy over any files in `./ignite/templates/screen/*` to `./app/screens/settings/*` and process any `.ejs` templates at the same time.

Props are passed into the **ejs templates** when you run the generator.

```ts
{
  camelCaseName: string
  kebabCaseName: string
  pascalCaseName: string
  filename: string
}
```

You can use them in a template with `<%= props.camelCaseName %>`.

## Customizing generators

You should feel free to make them your own! Just update the files in the `./ignite/templates/*` folders, and any generated files will then use your updated files.

## Updating generators

Just run `ignite update <type>` or `ignite update --all` from the root folder of your project to copy over the latest generators to your project. Note that this will remove any customizations you've made, so make sure to make a commit first so you can roll it back.
