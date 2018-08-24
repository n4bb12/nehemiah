import cpFile from "cp-file"
import path from "path"

import { findOneFileWithError } from "./find"
import { Nothing } from "./types"

const defaultOptions = {
  overwrite: true,
}

/**
 * https://github.com/sindresorhus/cp-file#api
 */
export async function copyFile(cwd: string, sourcePattern: string, target: string): Nothing {
  const options = Object.assign({ cwd }, defaultOptions)
  const source = await findOneFileWithError(cwd, sourcePattern)
  const sourceFile = path.join(cwd, source)
  const targetFile = path.join(cwd, target)
  return cpFile(sourceFile, targetFile, options)
}
