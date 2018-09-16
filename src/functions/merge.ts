import { Context, Nothing } from "../types"

import { findFiles } from "./find"
import { readFile } from "./read"
import { writeFile } from "./write"

export async function mergeFile<T>(context: Context, globs: string | string[], filename: string): Nothing {
  const files = await findFiles(context, globs)
  if (files.length === 0) {
    context.logger.warn("No source files found: " + JSON.stringify(globs) + ": Skipping merge")
    return
  }
  const promises = files.map(async file => await readFile(context, file).asText())
  const fileContents = await Promise.all(promises)
  const merged = fileContents.filter(lines => lines).join("\n\n")
  await writeFile(context, filename, merged)
}
