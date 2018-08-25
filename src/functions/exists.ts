import { Context, File } from "../types"
import { findFiles } from "./find"

export async function fileExists(context: Context, glob: string): File {
  const files = await findFiles(context, glob)
  return files[0]
}
