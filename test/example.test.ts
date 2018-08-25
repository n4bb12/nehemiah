import test from "ava"

import Nehemiah from "../src"

const cwd = __dirname + "/example-project"

test("readme usage example", async t => {
  const n = new Nehemiah(cwd)

  await n.modify<any>("package.json", async p => {
    p.author = "Esra"

    if (!Array.isArray(p.keywords) || p.keywords.length < 3) {
      n.warn("Not enough keywords")
    }
  })

  if (!await n.exists("license*")) {
    n.warn("Missing license")
  }

  await n.delete("*.log")
  await n.copy(__dirname, "..", ".editorconfig").to(".editorconfig")
  // await n.run("yarn upgrade")
  // await n.run("git fetch --prune")
})
