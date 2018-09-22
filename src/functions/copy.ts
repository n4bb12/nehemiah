import cpFile from "cp-file"
import deepmerge from "deepmerge"
import path from "path"

import { Context, CopyTo, Nothing } from "../types"

import { findOneFileOrError } from "./find"
import { inContext } from "./path"

const defaultOptions = {
  overwrite: true,
}

/**
 * https://github.com/sindresorhus/cp-file#api
 */
export function copyFile(context: Context, glob: string, ...globs: string[]): CopyTo {
  const to: CopyTo = {
    async to(target: string): Nothing {
      const sourceGlob = path.join(glob, ...globs)
      const source = await findOneFileOrError(context, sourceGlob)
      const sourceFile = inContext(source, context)
      const targetFile = inContext(target, context)
      const options = deepmerge({ cwd: context.cwd }, defaultOptions)
      return cpFile(sourceFile, targetFile, options)
    },
  }
  return to
}
