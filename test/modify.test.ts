import test from "ava"

import { modifyFile } from "../src"

const cwd = __dirname
const noop = x => x

test("unknown extension throws error", async t => {
  const unknownExt = "ts"

  const error: Error = await t.throwsAsync(async () => {
    await modifyFile(cwd, "modify.test." + unknownExt, noop)
  })

  t.true(error.message.includes(unknownExt))
})

test.todo("missing file logs warning")
test.todo("modify uses changed object")
test.todo("modify uses returned object")
