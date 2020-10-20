export type SpawnOptions = {
  onProgress?: (data: string) => void
}
export function spawnProgress(commandLine: string, options: SpawnOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const args = commandLine.split(" ")
    const spawned = require("cross-spawn")(args.shift(), args, options)

    spawned.stdout.on("data", (data) => options.onProgress && options.onProgress(data.toString()))
    spawned.on("close", () => resolve())
    spawned.on("error", (err) => reject(err))
  })
}
