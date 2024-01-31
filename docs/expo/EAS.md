---
sidebar_position: 50
---

# Expo Application Services (EAS)

EAS is our favorite way to build and deploy Ignite apps. It's a cloud build service that allows you to build your app in the cloud, without Xcode or Android Studio.

You can learn more about EAS here: [https://expo.dev/eas](https://expo.dev/eas)

Ignite apps come with an `eas.json` configuration file that looks something like this:

```json
{
  "cli": {
    "version": ">= 3.15.1"
  },
  "build": {
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
    "preview": {
      "extends": "production",
      "distribution": "internal",
      "ios": { "simulator": true },
      "android": { "buildType": "apk" }
    },
    "preview:device": {
      "extends": "preview",
      "ios": { "simulator": false }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

It's preconfigured to work with Ignite apps, but you can customize it to your liking.
