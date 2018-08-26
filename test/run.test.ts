import test from "ava"

import Nehemiah from "../src"

const cwd = __dirname

function testCmd(title: string, filename: string, command: string) {
  test(title, async t => {
    const n = new Nehemiah(cwd)
    t.falsy(await n.exists(filename))

    await n.run(command)
    t.truthy(await n.exists(filename))

    await n.delete(filename)
  })
}

testCmd("no quotes", "f1", `touch f1`)
testCmd("single quotes", "f2", `touch 'f2'`)
testCmd("double quotes", "f3", `touch "f3"`)
