import {
  copyFile,
  deleteFiles,
  fileExists,
  findFiles,
  findOneFileOrError,
  findOneFileOrWarning,
  modifyFile,
  readFile,
  writeFile,
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

  public async read<T>(filename: string): Promise<T | null> {
    return readFile<T>(this.context, filename)
  }

  public async write<T>(filename: string, value: T): Nothing {
    return writeFile<T>(this.context, filename, value)
  }

  public async modify<T>(sourceGlob: string, modifier: Modifier<T>): Nothing {
    return modifyFile<T>(this.context, sourceGlob, modifier)
  }

  public warn(...args): void {
    this.logger.warn(...args)
  }

}
