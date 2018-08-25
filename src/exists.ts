import { findFiles } from "./find"
import { Context, File } from "./types"

export async function fileExists(context: Context, pattern: string): File {
  const files = await findFiles(context, pattern)
  return files[0]
}
