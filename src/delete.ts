import del from "del"
import path from "path"

import { fileExists } from "./exists"
import { Files } from "./types"

const defaultOptions = {
  dot: true,
  expandDirectories: true,
  gitignore: false,
  onlyFiles: false,
}

/**
 * https://github.com/sindresorhus/del#api
 */
export async function deleteFiles(cwd: string, patterns: string | string[]): Files {
  const options = Object.assign({ cwd }, defaultOptions)
  if (!Array.isArray(patterns)) {
    patterns = [patterns]
  }
  const deletions = patterns.map(pattern => {
    return deleteFile(pattern, options)
  })
  return Promise.all(deletions).then(fileArrs => {
    return fileArrs.concat.apply([])
  })
}

async function deleteFile(pattern: string, options): Files {
  const exists = await fileExists(options.cwd, pattern)
  if (exists) {
    const file = path.join(options.cwd, exists)
    return del(file, options)
  } else {
    return Promise.resolve<string[]>([])
  }
}
