import { findFiles } from "./find"
import { File } from "./types"

export async function fileExists(cwd: string, pattern: string): File {
  const files = await findFiles(cwd, pattern)
  return files[0]
}
