import fs from "graceful-fs"
import path from "path"
import pify from "pify"

import { Context, Converter, Modifier, Nothing } from "../types"

import { findOneFileOrWarning } from "./find"

const readFile = pify(fs.readFile)
const writeFile = pify(fs.writeFile)

const converters: {
  [key: string]: Converter,
} = {
  json: {
    parse: input => JSON.parse(input),
    stringify: input => JSON.stringify(input),
  },
}

export async function modifyFile<T>(context: Context, source: string, modifier: Modifier<T>): Nothing {
  const filename = await findOneFileOrWarning(context, source)
  if (filename) {
    const ext = path.extname(filename)

    const converter = converters[ext]
    if (!converter) {
      throw new Error("No converter for extension: " + ext)
    }

    const sourceFile = path.join(context.cwd, filename)
    let text = await readFile(sourceFile, "utf8")
    let value: T = converter.parse(text)

    value = await modifier(value) || value

    text = converter.stringify(value)
    return writeFile(sourceFile, text, "utf8")
  }
  return Promise.resolve()
}
