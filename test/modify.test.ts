import test from "ava"
import sinon from "sinon"

import Nehemiah from "../src"

const cwd = process.cwd() + "/test"
const noop = <T>(x: T) => x

test("missing file causes warning", async t => {
  const n = new Nehemiah(cwd)
  const loggerWarn = sinon.spy(n.logger, "warn")
  const missingFile = "missing-file"

  await n.modify(missingFile).asText(noop)

  t.true(loggerWarn.calledOnce)
})

test("modify uses changed object", async t => {
  const n = new Nehemiah(cwd)
  const time = new Date().getTime()
  const file = "modify-json--changed"

  await n.write(file).asJson({})
  await n.modify(file).asJson(async obj => {
    obj.time = time
  })
  const newContent = await n.read(file).asJson()

  t.deepEqual(newContent, { time })

  await n.delete(file)
})

test("modify uses returned object", async t => {
  const n = new Nehemiah(cwd)
  const time = new Date().getTime()
  const file = "modify-json--returned"

  await n.write(file).asJson({})
  await n.modify(file).asJson(async obj => {
    return { time }
  })
  const newContent = await n.read(file).asJson()

  t.deepEqual(newContent, { time })

  await n.delete(file)
})

test("modify text", async t => {
  const n = new Nehemiah(cwd)
  const file = "modify-text"

  await n.write(file).asText("text")
  await n.modify(file).asText(async text => {
    return `line of ${text}`
  })
  const newContent = await n.read(file).asText()

  t.is(newContent, "line of text\n")

  await n.delete(file)
})

test("modify lines", async t => {
  const n = new Nehemiah(cwd)
  const file = "modify-lines"

  await n.write(file).asLines(["lines"])
  await n.modify(file).asLines(async lines => {
    return ["first line", ...lines, "last line"]
  })
  const newContent = await n.read(file).asLines()

  t.deepEqual(newContent, ["first line", "lines", "last line"])

  await n.delete(file)
})
