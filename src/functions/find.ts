import deepmerge from "deepmerge"
import globby from "globby"

import { Context, File, Files } from "../types"
import { GlobbyOptions } from "../types/GlobbyOptions"

export type FindOptions = GlobbyOptions

const defaultOptions: FindOptions = {
  dot: true,
  expandDirectories: true,
  gitignore: false,
  onlyFiles: true,
}

/**
 * https://github.com/sindresorhus/globby#api
 * https://github.com/mrmlnc/fast-glob#options-1
 */
export async function findFiles(context: Context, globs: string | string[], options?: FindOptions): Files {
  const globbyOptions = deepmerge({ cwd: context.cwd }, defaultOptions, options)
  return globby(globs, globbyOptions)
}

export async function findOneFileOrError(context: Context, glob: string, options?: FindOptions): File {
  const filenames = await findFiles(context, glob, options)
  if (filenames.length === 0) {
    throw new Error("File not found: " + JSON.stringify(glob))
  }
  if (filenames.length !== 1) {
    throw new Error("Only one source file allowed: " + JSON.stringify(glob))
  }
  return filenames[0]
}

export async function findOneFileOrWarn(context: Context, glob: string, options?: FindOptions): File {
  const filenames = await findFiles(context, glob, options)
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
