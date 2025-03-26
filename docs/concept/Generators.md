---
sidebar_position: 110
---

# Generators

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

### Screen generator

Generates a "hooks enabled" screen that is also pre-wrapped with mobx-react-lite's `observer` function, making it automatically re-render anytime a relevant MST property changes.

```
npx ignite-cli generate screen Settings
```

### Model generator

Creates a Mobx-State-Tree model.

```
npx ignite-cli generate model Pizza
```

- Creates the model
- Creates a unit test file
- Appends export to `models/index.ts` unless you pass `--skip-index-file`

### Navigator generator

Creates a React Navigation navigator in the `app/navigators` folder.

```
npx ignite-cli generate navigator OrderPizza
```

You can learn more about navigators [in the Navigation docs](../boilerplate/app/navigators/Navigation.md).

### App Icon generator

App icons are tricky - there are many different shapes and sizes, and many different configuration files and locations to update. So we include this generator to make it much easier on you!

This is a special kind of generator - "special" in that it modifies the native project folders with resized and transformed input image files found in the generator's template folder. Also, it only accepts predefined options for the second parameter: one of `ios`, `android`, `expo` or `all`.

The following files will be found in your templates folder (`ignite/templates/app-icon`) which can be customized:

- `android-adaptive-background.png`:

  - The generator will use this file to create all required adaptive launcher-icon background layers for Android 8.0 and above.
  - Updates same directories as the legacy icon.

- `android-adaptive-foreground.png`:

  - The generator will use this file to create all required adaptive launcher-icon foreground layers for Android 8.0 and above.
  - Updates same directories as the legacy icon.

- `android-legacy.png`:

  - The generator will use this file to create all required legacy launcher-icons for Android 7.1 and below.
  - Automatically transforms the icon to add necessary padding and radius. Note, when creating your custom input file, do not include the padding or radius.
  - (vanilla) Updates `./android/app/src/main/res/` including the `mipmap-anydpi-v26/ic_launcher.xml`.
  - (expo) Updates `./assets/images/` including the root file `./app.json`.

- `ios-universal.png`:

  - The generator will use this file to create all required app-icons for iOS.
  - (vanilla) Updates `./ios/**/Images.xcassets/AppIcon.appiconset/` including `Content.json`.
  - (expo) Updates `./assets/images/` including the root file `./app.json`.

