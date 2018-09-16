import Nehemiah from "../src"

const projects = ["a", "b", "c"]

interface Package {
  author: string
  keywords: string[]
}

projects.forEach(async dir => {
  const n = new Nehemiah(dir)

  await n.modify("package.json").asJson<Package>(p => {
    p.author = "Esra"

    if (!Array.isArray(p.keywords) || p.keywords.length < 3) {
      n.warn("Not enough keywords")
    }
  })

  if (!await n.exists("license*")) {
    n.warn("Missing license")
  }

  await n.delete("*.log")
  await n.copy(__dirname, "templates", ".editorconfig").to(".editorconfig")
  await n.run("yarn upgrade")
  await n.run("git fetch --prune")
})
