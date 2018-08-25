import { Context, Modifier, Nothing } from "../types"

import { findOneFileOrWarning } from "./find"
import { readFile } from "./read"
import { writeFile } from "./write"

export async function modifyFile<T>(context: Context, glob: string, modifier: Modifier<T>): Nothing {
  const filename = await findOneFileOrWarning(context, glob)
  if (!filename) {
    return Promise.resolve()
  }

  let value = await readFile<T>(context, glob)
  if (!value) {
    return
  }
  value = await modifier(value) || value

  await writeFile(context, filename, value)
}
