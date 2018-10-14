import test from "ava"

import sinon from "sinon"
import Nehemiah from "../src"

const cwd = process.cwd() + "/test"

test("find existing file", async t => {
  const n = new Nehemiah(cwd)
  const testfile = "find.test.ts"

  const files = await n.find(testfile)

  t.deepEqual(files, [testfile])
})

test("don't find non-existing file", async t => {
  const n = new Nehemiah(cwd)
  const testfile = "find.ts"

  const files = await n.find(testfile)

  t.deepEqual(files, [])
})

test("logs warning if more than one file is found", async t => {
  const n = new Nehemiah(cwd)
  const testfile = "*.ts"
  const consoleLog = sinon.spy(console, "log")

  await n.findOneOrWarning(testfile)

  t.true(consoleLog.calledOnce)

  consoleLog.restore()
})

test("throws error if more than one file is found", async t => {
  const n = new Nehemiah(cwd)
  const testfile = "*.ts"

  await t.throwsAsync(async () => {
    await n.findOneOrError(testfile)
  })
})
