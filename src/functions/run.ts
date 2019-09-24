import execa, { ExecaReturnValue, Options as ExecaOptions } from "execa"
import { merge } from "lodash"

import { Context } from "../types"

export type RunOptions = ExecaOptions
export type RunResult = Promise<ExecaReturnValue<string>>

const defaultOptions: execa.Options = {
  stdio: "inherit",
}

export async function runCommand(context: Context, cmd: string, options?: RunOptions): RunResult {
  const execaOptions = merge(
    {
      cwd: context.cwd,
      shell: true,
    },
    defaultOptions,
    options,
  )
  const command = `sh -c \"${cmd.replace(/"/g, `\\\"`)}\"`
  return execa(command, execaOptions)
}
