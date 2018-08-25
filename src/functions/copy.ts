import cpFile from "cp-file"
import path from "path"

import { Context, Nothing, To } from "../types"

import { findOneFileOrError } from "./find"
import { inContext } from "./path"

const defaultOptions = {
  overwrite: true,
}

/**
 * https://github.com/sindresorhus/cp-file#api
 */
export function copyFile(context: Context, glob: string, ...globs: string[]): To {
  const to: To = {
    async to(target: string): Nothing {
      const sourceGlob = path.join(glob, ...globs)
      const source = await findOneFileOrError(context, sourceGlob)
      const sourceFile = inContext(source, context)
      const targetFile = inContext(target, context)
      const options = Object.assign({ cwd: context.cwd }, defaultOptions)
      return cpFile(sourceFile, targetFile, options)
    },
  }
  return to
}
