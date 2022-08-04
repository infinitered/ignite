export type SpawnOptions = {
  /** Callback on every std out from spawned process */
  onProgress?: (data: string) => void
}

/** Spawn process, run commandLine string as command, and return output as string */
export function spawnProgress(commandLine: string, options: SpawnOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const args = commandLine.split(" ")
    const spawned = require("cross-spawn")(args.shift(), args, options)
    const output = []

    spawned.stdout.on("data", (data) => {
      data = data.toString()
      return options.onProgress ? options.onProgress(data) : output.push(data)
    })
    spawned.stderr.on("data", (data) => output.push(data))
    spawned.on("close", (code) => (code === 0 ? resolve(output.join("")) : reject(output.join(""))))
    spawned.on("error", (err) => reject(err))
  })
}

/** Spawn process, run commandLine string as command, and return each std out line as an array of strings */
export async function spawnChunked(commandLine: string, options?: SpawnOptions): Promise<string[]> {
  const output: string[] = []
  const option = options ?? { onProgress: (data: string) => output.push(data) }
  await spawnProgress(commandLine, option)
  return output
}
