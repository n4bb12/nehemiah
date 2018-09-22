import {
  CmdResult,
  copyFile,
  CopyTo,
  deleteFiles,
  fileExists,
  findFiles,
  findOneFileOrError,
  findOneFileOrWarn,
  mergeFile,
  ModifyAs,
  modifyFile,
  ReadAs,
  readFile,
  runCmd,
  WriteAs,
  writeFile,
} from "./functions"
import { Logger } from "./logger"
import { Context, File, Files, Nothing } from "./types"

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

  public copy(glob: string, ...globs: string[]): CopyTo {
    return copyFile(this.context, glob, ...globs)
  }

  public async delete(globs: string | string[]): Files {
    return deleteFiles(this.context, globs)
  }

  public read(glob: string): ReadAs {
    return readFile(this.context, glob)
  }

  public write(filename: string): WriteAs {
    return writeFile(this.context, filename)
  }

  public modify(filename: string): ModifyAs {
    return modifyFile(this.context, filename)
  }

  public async merge(globs: string | string[], filename: string): Nothing {
    return mergeFile(this.context, globs, filename)
  }

  public async run(cmd: string): CmdResult {
    return runCmd(this.context, cmd)
  }

  public warn(...args): void {
    this.logger.warn(...args)
  }

}
