import * as globby from "globby"

/**
 * https://github.com/sindresorhus/globby#options
 * https://github.com/mrmlnc/fast-glob#options-1
 */
const findFilesDefaultOptions = {
  expandDirectories: false,
  gitignore: true,
}

export default class Nehemiah {

  private readonly findFilesOptions = Object.assign({},
    findFilesDefaultOptions,
    { cwd: this.cwd },
  )

  constructor(
    private cwd: string,
  ) { }

  public findFiles(patterns: string | string[]): Promise<string[]> {
    return globby(patterns, this.findFilesOptions)
  }

}
