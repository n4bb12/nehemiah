import { Context, Modifier, Nothing } from "../types"

import { ReadAs, readFile } from "./read"
import { WriteAs, writeFile } from "./write"

export function modifyFile(context: Context, filename: string): ModifyAs {
  const read = readFile(context, filename)
  const write = writeFile(context, filename)
  return new ModifyAs(read, write)
}

export class ModifyAs {

  constructor(
    private readonly read: ReadAs,
    private readonly write: WriteAs,
  ) { }

  public async asText(modify: Modifier<string>): Nothing {
    const value = await this.read.asText()
    const modified = value ? await modify(value) || value : value
    await this.write.asText(modified)
  }

  public async asJson<T = any>(modify: Modifier<T>): Nothing {
    const value = await this.read.asJson<T>()
    const modified = value ? await modify(value) || value : value
    await this.write.asJson(modified)
  }

  public async asLines(modify: Modifier<string[]>): Nothing {
    const value = await this.read.asLines()
    const modified = value ? await modify(value) || value : value
    await this.write.asLines(modified)
  }

}
