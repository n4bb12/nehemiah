import test from "ava"

import Nehemiah from "../src"

const cwd = __dirname

test("delete non-existing file", async t => {
  const n = new Nehemiah(cwd)
  const file = "does-not-exist"
  await n.delete(file)
})

test("delete existing file", async t => {
  const n = new Nehemiah(cwd)
  const source = "delete.test.ts"
  const target = source + ".bak"

  await n.copy(source).to(target)
  t.truthy(await n.exists(target))

  await n.delete(target)
  t.falsy(await n.exists(target))
})
