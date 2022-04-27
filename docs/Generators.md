# Generators

_NOTE: This documentation is for Ignite CLI version 4.0+. For apps spun up by Ignite CLI 3.x or below (Andross or Bowser), please refer to [the previous documentation](https://github.com/infinitered/ignite/tree/2dd42a5957ff18211c9edd7524b6af5f4231baf6/docs)._

_The true gem of Ignite._ When you spin up a new app with Ignite CLI, we copy in several generator templates into `./ignite/templates/*`. Generators help you scaffold your app very quickly, be it for a proof-of-concept, a demo, or a production app. Generators are there to save you time, keep your code consistent, and help you with the basic structure of your app.

```
npx ignite-cli generate --list
```

...will give you information on what generators are present.

## Built-in generators

### Component generator

This is the generator you will be using most often. They come pre-wrapped with mobx-react-lite's `observer` function, which you'll need to trigger re-renders if any MobX-State-Tree properties that are being used in this component change.

```
npx ignite-cli generate component MyAwesomeButton
```

- Creates the component/function
- Creates a style file
- Creates a storybook test

### Screen generator

Generates a "hooks enabled" screen that is also pre-wrapped with mobx-react-lite's `observer` function, making it automatically re-render anytime a relevant MST property changes.

```
npx ignite-cli generate screen Settings
```

### Model generator

Creates a Mobx-State-Tree model.

```
npx ignite-cli generate model No
```

- Creates the model
- Creates a unit test file
- Appends export to `models/index.ts` unless you pass `--skip-index-file`

### App Icon generator

App icons are tricky - there are many different shapes and sizes, and many different configuration files and locations to update. So we include this generator to make it much easier on you!

This is a special kind of generator - "special" in that it modifies the native project folders with resized and transformed input image files found in the generator's template folder. Also, it only accepts predefined options for the second parameter: one of `ios`, `android`, `expo` or `all`.

The following files will be found in your templates folder (`ignite/templates/app-icon`) which can be customized:

- `ios-universal.png`:

  - The generator will use this file to create all required app-icons for iOS.
  - (vanilla) Updates `./ios/**/Images.xcassets/AppIcon.appiconset/` including `Content.json`.
  - (expo) Updates `./assets/images/` including the root file `./app.json`.

- `ios-android-legacy.png`:

  - The generator will use this file to create all required legacy launcher-icons for Android 7.1 and below.
  - Automatically transforms the icon to add necessary padding and radius. Note, when creating your custom input file, do not include the padding or radius.
  - (vanilla) Updates `./android/app/src/main/res/` including the `mipmap-anydpi-v26/ic_launcher.xml`.
  - (expo) Updates `./assets/images/` including the root file `./app.json`.

- `ios-android-adaptive-background.png`:

  - The generator will use this file to create all required adaptive launcher-icon background layers for Android 8.0 and above.
  - Updates same directories as the legacy icon.

- `ios-android-adaptive-foreground.png`:

  - The generator will use this file to create all required adaptive launcher-icon foreground layers for Android 8.0 and above.
  - Updates same directories as the legacy icon.

When updating the template files, please note that names must stay the same as well as the size (1024x1024px). A Sketch template file can be [found here](https://github.com/infinitered/ignite/files/8576614/ignite-app-icon-template.zip) - just make your changes, hide the grids, then click File -> Export.

```
npx ignite-cli generate app-icon ios
```

By default, the generator will exit if the input-files in your templates folder match signatures with those of the default Ignite app-icons - this is done to encourage you to make actual changes to the icons before generating. However, if you want to override your application's app-icons with those of Ignite's, you can first reset your app-icon templates folder with `npx ignite-cli g app-icon --update` and then regenerate the app-icons with the `--skip-source-equality-validation` flag.

## Making your own generators

Your generators live in your app, in `./ignite/templates/*`. To make a new generator, go look at the ones that are there when you start your app. You'll see that they have `*.ejs` files (which get interpreted when you generate them).

```
npx ignite-cli g screen Settings
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

Just run `npx ignite-cli update <type>` or `npx ignite-cli update --all` from the root folder of your project to copy over the latest generators to your project. Note that this will remove any customizations you've made, so make sure to make a commit first so you can roll it back.
