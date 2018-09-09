import {
  copyFile,
  deleteFiles,
  fileExists,
  findFiles,
  findOneFileOrError,
  findOneFileOrWarn,
  mergeFile,
  modifyFile,
  readFile,
  runCmd,
  writeFile,
} from "./functions"
import { Logger } from "./logger"
import { Context, File, Files, Modifier, Nothing, To } from "./types"

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
    return findOneFileOrWarn(this.context, glob)
  }

  public async exists(glob: string): File {
    return fileExists(this.context, glob)
  }

  public copy(glob: string, ...globs: string[]): To {
    return copyFile(this.context, glob, ...globs)
  }

  public async delete(globs: string | string[]): Files {
    return deleteFiles(this.context, globs)
  }

  public async read<T = any>(glob: string): Promise<T | undefined> {
    return readFile<T>(this.context, glob)
  }

  public async write<T = any>(filename: string, value: T): Nothing {
    return writeFile<T>(this.context, filename, value)
  }

  public async modify<T = any>(glob: string, modifier: Modifier<T>): Nothing {
    return modifyFile<T>(this.context, glob, modifier)
  }

  public async merge(globs: string | string[], filename: string): Nothing {
    return mergeFile(this.context, globs, filename)
  }

  public async run(cmd: string) {
    return runCmd(this.context, cmd)
  }

  public warn(...args): void {
    this.logger.warn(...args)
  }

}
