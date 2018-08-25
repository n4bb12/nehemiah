import { copyFile } from "./copy"
import { deleteFiles } from "./delete"
import { fileExists } from "./exists"
import { findFiles, findOneFileWithError, findOneFileWithWarning } from "./find"
import { Logger } from "./logger"
import { modifyFile } from "./modify"
import { Context, File, Files, Modifier, Nothing } from "./types"

export default class Nehemiah {

  public readonly logger = new Logger()
  private readonly context: Context = this

  constructor(
    public readonly cwd: string = process.cwd(),
  ) { }

  public async find(patterns: string | string[]): Files {
    return findFiles(this.context, patterns)
  }

  public async findOneWithError(pattern: string): File {
    return findOneFileWithError(this.context, pattern)
  }

  public async findOneWithWarning(pattern: string): File {
    return findOneFileWithWarning(this.context, pattern)
  }

  public async exists(pattern: string): File {
    return fileExists(this.context, pattern)
  }

  public async copy(source: string, target: string): Nothing {
    return copyFile(this.context, source, target)
  }

  public async delete(patterns: string | string[]): Files {
    return deleteFiles(this.context, patterns)
  }

  public async modify(source: string, modifier: Modifier): Nothing {
    return modifyFile(this.context, source, modifier)
  }

  public warn(...args): void {
    this.logger.warn(...args)
  }

}
