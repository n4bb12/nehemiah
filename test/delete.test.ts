import test from "ava"

import { copyFile, deleteFiles, fileExists } from "../src"

const cwd = __dirname

test("delete non-existing file", async t => {
  const file = "does-not-exist"
  await deleteFiles(cwd, file)
})

test("delete existing file", async t => {
  const source = "delete.test.ts"
  const target = source + ".bak"

  await copyFile(cwd, source, target)
  t.truthy(await fileExists(cwd, target))

  await deleteFiles(cwd, target)
  t.falsy(await fileExists(cwd, target))
})
