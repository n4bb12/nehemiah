import test from "ava"
import sinon, { SinonSpy } from "sinon"

import { Logger } from "../src"

const logger = new Logger()
let consoleLog: SinonSpy

test.beforeEach(() => {
  consoleLog = sinon.spy(console, "log")
})

test.afterEach(() => {
  consoleLog.restore()
})

test("logger works", async t => {
  logger.warn("Test", "warning")

  t.true(consoleLog.calledOnce)

  const args = JSON.stringify(consoleLog.args)
  t.regex(args, /Test/)
  t.regex(args, /warning/)
})
