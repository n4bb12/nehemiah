import test from "ava"

import Nehemiah from "../src"

const n = new Nehemiah(__dirname)

test("existing file exists", async t => {
  const file = "find.test.ts"
  t.truthy(await n.exists(file))
})

test("non-existing file doesn't exist", async t => {
  const file = "find.ts"
  t.falsy(await n.exists(file))
})
