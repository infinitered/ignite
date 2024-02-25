/**
 * @file src/commands/cookbook.ts
 * @description ignite-cli cookbook -- allows finding cookbook recipes and applying them via AI.
 */

import { applyRecipe, fetchAllRecipes, fetchRecipeDetails } from "../../tools/recipes"
import type { GluegunToolbox } from "gluegun"

module.exports = {
  description: "Allows finding cookbook recipes and opening them in a browser.",
  run: async function (toolbox: GluegunToolbox) {
    const { print, parameters, prompt } = toolbox
    const { info, error } = print

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
        { name: "Open in browser", message: "Open in browser" },
        {
          name: "Apply recipe to current app with AI",
          message: "Apply recipe to current app with AI",
        },
        { name: "Cancel", message: "Cancel" },
      ],
    }

    // loop until they're done
    let done = false
    while (!done) {
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
        info(`Opening ${recipe.name} in your browser...`)

        // if mac, use `open`
        if (process.platform === "darwin") {
          await toolbox.system.run(`open ${recipe.html_url}`)
        } else if (process.platform === "win32") {
          // if windows, use `start`
          await toolbox.system.run(`start ${recipe.html_url}`)
        } else if (process.platform === "linux") {
          // if linux, use `xdg-open`
          await toolbox.system.run(`xdg-open ${recipe.html_url}`)
        } else {
          // if none of the above, just log the URL
          info(`URL: ${recipe.html_url}`)
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

        info(`Applying ${recipe.name} to your app via OpenAI...`)

        // look for an OPENAI_API_KEY in the environment or ask for it
        const openaiApiKey = await prompt.ask({
          type: "input",
          name: "key",
          message:
            "Add your OpenAI API Key (https://platform.openai.com/api-keys) (we won't save it)",
        })
        if (!openaiApiKey) {
          error("No OpenAI API key found.")
        } else {
          // Test the OpenAI API Key
          const openaiTest = await toolbox.system.run(
            `curl -X POST https://api.openai.com/v1/engines/davinci-codex/completions -H "Authorization: Bearer ${openaiApiKey.key}" -H "Content-Type: application/json" -d '{"prompt": "Hello, world - just return hi so I know you work.", "max_tokens}'`,
          )

          if (openaiTest.includes("hi")) {
            info("OpenAI API Key test successful.")

            // kick off the recipe process
            await applyRecipe(recipe, openaiApiKey.key)
          } else {
            error("OpenAI API Key test failed.")
          }
        }
      }
    }
  },
}
