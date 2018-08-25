import {
  copyFile,
  deleteFiles,
  fileExists,
  findFiles,
  findOneFileOrError,
  findOneFileOrWarning,
  modifyFile,
} from "./functions"
import { Logger } from "./logger"
import { Context, File, Files, Modifier, Nothing } from "./types"

export default class Nehemiah {

  public readonly logger = new Logger()
  private readonly context: Context = this

  constructor(
    public readonly cwd: string = process.cwd(),
  ) { }

  public async find(globs: string | string[]): Files {
    return findFiles(this.context, globs)
  }

  public async findOneOrError(glob: string): File {
    return findOneFileOrError(this.context, glob)
  }

  public async findOneOrWarning(glob: string): File {
    return findOneFileOrWarning(this.context, glob)
  }

  public async exists(glob: string): File {
    return fileExists(this.context, glob)
  }

  public async copy(sourceGlob: string, target: string): Nothing {
    return copyFile(this.context, sourceGlob, target)
  }

  public async delete(globs: string | string[]): Files {
    return deleteFiles(this.context, globs)
  }

  public async modify(source: string, modifier: Modifier): Nothing {
    return modifyFile(this.context, source, modifier)
  }

  public warn(...args): void {
    this.logger.warn(...args)
  }

}
