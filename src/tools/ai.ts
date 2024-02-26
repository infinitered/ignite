import OpenAI from "openai"
import { ChatCompletionTool } from "openai/resources"

let _ai: OpenAI | undefined
export function getAI(token: string): OpenAI {
  if (!_ai) {
    _ai = new OpenAI({
      apiKey: token,
    })
  }
  return _ai
}

export const createFileTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "createFile",
    description: "Create a file",
    parameters: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "The path of the file to create.",
        },
        contents: {
          type: "string",
          description: "The contents of the file to create.",
        },
      },
    },
  },
}

export const deleteFileTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "deleteFile",
    description: "Delete a file",
    parameters: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "The path of the file to delete.",
        },
      },
    },
  },
}

export const readFileTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "readFileAndReportBack",
    description: "Read a file and report back with the contents",
    parameters: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "The path of the file to read.",
        },
      },
      required: ["path"],
    },
  },
}

export const patchFileTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "patchFile",
    description: `Allows replacing the first matching string in a given file. Make sure to match indentation exactly.`,
    parameters: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Path to the file to patch",
        },
        instructions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              replace: {
                type: "string",
                description: "Search for and replace this string with the insert string",
              },
              insert: {
                type: "string",
                description:
                  "This is the string that replaces the `replace` string. If just inserting before/after, make sure to include the replace string where it goes.",
              },
            },
          },
        },
      },
      required: ["file", "instructions"],
    },
  },
}

export const listFilesTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "listFiles",
    description: "List all files in the specified directory",
    parameters: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "The path of the directory to list.",
        },
      },
      required: ["path"],
    },
  },
}

export const askUserTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "askUser",
    description: "Ask the user a multiple choice OR freeform question",
    parameters: {
      type: "object",
      properties: {
        details: {
          type: "string",
          description:
            "Any longform details you want to present to the user before you ask the question.",
        },
        question: {
          type: "string",
          description: "The question to ask the user.",
        },
        answerType: {
          type: "string",
          description: "The type of answer to expect. Either 'multipleChoice' or 'freeform'.",
        },
        choices: {
          type: "array",
          items: {
            type: "string",
            description: "The choices to present to the user if multipleChoice.",
          },
        },
      },
      required: ["question", "answerType"],
    },
  },
}

export const dependencyTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "dependency",
    description: "Add or remove a dependency to the project using npm, yarn, or bun",
    parameters: {
      type: "object",
      properties: {
        action: {
          type: "string",
          description: "The action to perform. Either 'add', 'remove'.",
        },
        name: {
          type: "string",
          description: "The name of the dependency to add or remove.",
        },
        version: {
          type: "string",
          description: "The version of the dependency to add.",
        },
        dev: {
          type: "boolean",
          description: "Whether to add as a dev dependency or not.",
        },
      },
      required: ["action", "name", "version"],
    },
  },
}
