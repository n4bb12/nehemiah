import execa from "execa"
import { Context, Nothing } from "../types"

const defaultOptions: execa.Options = {
  stdio: "inherit",
}

export async function runCmd(context: Context, cmd: string): Nothing {
  const options = Object.assign({ cwd: context.cwd }, defaultOptions)
  const command = `sh -c \"${cmd.replace(/"/g, `\\\"`)}\"`
  const result = await execa.shell(command, options)
}
