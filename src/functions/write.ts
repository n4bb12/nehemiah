import fs from "graceful-fs"
import path from "path"
import pify from "pify"

import { Context, Nothing } from "../types"

import { getConverter } from "./convert"

const fsWriteFile = pify(fs.writeFile)

export async function writeFile(context: Context, filename: string, value: any): Nothing {
  const converter = getConverter(filename)
  const file = path.join(context.cwd, filename)
  const text = converter.stringify(value)

  await fsWriteFile(file, text, "utf8")
}
