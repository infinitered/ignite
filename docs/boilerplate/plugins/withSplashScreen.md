# withSplashScreen Config Plugin

## Purpose

`withSplashScreen` addresses the double splash screen issue in Expo apps (documented in [Expo GitHub issue #16084](https://github.com/expo/expo/issues/16084)), by ensuring a seamless transition between the initial native splash screen and the one managed by `expo-splash-screen`.

## Functionality

- **Transparent Splash Screen**: Replaces the default splash screen with a transparent one on Android.
- **Translucent Status Bar**: Sets the status bar to translucent to match the transparent splash screen.

## Implementation

1. **Modifies `strings.xml`**: Adds a setting for a translucent status bar.
2. **Updates `styles.xml`**: Adjusts `Theme.App.SplashScreen` to make the window translucent.
