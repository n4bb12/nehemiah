import cpFile from "cp-file"
import del from "del"
import globby from "globby"
import fs from "graceful-fs"
import path from "path"
import pify from "pify"

import { logger } from "./logger"

const readFile = pify(fs.readFile)
const writeFile = pify(fs.writeFile)

export type File = Promise<string>
export type Files = Promise<string[]>
export type Nothing = Promise<void>
export type Modifier = <T>(obj: T) => T | undefined

export interface Converter {
  parse<T>(text: string): T,
  stringify<T>(value: T): string,
}

export default class Nehemiah {

  private static readonly findDefaultOptions = {
    dot: true,
    expandDirectories: true,
    gitignore: true,
    onlyFiles: true,
  }

  private static readonly copyDefaultOptions = {
    overwrite: true,
  }

  private static readonly deleteDefaultOptions = {
    dot: true,
    expandDirectories: true,
    gitignore: false,
    onlyFiles: false,
  }

  private readonly instanceOptions = { cwd: this.cwd }

  private readonly findOptions = Object.assign({},
    Nehemiah.findDefaultOptions,
    this.instanceOptions,
  )

  private readonly copyOptions = Object.assign({},
    Nehemiah.copyDefaultOptions,
    this.instanceOptions,
  )

  private readonly deleteOptions = Object.assign({},
    Nehemiah.deleteDefaultOptions,
    this.instanceOptions,
  )

  private readonly converters: {
    [key: string]: Converter,
  } = {
      json: {
        parse: input => JSON.parse(input),
        stringify: input => JSON.stringify(input),
      },
    }

  constructor(
    private cwd: string = process.cwd(),
  ) { }

  /**
   * https://github.com/sindresorhus/globby#api
   * https://github.com/mrmlnc/fast-glob#options-1
   */
  public async find(...patterns: string[]): Files {
    return globby(patterns, this.findOptions)
  }

  public async findOneWithError(pattern: string): File {
    const filenames = await this.find(pattern)
    if (filenames.length === 0) {
      throw new Error("Source file does not exist: " + pattern)
    }
    if (filenames.length !== 1) {
      throw new Error("Only one source file allowed: " + pattern)
    }
    return filenames[0]
  }

  public async findOneWithWarning(pattern: string): File {
    const filenames = await this.find(pattern)
    if (filenames.length === 0) {
      logger.warn("Source file does not exist: " + pattern)
      return filenames[0]
    }
    if (filenames.length !== 1) {
      logger.warn("Only one source file allowed: " + pattern)
      return filenames[0]
    }
    return filenames[0]
  }

  public async exists(pattern: string): File {
    const files = await this.find(pattern)
    return files[0]
  }

  /**
   * https://github.com/sindresorhus/cp-file#api
   */
  public async copy(source: string, target: string): Nothing {
    const sourceFilename = await this.findOneWithError(source)
    const sourceFile = this.relativeToCwd(sourceFilename)
    const targetFile = this.relativeToCwd(target)
    return cpFile(sourceFile, targetFile, this.copyOptions)
  }

  /**
   * https://github.com/sindresorhus/del#api
   */
  public async delete(...patterns: string[]): Files {
    const deletions = patterns.map(async pattern => {
      const exists = await this.exists(pattern)
      if (exists) {
        return del(pattern, this.deleteOptions)
      } else {
        return Promise.resolve<string[]>([])
      }
    })
    return Promise.all(deletions).then(fileArrs => {
      return fileArrs.concat.apply([])
    })
  }

  public async modify(source: string, modifier: Modifier): Nothing {
    const filename = await this.findOneWithWarning(source)
    if (filename) {
      const sourceFile = this.relativeToCwd(filename)
      const extension = path.extname(sourceFile)

      const converter = this.converters[extension]
      if (!converter) {
        throw new Error("No converter for extension: " + extension)
      }

      let text = await readFile(sourceFile, "utf8")
      let value = converter.parse(text)

      value = modifier(value) || value

      text = converter.stringify(value)
      return writeFile(sourceFile, text, "utf8")
    }
    return Promise.resolve()
  }

  private relativeToCwd(filename: string): string {
    return path.join(this.findOptions.cwd, filename)
  }

}
