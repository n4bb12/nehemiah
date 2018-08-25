import path from "path"

import { Converter } from "../types"

const converters: {
  [key: string]: Converter,
} = {
  json: {
    parse: input => JSON.parse(input),
    stringify: input => JSON.stringify(input),
  },
}

export function getConverter<T>(filename: string): Converter {
  const ext = path.extname(filename) || filename
  if (ext.length > 1) {
    const converter = converters[ext.substr(1)]
    if (converter) {
      return converter
    }
  }
  throw new Error("Converter not found: " + filename)
}
