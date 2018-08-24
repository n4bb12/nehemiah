import globby from "globby"

import { logger } from "./Logger"
import { File, Files } from "./types"

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
export async function findFiles(cwd: string, patterns: string | string[]): Files {
  const options = Object.assign({ cwd }, defaultOptions)
  return globby(patterns, options)
}

export async function findOneFileWithError(cwd: string, pattern: string): File {
  const filenames = await findFiles(cwd, pattern)
  if (filenames.length === 0) {
    throw new Error("Source file does not exist: " + pattern)
  }
  if (filenames.length !== 1) {
    throw new Error("Only one source file allowed: " + pattern)
  }
  return filenames[0]
}

export async function findOneFileWithWarning(cwd: string, pattern: string): File {
  const filenames = await findFiles(cwd, pattern)
  if (filenames.length === 0) {
    logger.warn("Source file does not exist: " + pattern)
    return filenames[0]
  }
  if (filenames.length !== 1) {
    logger.warn("Only one source file allowed: " + pattern)
    return filenames[0]
  }
  return filenames[0]
}
