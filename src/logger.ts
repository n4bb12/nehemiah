import chalk from "chalk"

// tslint:disable no-console

export class Logger {

  public warn(...args) {
    args = ["[nehemiah]", ...args]
    console.log(...args.map(arg => chalk.yellow(arg)))
  }

}
