/**
 * @file src/commands/cookbook.ts
 * @description ignite-cli cookbook -- allows finding cookbook recipes and applying them via AI.
 */

import { GluegunToolbox } from "gluegun"

module.exports = {
  alias: ["recipe"],
  description: "Allows finding cookbook recipes and applying them via AI.",
  run: async function (toolbox: GluegunToolbox) {
    const { print } = toolbox
    const { info } = print

    info("Welcome to the Ignite Cookbook CLI! 🍳📚🔥")
    info("You can:")
    info("  - Find recipes")
    info("  - Apply recipes to your own project using AI")
    info("")
    info("To get started, try:")
    info("  ignite cookbook list")
    info("  ignite cookbook recipe mmkv")
  },
}
