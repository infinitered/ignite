export type SpawnOptions = {
  onProgress?: (data: string) => void
  env?: Record<string, unknown>
}
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
