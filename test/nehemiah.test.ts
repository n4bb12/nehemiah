import test from "ava"
import sinon from "sinon"

import Nehemiah from "../src"

test("uses current cwd when no directory is passed", async t => {
  const n = new Nehemiah()

  t.is(n.cwd, process.cwd())
})

test("warn works", async t => {
  const n = new Nehemiah()
  const consoleLog = sinon.spy(console, "log")

  await n.warn("sample warning")

  t.true(consoleLog.calledOnce)
  t.true((consoleLog.firstCall.lastArg as string).includes("sample warning"))

  consoleLog.restore()
})

test("name equals the cwd basename", async t => {
  const n = new Nehemiah()
  t.is(n.name, require("path").basename(process.cwd()))
})
