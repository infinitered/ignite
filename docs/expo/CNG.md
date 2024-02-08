---
sidebar_position: 30
---

# Expo Continuous Native Generation (CNG)

When you want native platform code integrations, we recommend using the Expo CNG workflow with Ignite. This is one of the options when you spin up a new Ignite app.

CNG (and Expo Prebuild) works well for almost any app. It's a great middle ground between Expo Go and the "do it yourself" (DIY) workflow.

1. You don't have to work with Gradle and CocoaPods directly
2. Upgrades are much, much easier, since you're not working around your native code customizations
3. There are config plugins for many popular libraries, and custom config plugins are possible to write

You can learn more about Expo CNG in [Expo's docs](https://docs.expo.dev/workflow/continuous-native-generation/).
