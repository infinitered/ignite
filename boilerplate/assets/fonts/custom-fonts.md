# Instructions for adding custom fonts to your ignite app:

## For Expo Projects

You're lucky. Most of the work is done for you. Just download the `TTF` or `OTF` files you want to use, place them in `./app/theme/fonts/` and load them in the `index.ts` file in that same directory.

ignite integrated `expo-fonts` according to [this guide](https://docs.expo.io/versions/latest/sdk/font/).

## For Non-Expo Projects

1. Find a font in `TTF` or `OTF` format that you like and put it in `./assets/fonts/`. I picked [this one](https://fonts.google.com/specimen/Shadows+Into+Light).
2. Now run `npx react-native link`. Even though we're past react native 0.60 we can still use this command to link the fonts. This is a one-way operation. You'll have to remove fonts yourself later if you want to remove them from your app. This will add items to your xcode project and `Info.plist` file as well as putting some files in place for android to bundle (specifically, it will move the font files to `./android/app/src/main/assets/).
3. Both iOS and Android changes must be committed to source control, but sometimes other common libraries like `react-native-vector-icons` may mess with this process and add some fonts you don't intend to ship. Make sure to review these changes carefully before pushing any changes to source control.
4. The tricky part is next: knowing what font family to use. iOS uses the family name like `{fontFamily: 'ShadowsIntoLight'}` whereas on android, you must include all the different variations of the font you will use and reference them by their _filename_. So I downloaded `ShadowsIntoLight-Regular.ttf` that means android must use `{fontFamily: 'ShadowsIntoLight-Regular'}` (yes, it's case sensitive 🙄). [There are components to help you deal with this](https://github.com/lendup/react-native-cross-platform-text) or you can roll your own based on your needs and something like:

```
const CUSTOM_FONT_TEXT: TextStyle = {
  fontFamily: Platform.select({
    ios: "ShadowsIntoLight", // The font family name
    android: "ShadowsIntoLight-Regular", // The file name
  }),
  // ... whatever else
}
```
