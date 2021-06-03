import { filesystem } from "gluegun"
import * as pathlib from "path"

/**
 * A lot like gluegun's filesystem.subdirectories(), but gets files too.
 *
 * This should probably go in Gluegun.
 *
 * Right about right here: https://github.com/infinitered/gluegun/blob/master/src/toolbox/filesystem-tools.ts#L52
 */
export function children(path: string, isRelative = false, matching = "*"): string[] {
  const dirs = filesystem.cwd(path).find({
    matching,
    directories: true,
    recursive: false,
    files: true,
  })
  if (isRelative) {
    return dirs
  } else {
    return dirs.map((dir) => pathlib.join(path, dir))
  }
}
