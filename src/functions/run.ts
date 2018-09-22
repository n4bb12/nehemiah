import execa, { ExecaReturns } from "execa"
import { merge } from "lodash"

import { Context } from "../types"

export type CmdResult = Promise<ExecaReturns>

const defaultOptions: execa.Options = {
  stdio: "inherit",
}

export async function runCmd(context: Context, cmd: string): CmdResult {
  const options = merge({ cwd: context.cwd }, defaultOptions)
  const command = `sh -c \"${cmd.replace(/"/g, `\\\"`)}\"`
  return execa.shell(command, options)
}
