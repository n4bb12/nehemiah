import test from "ava"
import sinon from "sinon"

import Nehemiah from "../src"

test("uses current cwd when no directory is passed", async t => {
  const n = new Nehemiah()

  t.is(n.cwd, process.cwd())
})

test("warn", async t => {
  const n = new Nehemiah()
  const consoleLog = sinon.spy(console, "log")

  await n.warn("sample warning")

  t.true(consoleLog.calledOnce)
  t.true((consoleLog.firstCall.lastArg as string).includes("sample warning"))

  consoleLog.restore()
})
