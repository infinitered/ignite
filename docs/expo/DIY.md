---
sidebar_position: 40
---

# DIY Workflow

If you don't want to use [Expo Go](./Expo-Go.md) or [Expo CNG](./CNG.md), you can use the "do it yourself" (DIY) workflow. This is one of the options when you spin up a new Ignite app.

:::tip
Implementation detail that you probably didn't need to know: it's still a "CNG" workflow under the hood, but we generate the native ios and android folders for you -- and then you never run CNG again. Instead, you customize those native projects directly yourself. Hence, "DIY".
:::

## Why would I want to use the DIY workflow?

We generally don't recommend it. It's mostly available for developers who are not interested in using Expo CNG / Prebuild and would rather maintain their own native code directly.
