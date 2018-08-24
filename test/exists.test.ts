import test from "ava"

import { fileExists } from "../src"

const cwd = __dirname

test("existing file exists", async t => {
  const file = "find.test.ts"
  t.truthy(await fileExists(cwd, file))
})

test("non-existing file doesn't exist", async t => {
  const file = "find.ts"
  t.falsy(await fileExists(cwd, file))
})
