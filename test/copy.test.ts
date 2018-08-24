import test from "ava"

import Nehemiah from "../src"

const n = new Nehemiah(__dirname)

test("copy file", async t => {
  const source = "copy.test.ts"
  const target = source + ".bak"

  await n.delete(target)
  t.falsy(await n.exists(target))

  await n.copy(source, target)
  t.truthy(await n.exists(target))

  await n.delete(target)
})

test("copy non-existing file throws", async t => {
  const file = "non-existing"

  t.falsy(await n.exists(file))

  const error: Error = await t.throwsAsync(async () => {
    await n.copy(file, file + ".bak")
  })

  t.true(error.message.includes(file))
})
