/**
 * @file src/commands/cookbook.ts
 * @description ignite-cli cookbook -- allows finding cookbook recipes and applying them via AI.
 */

import { applyRecipe, fetchAllRecipes, fetchRecipeDetails } from "../../tools/recipes"
import type { GluegunToolbox } from "gluegun"

module.exports = {
  description: "Allows finding and applying cookbook recipes.",
  run: async function (toolbox: GluegunToolbox) {
    const { print, parameters, prompt } = toolbox
    const { info, error, colors } = print
    const { bold, gray } = colors

    const searchTerm = parameters.first

    if (!searchTerm) {
      error("Please provide a search term.")
      info("Example: ignite cookbook find mmkv")
      return
    }

    // Now search the cookbook for the search term
    info(`Searching the Ignite Cookbook for "${searchTerm}"...`)

    const recipes = await fetchAllRecipes()

    // filter the recipes based on filename
    const matchingRecipes = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (matchingRecipes.length === 0) {
      error(`No recipes found for "${searchTerm}"`)
      return
    }

    // Allow them to choose the recipe they want by the recipe name
    const recipeNames = matchingRecipes.map((recipe) => recipe.name)
    const recipeMenu = {
      type: "select",
      name: "recipeName",
      message: "Which recipe would you like to view?",
      choices: recipeNames,
    }

    const { recipeName } =
      recipeNames.length === 1 ? { recipeName: recipeNames[0] } : await prompt.ask(recipeMenu)

    // Find the recipe they want
    const rawRecipe = matchingRecipes.find((r) => r.name === recipeName)

    const recipe = await fetchRecipeDetails(rawRecipe)

    // Menu -- open in browser, apply recipe to current app, or cancel
    const actionMenu = {
      type: "select",
      name: "action",
      message: "What would you like to do?",
      choices: [
        {
          name: "Apply recipe to current app with AI",
          message: "Apply recipe to current app with AI",
        },
        { name: "Open in browser", message: "Open in browser" },
        { name: "Cancel", message: "Cancel" },
      ],
    }

    // loop until they're done
    info(``)
    info(`- ${recipe.name}`)
    info(`- Title: ${recipe.title || ""}`)
    info(`- Description: ${recipe.description || ""}`)
    info(`- Tags: ${recipe.tags || ""}`)
    info(`- Last Update: ${recipe.lastUpdate || ""}`)
    info(`- Author: ${recipe.author || ""}`)
    info(`- Publish Date: ${recipe.publishDate || ""}`)
    info(``)

    const { action } = await prompt.ask(actionMenu)

    if (action === "Open in browser") {
      info(gray(`Opening ${recipe.name} in your browser...`))

      const fileWithoutExt = recipe.name.replace(/\.[^/.]+$/, "")
      const url = `https://ignitecookbook.com/docs/recipes/${fileWithoutExt}/`
      if (process.platform === "darwin") {
        await toolbox.system.run(`open ${url}`)
      } else if (process.platform === "win32") {
        // if windows, use `start`
        await toolbox.system.run(`start ${url}`)
      } else if (process.platform === "linux") {
        // if linux, use `xdg-open`
        await toolbox.system.run(`xdg-open ${url}`)
      } else {
        // if none of the above, just log the URL
        info(`URL: ${url}`)
      }
    } else if (action === "Apply recipe to current app with AI") {
      // Check if we're in a clean git status ... if not, warn them and verify before proceeding
      const gitStatus = await toolbox.system.run("git status --porcelain")
      if (gitStatus !== "") {
        error("You have uncommitted changes. Please commit or stash them before proceeding.")
        info(
          "It might be hard to undo the changes made by the AI if you don't have a clean git status.",
        )
        const shouldProceed = await prompt.confirm("Do you want to proceed anyway?")
        if (!shouldProceed) return
      }

      info(bold(`\nApplying ${recipe.name} to your app via OpenAI...\n`))

      // Warn them that this will cost money and we aren't responsible for charges
      info(
        gray(`
This will cost money (typically a few cents per run) and we are not
responsible for any charges incurred by using the OpenAI API.
In particular, don't run this in CI or other automated environments
without understanding the costs.
It can get stuck in a loop and continue to charge you. We are adding
safety features to prevent this, but it's not foolproof.\n`),
      )

      // look for an OPENAI_API_KEY in the environment or ask for it
      const openaiApiKey = process.env.OPENAI_API_KEY
        ? { key: process.env.OPENAI_API_KEY }
        : await prompt.ask({
            type: "input",
            name: "key",
            message:
              "Enter your OpenAI API Key (https://platform.openai.com/api-keys) (we won't save it)",
          })
      if (!openaiApiKey) {
        error("No OpenAI API key found.")
      } else {
        // Test the OpenAI API Key
        const openaiTest = await toolbox.system.run(
          `curl -X POST https://api.openai.com/v1/engines/gpt-3.5-turbo/completions -H "Authorization: Bearer ${openaiApiKey.key}" -H "Content-Type: application/json" -d '{"prompt": "Hello, world - just return hi so I know you work.", "max_tokens": 200}'`,
        )

        if (openaiTest.includes("hi")) {
          info("\nOpenAI API Key test successful.\n")

          // kick off the recipe process
          await applyRecipe(recipe, openaiApiKey.key)
        } else {
          error("OpenAI API Key test failed.")
          console.log(openaiTest)
        }
      }
    }
  },
}
