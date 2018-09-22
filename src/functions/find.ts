import deepmerge from "deepmerge"
import globby from "globby"

import { Context, File, Files } from "../types"

export const defaultOptions = {
  dot: true,
  expandDirectories: true,
  gitignore: true,
  onlyFiles: true,
}

/**
 * https://github.com/sindresorhus/globby#api
 * https://github.com/mrmlnc/fast-glob#options-1
 */
export async function findFiles(context: Context, globs: string | string[]): Files {
  const options = deepmerge({ cwd: context.cwd }, defaultOptions)
  return globby(globs, options)
}

export async function findOneFileOrError(context: Context, glob: string): File {
  const filenames = await findFiles(context, glob)
  if (filenames.length === 0) {
    throw new Error("File not found: " + JSON.stringify(glob))
  }
  if (filenames.length !== 1) {
    throw new Error("Only one source file allowed: " + JSON.stringify(glob))
  }
  return filenames[0]
}

export async function findOneFileOrWarn(context: Context, glob: string): File {
  const filenames = await findFiles(context, glob)
  if (filenames.length === 0) {
    context.logger.warn("File not found: " + JSON.stringify(glob))
    return filenames[0]
  }
  if (filenames.length !== 1) {
    context.logger.warn("File ambiguous: " + JSON.stringify(glob) + ": " + JSON.stringify(filenames, null, 2))
    return filenames[0]
  }
  return filenames[0]
}
