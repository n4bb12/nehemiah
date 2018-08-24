import chalk from "chalk"

// tslint:disable no-console

export const logger = {
  warn(...args) {
    console.log(...args.map(arg => chalk.yellow(arg)))
  },
}
