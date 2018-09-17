import fs from "graceful-fs"
import path from "path"
import pify from "pify"

import { Context, Nothing } from "../types"

const fsWriteFile = pify(fs.writeFile)

export function writeFile(context: Context, filename: string): WriteAs {
  const write = async (text?: string) => {
    if (text) {
      const file = path.join(context.cwd, filename)
      await fsWriteFile(file, text, "utf8")
    }
  }
  return new WriteAs(write)
}

export class WriteAs {

  constructor(
    private readonly write: (text?: string) => Nothing,
  ) { }

  public async asText(text?: string): Nothing {
    await this.write(text)
  }

  public async asJson(value?: any): Nothing {
    const text = value ? JSON.stringify(value) : value
    await this.write(text)
  }

  public async asLines(value?: string[]): Nothing {
    const text = value ? value.join("\n") : value
    await this.write(text)
  }

}
