import fs from "graceful-fs"
import path from "path"
import { promisify } from "util"

import { Context, Maybe } from "../types"

import { findOneFileOrWarn } from "./find"

const fsReadFile = promisify(fs.readFile)

export function readFile(context: Context, glob: string): ReadAs {
  const read = async () => {
    const filename = await findOneFileOrWarn(context, glob)
    if (!filename) {
      return Promise.resolve(undefined)
    }
    const sourceFile = path.join(context.cwd, filename)
    return fsReadFile(sourceFile, "utf8")
  }
  return new ReadAs(read)
}

export class ReadAs {

  constructor(
    private readonly read: () => Maybe<string>,
  ) { }

  async asText(): Maybe<string> {
    return this.read()
  }

  async asJson<T = any>(): Maybe<T> {
    const text = await this.read()
    return text ? JSON.parse(text) : null
  }

  async asLines(): Maybe<string[]> {
    const text = await this.read()
    return text
      ? text.split(/[\r\n]+/).map(line => line.trim()).filter(line => line)
      : undefined
  }

}
