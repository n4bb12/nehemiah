import path from "path"

import { Context } from "../types"

export function inContext(file: string, context: Context): string {
  return path.isAbsolute(file)
    ? file
    : path.join(context.cwd, file)
}
