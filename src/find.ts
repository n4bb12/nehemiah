import globby from "globby"

import { Context, File, Files } from "./types"

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
export async function findFiles(context: Context, patterns: string | string[]): Files {
  const options = Object.assign({ cwd: context.cwd }, defaultOptions)
  return globby(patterns, options)
}

export async function findOneFileWithError(context: Context, pattern: string): File {
  const filenames = await findFiles(context, pattern)
  if (filenames.length === 0) {
    throw new Error("Source file does not exist: " + pattern)
  }
  if (filenames.length !== 1) {
    throw new Error("Only one source file allowed: " + pattern)
  }
  return filenames[0]
}

export async function findOneFileWithWarning(context: Context, pattern: string): File {
  const filenames = await findFiles(context, pattern)
  if (filenames.length === 0) {
    context.logger.warn("Source file does not exist: " + pattern)
    return filenames[0]
  }
  if (filenames.length !== 1) {
    context.logger.warn("Only one source file allowed: " + pattern)
    return filenames[0]
  }
  return filenames[0]
}
