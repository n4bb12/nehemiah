import * as cpFile from "cp-file"
import * as del from "del"
import * as globby from "globby"
import * as path from "path"

export type File = Promise<string>
export type Files = Promise<string[]>
export type Nothing = Promise<void>

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

  private readonly findOptions = Object.assign({},
    Nehemiah.findDefaultOptions,
    { cwd: this.cwd || process.cwd() },
  )

  private readonly copyOptions = Object.assign({},
    Nehemiah.copyDefaultOptions,
    { cwd: this.cwd || process.cwd() },
  )

  private readonly deleteOptions = Object.assign({},
    Nehemiah.deleteDefaultOptions,
    { cwd: this.cwd || process.cwd() },
  )

  constructor(
    private cwd?: string,
  ) { }

  /**
   * https://github.com/sindresorhus/globby#api
   * https://github.com/mrmlnc/fast-glob#options-1
   */
  public find(...patterns: string[]): Files {
    return globby(patterns, this.findOptions)
  }

  public async exists(pattern: string): File {
    const files = await this.find(pattern)
    return files[0]
  }

  /**
   * https://github.com/sindresorhus/cp-file#api
   */
  public async copy(source: string, target: string): Nothing {
    const filenames = await this.find(source)
    if (filenames.length === 0) {
      throw new Error("Source file does not exist: " + source)
    }
    if (filenames.length !== 1) {
      throw new Error("Only one source file allowed: " + source)
    }
    const sourceFile = this.incwd(filenames[0])
    const targetFile = this.incwd(target)
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

  private incwd(filename: string): string {
    return path.join(this.findOptions.cwd, filename)
  }

}
