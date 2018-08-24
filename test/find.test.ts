import test from "ava"

import Nehemiah from "../src"

const n = new Nehemiah(__dirname)

test("find existing file", async t => {
  const testfile = "find.test.ts"
  const files = await n.find(testfile)
  t.deepEqual(files, [testfile])
})

test("don't find non-existing file", async t => {
  const testfile = "find.ts"
  const files = await n.find(testfile)
  t.deepEqual(files, [])
})
