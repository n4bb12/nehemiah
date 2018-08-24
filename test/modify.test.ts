import test from "ava"

import Nehemiah from "../src"

const n = new Nehemiah(__dirname)
const noop = x => x

test("unknown extension throws error", async t => {
  const unknownExtension = "ts"

  const error: Error = await t.throwsAsync(async () => {
    await n.modify("modify.test." + unknownExtension, noop)
  })

  t.true(error.message.includes(unknownExtension))
})

test.todo("missing file logs warning")
test.todo("modify uses changed object")
test.todo("modify uses returned object")
