import test from "ava"
import sinon from "sinon"

import Nehemiah from "../src"

const cwd = process.cwd() + "/test"
const noop = x => x

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

  await n.modify(file, async obj => {
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

  await n.modify(file, async obj => {
    return { time }
  })

  const newContent = await n.read(file)
  t.deepEqual(newContent, { time })

  await n.delete(file)
})

test("unknown extension uses the default noop converter", async t => {
  const n = new Nehemiah(cwd)
  const time = new Date().getTime()
  const file = "modify-unknown"
  await n.write(file, "as")

  await n.modify<string>(file, async text => {
    return text + "df"
  })

  const newContent = await n.read(file)
  t.is(newContent, "asdf")

  await n.delete(file)
})
