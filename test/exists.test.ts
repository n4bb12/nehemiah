import test from "ava"

import Nehemiah from "../src"

const cwd = process.cwd() + "/test"

test("existing file exists", async t => {
  const n = new Nehemiah(cwd)
  const file = "find.test.ts"

  t.truthy(await n.exists(file))
})

test("non-existing file doesn't exist", async t => {
  const n = new Nehemiah(cwd)
  const file = "find.ts"

  t.falsy(await n.exists(file))
})
