export type SpawnOptions = {
  onProgress?: (data: string) => void
}
export function spawnProgress(commandLine: string, options: SpawnOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const args = commandLine.split(" ")
    const spawned = require("cross-spawn")(args.shift(), args, options)
    const errorOut = []

    spawned.stdout.on("data", (data) => options.onProgress && options.onProgress(data.toString()))
    spawned.stderr.on("data", (data) => errorOut.push(data))
    spawned.on("close", (code) => (code === 0 ? resolve() : reject(errorOut.join())))
    spawned.on("error", (err) => reject(err))
  })
}
