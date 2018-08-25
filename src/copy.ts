import cpFile from "cp-file"
import path from "path"

import { findOneFileWithError } from "./find"
import { Context, Nothing } from "./types"

const defaultOptions = {
  overwrite: true,
}

/**
 * https://github.com/sindresorhus/cp-file#api
 */
export async function copyFile(context: Context, sourcePattern: string, target: string): Nothing {
  const options = Object.assign({ cwd: context.cwd }, defaultOptions)
  const source = await findOneFileWithError(context, sourcePattern)
  const sourceFile = path.join(context.cwd, source)
  const targetFile = path.join(context.cwd, target)
  return cpFile(sourceFile, targetFile, options)
}
