---
sidebar_position: 40
---

# Manual Workflow

If you don't want to use [Expo CNG](./CNG.md), you can manage the native code yourself via the manual workflow (`--workflow manual`). This is one of the options when you spin up a new Ignite app.

:::tip
Implementation detail that you probably didn't need to know: it's still a "CNG" workflow under the hood, but we generate the native ios and android folders for you -- and then you never run CNG again. Instead, you customize those native projects directly yourself. Hence, the manual part (formerly "DIY").
:::

## Why would I want to use the manual workflow?

We generally don't recommend it. It's mostly available for developers who are not interested in using Expo CNG / Prebuild and would rather maintain their own native code directly.
