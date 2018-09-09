import test from "ava"
import sinon from "sinon"

import Nehemiah, { mergeFile } from "../src"

const cwd = process.cwd() + "/test"

test("prints a warning and does not write a file when no sources are found", async t => {
  const n = new Nehemiah(cwd)
  const loggerWarn = sinon.spy(n.logger, "warn")
  const sourceFiles = "no-such-file-*"
  const targetFile = "no-such-file-merged"

  t.deepEqual(await n.find(sourceFiles), [])

  await n.merge(sourceFiles, targetFile)

  t.true(loggerWarn.calledOnce)
  t.falsy(await n.exists(targetFile))
})

test("file gets created without warning and contains source fragments", async t => {
  const n = new Nehemiah(cwd)
  const loggerWarn = sinon.spy(n.logger, "warn")
  const sourceFileA = "file-a"
  const sourceFileB = "file-b"
  const targetFile = "file-merged"

  await n.write(sourceFileA, sourceFileA)
  await n.write(sourceFileB, sourceFileB)
  await n.delete(targetFile)

  t.truthy(await n.exists(sourceFileA))
  t.truthy(await n.exists(sourceFileB))
  t.falsy(await n.exists(targetFile))

  await n.merge("file-*", targetFile)

  t.truthy(await n.exists(targetFile))
  t.false(loggerWarn.calledOnce)

  const mergedContent = await n.read<string>(targetFile)
  t.true(mergedContent!.includes(sourceFileA))
  t.true(mergedContent!.includes(sourceFileB))

  await n.delete(sourceFileA)
  await n.delete(sourceFileB)
  await n.delete(targetFile)
})