When updating the template files, please note that names must stay the same as well as the size (1024x1024px). A Sketch template file can be [found here](https://github.com/infinitered/ignite/files/8576614/ignite-app-icon-template.zip) - just make your changes, hide the grids, then click File -> Export.

```
npx ignite-cli generate app-icon ios
```

By default, the generator will exit if the input-files in your templates folder match signatures with those of the default Ignite app-icons - this is done to encourage you to make actual changes to the icons before generating. However, if you want to override your application's app-icons with those of Ignite's, you can first reset your app-icon templates folder with `npx ignite-cli g app-icon --update` and then regenerate the app-icons with the `--skip-source-equality-validation` flag.

### Splash Screen generator

Similar to app/launcher icons, the splash-screen is somewhat tricky to configure and manage due to platform (and OS version) differences. Therefore, splash-screens come preconfigured in the latest versions of Ignite boilerplate and a handy generator is provided to aid with customization.

Unlike the app/launcher generator however, only a single input file is needed. This file, called `logo.png`, can be found and customized in the following templates folder: `ignite/templates/splash-screen`.

The generator requires a single parameter for the splash-screen's background color (in hex format).

```
npx ignite-cli generate splash-screen FF0000
// or
npx ignite-cli generate splash-screen "#FF0000"
// or
npx ignite-cli generate splash-screen fff
```

The generator will modify the `./assets/images/` and attempt to update `./app.json`. However, if your project is configured to use `app.config.js` or `app.config.ts`, the config changes will be output in the console for you to make them manually. You can read more about Expo's dynamic configuration [here](https://docs.expo.dev/workflow/configuration/#dynamic-configuration-with-appconfigjs).

Logo size transformations are predetermined based on platform. The defaults are meant to work in _most_ cases. However, you can adjust the logo transformation size according to your needs by using flags:

```
npx ignite-cli generate splash-screen FF0000 --ios-size=150 --android-size=180
```

A few notes about sizes. iOS size has no upper limit, so be careful with the value. Android has an upper limit of `288` as defined in [Android docs](https://developer.android.com/guide/topics/ui/splash-screen#splash_screen_dimensions). For Expo (both Android and iOS), custom sizes will be observed; however, due to Expo's config requirements, the splash-screen assets are generated with padding and attempt to fill the screen.

Lastly, the splash-screen generator will exit if your input file has not been modified. The same source equality check, as the one on the app-icon generator, will encourage you to make customizations before using the generator (see the `--skip-source-equality-validation` section above).

## CLI Options

### `--case`

The default filename format is PascalCase (`--case auto` or `--case pascal`), based on the name you pass in to the generate command. For example:

`npx ignite-cli@latest g screen Episodes` will generate `EpisodesScreen.tsx` in the case of the default generator template `NAMEScreen.tsx`.

This `--case` switch specifies the generated filenames (`NAME` in the filename of your template) will be how you pass it in. For example:

`npx ignite-cli@latest g screen log-in` will generate the following outputs given their template name:

| --case       | tpl filename       | generated filename |
| ------------ | ------------------ | ------------------ |
| auto, pascal | NAMEScreen.tsx.ejs | LogInScreen.tsx    |
| camel        | NAMEScreen.tsx.ejs | logInScreen.tsx    |
| snake        | NAMEScreen.tsx.ejs | log_in_screen.tsx  |
| kebab        | NAMEScreen.tsx.ejs | log-in-screen.tsx  |
| none         | NAMEScreen.tsx.ejs | log-in.tsx         |
| auto, pascal | NAME.tsx.ejs       | LogIn.tsx          |
| camel        | NAME.tsx.ejs       | logIn.tsx          |
| snake        | NAME.tsx.ejs       | log_in.tsx         |
| kebab        | NAME.tsx.ejs       | log-in.tsx         |
| none         | NAME.tsx.ejs       | log-in.tsx         |

### `--dir`

Specifies the output path for the generated files. This will override the default path of `app/` (Ignite's path where all app code lives at the time of this writing) and any `destinationDir:` front matter that exists. This is useful in the case of file-based routing navigation systems, such as [Expo Router](https://docs.expo.dev/router/introduction/).

## Customizing generators

You should feel free to make the provided templates your own! Just update the files in the `./ignite/templates/*` folders, and any generated files will then use your updated files. Read more in the [Generator Templates](./Generator-Templates.md) documentation.

## Making your own generators

Your generators live in your app, in `./ignite/templates/*`. To make a new generator, go look at the ones that are there when you start your app. You'll see that they have `*.ejs` files (which get interpreted when you generate them).

Read more about making your own generators in the [Generator Templates](./Generator-Templates.md) documentation.

## Updating generators

You may want to update your generators to the latest version of Ignite.

Just run `npx ignite-cli update <type>` or `npx ignite-cli update --all` from the root folder of your project to copy over the latest generators from Ignite to your project.

⚠️ Note that this will remove any customizations you've made, so make sure to make a commit first so you can roll it back!

## A Note About Windows

If you are noticing upon using the generator for a source file (such as a screen or model) that front matter is not removed from the newly created file, it could be that the End of Line Sequence is misconfigured. Ignite tries to take care of this on its own, but sometimes your machine will not have a proper CLI utility such as `unix2dos` installed (this usually comes with Git).

In this case, you can open VS Code (or another IDE) and convert the EOL characters for all `ejs` files in the `ignite/templates` directory. Then run the generator command again and it should create the new files properly.
