import del from "del"
import path from "path"

import { fileExists } from "./exists"
import { Context, Files } from "./types"

const defaultOptions = {
  dot: true,
  expandDirectories: true,
  gitignore: false,
  onlyFiles: false,
}

/**
 * https://github.com/sindresorhus/del#api
 */
export async function deleteFiles(context: Context, patterns: string | string[]): Files {
  const options = Object.assign({ cwd: context.cwd }, defaultOptions)
  if (!Array.isArray(patterns)) {
    patterns = [patterns]
  }
  const deletions = patterns.map(pattern => {
    return deleteFile(context, pattern, options)
  })
  return Promise.all(deletions).then(fileArrs => {
    return fileArrs.concat.apply([])
  })
}

async function deleteFile(context: Context, pattern: string, options): Files {
  const exists = await fileExists(context, pattern)
  if (exists) {
    const file = path.join(options.cwd, exists)
    return del(file, options)
  } else {
    return Promise.resolve<string[]>([])
  }
}
