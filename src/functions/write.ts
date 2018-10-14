import fs from "graceful-fs"
import path from "path"
import { promisify } from "util"

import { Context, Nothing } from "../types"

const fsWriteFile = promisify(fs.writeFile)
const finalNewLine = "\n"

export function writeFile(context: Context, filename: string): WriteAs {
  const write = async (text?: string) => {
    if (text) {
      const file = path.join(context.cwd, filename)
      const content = text.trim() + finalNewLine
      await fsWriteFile(file, content, "utf8")
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
    const text = value ? JSON.stringify(value, null, 2) : value
    await this.write(text)
  }

  public async asLines(value?: string[]): Nothing {
    const text = value ? value.join("\n") : value
    await this.write(text)
  }

}
