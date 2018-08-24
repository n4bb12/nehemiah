import test from "ava"

import { copyFile, deleteFiles, fileExists } from "../src"

const cwd = __dirname

test("copy file", async t => {
  const source = "copy.test.ts"
  const target = source + ".bak"

  await deleteFiles(cwd, target)
  t.falsy(await fileExists(cwd, target))

  await copyFile(cwd, source, target)
  t.truthy(await fileExists(cwd, target))

  await deleteFiles(cwd, target)
})

test("copy non-existing file throws error", async t => {
  const file = "non-existing"

  t.falsy(await fileExists(cwd, file))

  const error: Error = await t.throwsAsync(async () => {
    await copyFile(cwd, file, file + ".bak")
  })

  t.true(error.message.includes(file))
})
