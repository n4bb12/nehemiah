import { copyFile } from "./copy"
import { deleteFiles } from "./delete"
import { fileExists } from "./exists"
import { findFiles, findOneFileWithError, findOneFileWithWarning } from "./find"
import { logger } from "./logger"
import { modifyFile } from "./modify"
import { File, Files, Modifier, Nothing } from "./types"

export default class Nehemiah {

  constructor(
    private cwd: string = process.cwd(),
  ) { }

  public async find(patterns: string | string[]): Files {
    return findFiles(this.cwd, patterns)
  }

  public async findOneWithError(pattern: string): File {
    return findOneFileWithError(this.cwd, pattern)
  }

  public async findOneWithWarning(pattern: string): File {
    return findOneFileWithWarning(this.cwd, pattern)
  }

  public async exists(pattern: string): File {
    return fileExists(this.cwd, pattern)
  }

  public async copy(source: string, target: string): Nothing {
    return copyFile(this.cwd, source, target)
  }

  public async delete(patterns: string | string[]): Files {
    return deleteFiles(this.cwd, patterns)
  }

  public async modify(source: string, modifier: Modifier): Nothing {
    return modifyFile(this.cwd, source, modifier)
  }

  public warn(...args): void {
    logger.warn(...args)
  }

}
