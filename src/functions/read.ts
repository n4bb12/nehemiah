import fs from "graceful-fs"
import path from "path"
import pify from "pify"

import { Context, Maybe } from "../types"

import { findOneFileOrWarn } from "./find"

const fsReadFile = pify(fs.readFile)

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

  public async asText(): Maybe<string> {
    return this.read()
  }

  public async asJson<T>(): Maybe<T> {
    const text = await this.read()
    return text ? JSON.parse(text) : null
  }
}
