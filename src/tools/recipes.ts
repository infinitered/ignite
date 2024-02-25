import type { CookbookRecipe } from "../types"
import { print, http, packageManager, filesystem, prompt, patching } from "gluegun"
import {
  askUserTool,
  createFileTool,
  deleteFileTool,
  dependencyTool,
  getAI,
  listFilesTool,
  patchFileTool,
  readFileTool,
} from "./ai"
import { ChatCompletionMessageParam } from "openai/resources"

export async function fetchAllRecipes(): Promise<CookbookRecipe[]> {
  // Fetch the recipes
  const baseURL = "https://api.github.com/repos/infinitered/ignite-cookbook/contents/"
  const recipePath = `docs/recipes`

  const api = http.create({
    baseURL,
    headers: { Accept: "application/vnd.github.v3+json" },
  })

  const response = await api.get<CookbookRecipe[]>(recipePath)

  // check for errors
  if (response.status !== 200) {
    print.error(`Error fetching recipes: ${response.status}`)
    return []
  }

  return response.data
}

export async function fetchRecipeDetails(recipe: CookbookRecipe): Promise<CookbookRecipe> {
  // Fetch the recipe from Github
  const rawURL = `https://raw.githubusercontent.com/infinitered/ignite-cookbook/main/docs/recipes/${recipe.name}`
  const recipeResponse = await fetch(rawURL)
  const recipeContents = await recipeResponse.text()
  recipe.contents = recipeContents

  // Parse the frontmatter
  const frontmatter = recipe.contents.split("---")[1]
  if (frontmatter) {
    const lines = frontmatter.split("\n")
    recipe.title = lines
      .find((line) => line.includes("title:"))
      ?.split(":")[1]
      .trim()
    recipe.description = lines
      .find((line) => line.includes("description:"))
      ?.split(":")[1]
      .trim()
    recipe.tags = lines
      .find((line) => line.includes("tags:"))
      ?.split(":")[1]
      .trim()
    recipe.lastUpdate = lines
      .find((line) => line.includes("last_update:"))
      ?.split(":")[1]
      .trim()
    recipe.author = lines
      .find((line) => line.includes("author:"))
      ?.split(":")[1]
      .trim()
    recipe.publishDate = lines
      .find((line) => line.includes("publish_date:"))
      ?.split(":")[1]
      .trim()
  }

  return recipe
}

export async function applyRecipe(recipe: CookbookRecipe, api_key: string): Promise<void> {
  const openai = await getAI(api_key)

  // ensure we are in the root folder of an Ignite project (check for package.json and an `app` folder I guess?)
  if (!filesystem.exists("package.json")) {
    print.error("You must be in the root folder of an Ignite project to use the AI.")
    process.exit(1)
  }

  // get the app name
  const packageJsonText = await filesystem.readAsync("package.json", "utf8")
  const packageJson = JSON.parse(packageJsonText)
  const appName = packageJson.name

  // get a directory listing of the root folder (not recursive)
  const rootFiles = await filesystem.listAsync(".")
  // get a recursive listing of the ./app folder
  const appFiles = await filesystem.find("./app")

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `
        You are an AI helper for the Ignite CLI. We are currently editing a
        React Native app and want to apply the Ignite Cookbook recipe called
        "${recipe.title}" to this current app. You have a few functions to
        help you accomplish this.

        If the recipe asks you to do things like creating a new Ignite app,
        assume those are already done and just move on to the next step.

        If the recipe asks you to make a change to a file but it doesn't exist,
        look and see if there's another file that's similar in a reasonably
        similar location and make the change there. But read it first to make
        sure it's what you expect.

        The user will now give you the recipe, along with some other info about.
        the app. Please proceed with applying this recipe to the code base.

        Also communicate any questions you have to the user in multiple choice.
        We will report back their answers to you.

        When done, just return the string "AI_IS_DONE" and we will end the session.
      `,
    },
    {
      role: "user",
      content: `
The app's name is ${appName}.

The files in the root and ./app folders are:
${rootFiles.join("\n")}
${appFiles.join("\n")}

The package.json is as follows:

\`\`\`json
${packageJsonText}
\`\`\`

The recipe is as follows:

${recipe.contents}
      `,
    },
  ]

  // start loop
  let _aiIsDone = false
  try {
    while (!_aiIsDone) {
      const completion = await openai.chat.completions.create({
        messages,
        tool_choice: "auto",
        tools: [
          listFilesTool,
          readFileTool,
          createFileTool,
          deleteFileTool,
          patchFileTool,
          askUserTool,
          dependencyTool,
        ],
        model: "gpt-4-turbo-preview",
        stream: false,
      })

      // add to messages
      const aiMessage = completion.choices[0].message
      messages.push(aiMessage)

      print.info("AI response:")
      print.info(aiMessage.content)
      print.info(aiMessage.tool_calls)

      // now find the right function for the tool_calls, if any
      // and execute it
      // and then ask the AI for the next step
      const tool_calls = aiMessage.tool_calls
      if (tool_calls) {
        for (const tool_call of tool_calls) {
          const args = JSON.parse(tool_call.function.arguments || "{}")
          let results = ""
          switch (tool_call.function.name) {
            case "createFile":
              print.info(`Creating file ${args.path}`)
              await filesystem.writeAsync(args.path, args.contents)
              results = `Created file ${args.path}`
              break
            case "deleteFile":
              print.info(`Deleting file ${args.path}`)
              await filesystem.removeAsync(args.path)
              results = `Deleted file ${args.path}`
              break
            case "readFileAndReportBack":
              print.info(`Reading file ${args.path}`)
              const contents = await filesystem.readAsync(args.path)
              results = contents
              break
            case "patchFile":
              print.info(`Patching file ${args.path}`)
              await patching.update(args.path, (contents) => {
                // loop through instructions with replace/insert
                for (const instruction of args.instructions) {
                  contents = contents.replace(instruction.replace, instruction.insert)
                }

                // we will return the contents to the AI
                results = contents

                return contents
              })

              break
            case "listFiles":
              print.info(`Listing files in ${args.path}`)
              const files = await filesystem.listAsync(args.path)
              results = files.join("\n")
              break
            case "askUser":
              print.info(`Asking user: ${args.question}`)
              print.info(`with choices ${args.choices}`)

              // ask the user
              const response = await prompt.ask({
                type: "select",
                name: "answer",
                message: args.question,
                choices: args.choices,
              })

              // report back to AI
              results = response.answer

              break
            case "dependency":
              print.info(`${args.action} dependency ${args.name}`)
              print.info(args)
              if (args.action === "add") {
                await packageManager.add(args.name, {
                  dev: args.development === "true",
                })
                results = `Added ${args.name} to the project`
              } else if (args.action === "remove") {
                await packageManager.remove(args.name, {})
                results = `Removed ${args.name} from the project`
              }
              break
            default:
              print.error(`Unknown tool call: ${tool_call.function.name}`)
              print.info("Arguments:" + JSON.stringify(args))
              process.exit(1)
          }

          if (results) {
            print.info(results)

            messages.push({
              role: "tool",
              tool_call_id: tool_call.id,
              content: results,
            })
          }
        }
      }

      // check if AI is self-reporting that it is done
      if (completion.choices[0].message.content?.includes("AI_IS_DONE")) {
        _aiIsDone = true
      }
    }
  } catch (e) {
    print.error(e)

    // print out the current messages for debugging
    print.info("Current messages:")
    console.log(JSON.stringify(messages, null, 2))

    process.exit(1)
  }
}
