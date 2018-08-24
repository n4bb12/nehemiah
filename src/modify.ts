import fs from "graceful-fs"
import path from "path"
import pify from "pify"

import { findOneFileWithWarning } from "./find"
import { Converter, Modifier, Nothing } from "./types"

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

export async function modifyFile(cwd: string, source: string, modifier: Modifier): Nothing {
  const filename = await findOneFileWithWarning(cwd, source)
  if (filename) {
    const ext = path.extname(filename)

    const converter = converters[ext]
    if (!converter) {
      throw new Error("No converter for extension: " + ext)
    }

    const sourceFile = path.join(cwd, filename)
    let text = await readFile(sourceFile, "utf8")
    let value = converter.parse(text)

    value = modifier(value) || value

    text = converter.stringify(value)
    return writeFile(sourceFile, text, "utf8")
  }
  return Promise.resolve()
}
