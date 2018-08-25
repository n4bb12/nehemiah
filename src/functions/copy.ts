import cpFile from "cp-file"
import path from "path"

import { Context, Nothing } from "../types"
import { findOneFileOrError } from "./find"

const defaultOptions = {
  overwrite: true,
}

/**
 * https://github.com/sindresorhus/cp-file#api
 */
export async function copyFile(context: Context, sourceGlob: string, target: string): Nothing {
  const options = Object.assign({ cwd: context.cwd }, defaultOptions)
  const source = await findOneFileOrError(context, sourceGlob)
  const sourceFile = path.join(context.cwd, source)
  const targetFile = path.join(context.cwd, target)
  return cpFile(sourceFile, targetFile, options)
}
