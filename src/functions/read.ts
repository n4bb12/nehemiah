import fs from "graceful-fs"
import path from "path"
import pify from "pify"

import { Context, Maybe } from "../types"

import { getConverter } from "./convert"
import { findOneFileOrWarn } from "./find"

const fsReadFile = pify(fs.readFile)

export async function readFile<T>(context: Context, glob: string): Maybe<T> {
  const filename = await findOneFileOrWarn(context, glob)
  if (!filename) {
    return
  }

  const converter = getConverter(filename)
  const sourceFile = path.join(context.cwd, filename)
  const text = await fsReadFile(sourceFile, "utf8")
  const value = converter.parse<T>(text)

  return value
}
