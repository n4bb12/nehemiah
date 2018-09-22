import execa, { ExecaReturns, Options as ExecaOptions } from "execa"
import { merge } from "lodash"

import { Context } from "../types"

export type RunResult = Promise<ExecaReturns>
export type RunOptions = ExecaOptions

const defaultOptions: execa.Options = {
  stdio: "inherit",
}

export async function runCommand(context: Context, cmd: string, options?: RunOptions): RunResult {
  const execaOptions = merge({ cwd: context.cwd }, defaultOptions, options)
  const command = `sh -c \"${cmd.replace(/"/g, `\\\"`)}\"`
  return execa.shell(command, execaOptions)
}
