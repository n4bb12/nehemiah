import path from "path"

import {
  copyFile,
  CopyTo,
  deleteFiles,
  fileExists,
  findFiles,
  findOneFileOrError,
  findOneFileOrWarn,
  FindOptions,
  mergeFile,
  ModifyAs,
  modifyFile,
  ReadAs,
  readFile,
  runCommand,
  RunOptions,
  RunResult,
  WriteAs,
  writeFile,
} from "./functions"
import { Logger } from "./logger"
import { Context, File, Files, Nothing } from "./types"

export default class Nehemiah {

  readonly logger = new Logger()
  readonly name = path.basename(this.cwd)

  private readonly context: Context = this

  constructor(
    readonly cwd: string = process.cwd(),
  ) { }

  async find(globs: string | string[], options?: FindOptions): Files {
    return findFiles(this.context, globs, options)
  }

  async findOneOrError(glob: string, options?: FindOptions): File {
    return findOneFileOrError(this.context, glob, options)
  }

  async findOneOrWarning(glob: string, options?: FindOptions): File {
    return findOneFileOrWarn(this.context, glob, options)
  }

  async exists(glob: string): File {
    return fileExists(this.context, glob)
  }

  copy(glob: string, ...globs: string[]): CopyTo {
    return copyFile(this.context, glob, ...globs)
  }

  async delete(globs: string | string[]): Files {
    return deleteFiles(this.context, globs)
  }

  read(glob: string): ReadAs {
    return readFile(this.context, glob)
  }

  write(filename: string): WriteAs {
    return writeFile(this.context, filename)
  }

  modify(filename: string): ModifyAs {
    return modifyFile(this.context, filename)
  }

  async merge(globs: string | string[], filename: string): Nothing {
    return mergeFile(this.context, globs, filename)
  }

  async run(cmd: string, options?: RunOptions): RunResult {
    return runCommand(this.context, cmd, options)
  }

  warn(...args: any[]): void {
    this.logger.warn(...args)
  }

}
