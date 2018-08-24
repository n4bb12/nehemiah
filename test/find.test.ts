import test from "ava"

import { findFiles } from "../src"

const cwd = __dirname

test("find existing file", async t => {
  const testfile = "find.test.ts"
  const files = await findFiles(cwd, testfile)
  t.deepEqual(files, [testfile])
})

test("don't find non-existing file", async t => {
  const testfile = "find.ts"
  const files = await findFiles(cwd, testfile)
  t.deepEqual(files, [])
})
