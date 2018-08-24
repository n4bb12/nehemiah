import test from "ava"
import sinon, { SinonSpy } from "sinon"

import { logger } from "../src"

let log: SinonSpy

test.beforeEach(() => {
  log = sinon.spy(console, "log")
})

test.afterEach(() => {
  (console as any).log.restore()
})

test("logger works", async t => {
  logger.warn("test", "warning")

  t.true(log.calledOnce)

  const args = JSON.stringify(log.args)
  t.regex(args, /test/)
  t.regex(args, /warning/)
})
