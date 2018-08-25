import fs from "graceful-fs"
import path from "path"
import pify from "pify"

import { Context } from "../types"

import { getConverter } from "./convert"
import { findOneFileOrWarning } from "./find"

const fsReadFile = pify(fs.readFile)

export async function readFile<T>(context: Context, glob: string): Promise<T | null> {
  const filename = await findOneFileOrWarning(context, glob)
  if (!filename) {
    return null
  }

  const converter = getConverter(filename)
  const sourceFile = path.join(context.cwd, filename)
  const text = await fsReadFile(sourceFile, "utf8")
  const value = converter.parse<T>(text)

  return value
}
