---
title: eas.json
sidebar_position: 70
---

# eas.json

`eas.json` is the configuration file for [Expo Application Service (EAS)](https://docs.expo.dev/eas/). It allows you to create profiles for building and distributing your app.

Ignite includes a few default build profiles for common scenarios, but you can customize or add your own profiles too!

- `development` - internal debug build for testing on simulators
- `development:device` - internal debug build for testing on physical devices
- `preview` - internal production build for testing on simulators
- `preview:device` - internal production build for testing on physical devices
- `production` - default production profile intended for external distribution

Note how profiles can share settings via `extends`:

```json
"development": {
    "extends": "production",
    "distribution": "internal",
    "android": {
        "gradleCommand": ":app:assembleDebug"
    },
    "ios": {
        "buildConfiguration": "Debug",
        "simulator": true
    }
},
"development:device": {
    "extends": "development",
    "distribution": "internal",
    "ios": {
        "buildConfiguration": "Debug",
        "simulator": false
    }
},
"production": {}
```

In this example, `development:device` inherits the settings from `development`, but changes the `ios` setting to `simulator: false`. You can use `extends` to create a set of profiles to fit your needs without duplicating configuration.

View [Expo's eas.json Documentation](https://docs.expo.dev/build/eas-json/) for more info.
