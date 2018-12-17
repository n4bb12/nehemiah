import del from "del"
import path from "path"

import { Context, Files } from "../types"

import { fileExists } from "./exists"

export interface Options extends del.Options {
  cwd: string
}

const defaultOptions = {
  dot: true,
  expandDirectories: true,
  gitignore: false,
  onlyFiles: false,
  force: true,
}

/**
 * https://github.com/sindresorhus/del#api
 */
export async function deleteFiles(context: Context, globs: string | string[]): Files {
  const options: Options = Object.assign({ cwd: context.cwd }, defaultOptions)

  if (!Array.isArray(globs)) {
    globs = [globs]
  }

  const deletions = globs.map(glob => {
    return deleteFile(context, glob, options)
  })

  const fileArrs = await Promise.all(deletions)

  return Array.prototype.concat(...fileArrs)
}

async function deleteFile(context: Context, glob: string, options: Options): Files {
  const exists = await fileExists(context, glob)

  if (exists) {
    const file = path.join(options.cwd, exists)

    return del(file, options)
  } else {
    return Promise.resolve<string[]>([])
  }
}
