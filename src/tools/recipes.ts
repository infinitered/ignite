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

function safePath(path: string): string {
  // find the current path
  const currentPath = filesystem.cwd()
  // normalize the path
  path = filesystem.path(path)
  // ensure the path is safe
  if (!path.startsWith(currentPath)) {
    throw new Error(`Path ${path} is not safe to write to.`)
  }
  return path
}

// replace the patching.update in gluegun, which does weird things with json files
async function updateFile(
  filename: string,
  callback: (contents: string) => string | false,
): Promise<string | false> {
  const contents = await filesystem.readAsync(filename, "utf8")

  // let the caller mutate the contents in memory
  const mutatedContents = callback(contents)

  // only write if they actually sent back something to write
  if (typeof mutatedContents === "string" && mutatedContents !== contents) {
    await filesystem.writeAsync(filename, mutatedContents, { atomic: true })
  }

  return mutatedContents
}

export async function applyRecipe(recipe: CookbookRecipe, api_key: string): Promise<void> {
  const { info, error, spin, colors } = print
  const { cyan } = colors

  const openai = getAI(api_key)

  // ensure we are in the root folder of an Ignite project (check for package.json and an `app` folder I guess?)
  if (!filesystem.exists("package.json")) {
    error("You must be in the root folder of an Ignite project to use the AI.")
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
        You are an AI helper for the Ignite CLI. This is part of a multi-part
        conversation with the CLI and the user.

        In your messages, keep the messages concise and to the point, and
        suitable for display in a terminal environment.
        
        We are currently editing a React Native app and want to apply the
        Ignite Cookbook recipe called "${recipe.title}" to this current app.
        You have a few functions to help you accomplish this.

        If the recipe asks you to do things like creating a new Ignite app,
        assume those are already done and just move on to the next step.

        Match the code style of the current app, even if it differs from the
        recipe, unless the recipe is specifically about changing that aspect.

        If the recipe asks you to make a change to a file but it doesn't exist,
        look and see if there's another file that's similar in a reasonably
        similar location and make the change there. But read it first to make
        sure it's what you expect.

        Infer as much as you can from the recipe and the current state of the
        app. If you have any questions, ask the user. You can read files as
        needed to understand the current state of the app.

        For example, if you're replacing one dependency with another, you can
        look through the code base in likely places to find the old dependency
        and replace it with the new one.

        Next, the user will give you the recipe, along with some other info about
        the app. Please proceed with applying this recipe to the code base.

        Also communicate any questions you have to the user in multiple choice
        or freeform. We will report back their answers to you. You cannot just
        ask the user in a message (since we will not know how to ask the question),
        you *must* trigger the "askUser" tool call to ask the user anything.

        As you apply changes to the code base, check to make sure they properly
        applied by reading the file back. If it didn't apply properly, try to
        infer what went wrong and fix it. If you can't fix it, ask the user what
        to do.

        Before you finish, evaluate what went well and what went wrong with the
        recipe. Generate a concise report for how we could improve the recipe
        in the future to make it easier for the AI to apply it. Start with the
        string "RECIPE_FEEDBACK" so we know to show it to the user.

        When completely done, just return the string "AI_IS_DONE" and we will
        automatically end the session.

        First ask the user if they'd like to procede with the plan. In the details,
        include details about what you intend to do (concisely).
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
  let currentTask = "Review recipe"
  try {
    let loops = 0
    const maxLoops = 200 // so it doesn't go on forever
    while (!_aiIsDone && loops <= maxLoops) {
      loops++
      const spinner = spin(currentTask)
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

      // add the AI's response to messages
      const aiMessage = completion.choices[0].message
      messages.push(aiMessage)

      // now find the right function for the tool_calls, if any
      // and execute it.
      const tool_calls = aiMessage.tool_calls
      if (tool_calls) {
        for (const tool_call of tool_calls) {
          const args = JSON.parse(tool_call.function.arguments || "{}")
          let results = ""
          switch (tool_call.function.name) {
            case "createFile":
              // info(`Creating file ${args.path}`)
              await filesystem.writeAsync(safePath(args.path), args.contents)
              results = `Created file ${args.path}`
              spinner.succeed(results)
              break
            case "deleteFile":
              // info(`Deleting file ${args.path}`)
              await filesystem.removeAsync(safePath(args.path))
              results = `Deleted file ${args.path}`
              spinner.succeed(results)
              break
            case "readFileAndReportBack":
              // info(`Reading file ${args.path}`)
              const fileExists = await filesystem.existsAsync(safePath(args.path))
              if (!fileExists) {
                results = `File ${args.path} does not exist`
                spinner.succeed(`Looked for file ${args.path} but it does not exist`)
              } else {
                const contents = await filesystem.readAsync(safePath(args.path))
                results = contents
                spinner.succeed(`Read file ${args.path}`)
              }

              break
            case "patchFile":
              // check if the file exists first
              const patchFileExists = await filesystem.existsAsync(safePath(args.path))

              if (!patchFileExists) {
                results = `File ${args.path} does not exist`
                spinner.fail(`Looked for file ${args.path} but it does not exist`)
              } else {
                await updateFile(safePath(args.path), (contents) => {
                  // loop through instructions with replace/insert
                  for (const instruction of args.instructions) {
                    contents = contents.replace(instruction.replace, instruction.insert)
                  }

                  // we will return the contents to the AI
                  results = contents

                  spinner.succeed(
                    `Patched file ${args.path} with ${args.instructions.length} patches`,
                  )

                  return contents
                })
              }

              break
            case "listFiles":
              // info(`Listing files in ${args.path}`)
              const files = await filesystem.listAsync(safePath(args.path))
              results = files.join("\n")
              spinner.succeed(`Listed files in ${args.path}`)
              break
            case "askUser":
              // info(`Asking user: ${args.question}`)
              // info(`with choices ${args.choices}`)

              spinner.stop()

              if (args.details) {
                info(cyan(`\n${args.details}\n`))
              }

              // ask the user if multiple choice
              if (args.answerType === "multipleChoice") {
                const response = await prompt.ask({
                  type: "select",
                  name: "answer",
                  message: args.question,
                  choices: args.choices,
                })

                // report back to AI
                results = response.answer
              } else if (args.answerType === "freeform") {
                const response = await prompt.ask({
                  type: "input",
                  name: "answer",
                  message: args.question,
                })

                // report back to AI
                results = response.answer
              } else {
                throw new Error(`Unknown answer type: ${args.answerType}`)
              }

              break
            case "dependency":
              // info(`${args.action} dependency ${args.name}`)
              // info(args)
              if (args.action === "add") {
                await packageManager.add(args.name, {
                  dev: args.dev === "true",
                })
                results = `Added ${args.name} to the project${
                  args.dev === "true" ? " as a dev dependency" : ""
                }`
                spinner.succeed(results)
              } else if (args.action === "remove") {
                await packageManager.remove(args.name, {})
                results = `Removed ${args.name} from the project`
                spinner.succeed(results)
              }
              break
            default:
              // Shouldn't happen!
              spinner.fail(`Unknown tool call: ${tool_call.function.name}`)
              info("Arguments:" + JSON.stringify(args))
              process.exit(1)
          }

          if (results) {
            // OpenAI requires that you send back the results of the tool call
            // with the tool_call_id included so they can match them up.
            messages.push({
              role: "tool",
              tool_call_id: tool_call.id,
              content: results,
            })
          }
        }
      }

      spinner.stop()

      if (aiMessage.content?.includes("RECIPE_FEEDBACK")) {
        info("\nThe AI has some feedback on the recipe:")
        info(`\n${cyan(aiMessage.content)}\n`)
      }

      // check if AI is self-reporting that it is done
      if (aiMessage.content?.includes("AI_IS_DONE")) {
        _aiIsDone = true
        info("All done!")
      }
    }
    if (loops > maxLoops) {
      throw new Error(`AI looped too many times (more than ${maxLoops}), exiting!`)
    }
  } catch (e) {
    error(e)

    // print out the current messages for debugging
    const printDebugInfo = await prompt.ask({
      type: "confirm",
      name: "printDebugInfo",
      message: "Print the full conversation for debugging?",
      initial: true,
    })

    if (printDebugInfo.printDebugInfo) {
      info("Current messages:")
      console.log(JSON.stringify(messages, null, 2))
    }

    info("Feel free to file an issue with the above information.")
    info("Title the issue something like:")
    info("ignite-cli cookbook AI error: <your error here>")
    info("https://github.com/infinitered/ignite/issues/new")
    info("Thanks for helping us improve the AI! 🙏")

    process.exit(1)
  }

  // print out the current messages for debugging
  const printDebugInfo = await prompt.ask({
    type: "confirm",
    name: "printDebugInfo",
    message: "Print the full conversation for debugging?",
    initial: true,
  })

  if (printDebugInfo.printDebugInfo) {
    info("Current messages:")
    console.log(JSON.stringify(messages, null, 2))
  }

  process.exit(0)
}
