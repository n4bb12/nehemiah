import test from "ava"
import sinon from "sinon"

import Nehemiah from "../src"

const cwd = __dirname
const noop = x => x

test("unknown extension throws error", async t => {
  const n = new Nehemiah(cwd)
  const unknownExt = "ts"

  const error: Error = await t.throwsAsync(async () => {
    await n.modify("modify.test." + unknownExt, noop)
  })

  t.true(error.message.includes(unknownExt))
})

test("missing file logs warning", async t => {
  const n = new Nehemiah(cwd)
  const loggerWarn = sinon.spy(n.logger, "warn")
  const missingFile = "missing-file"

  await n.modify(missingFile, noop)

  t.true(loggerWarn.calledOnce)
})

test("modify uses changed object", async t => {
  const n = new Nehemiah(cwd)
  const time = new Date().getTime()
  const file = "modify-changed.json"
  await n.write(file, {})

  await n.modify<any>(file, async obj => {
    obj.time = time
  })

  const newContent = await n.read(file)
  t.deepEqual(newContent, { time })

  await n.delete(file)
})

test("modify uses returned object", async t => {
  const n = new Nehemiah(cwd)
  const time = new Date().getTime()
  const file = "modify-returned.json"
  await n.write(file, {})

  await n.modify<any>(file, async obj => {
    return { time }
  })

  const newContent = await n.read(file)
  t.deepEqual(newContent, { time })

  await n.delete(file)
})
