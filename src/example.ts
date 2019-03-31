import Nehemiah from "nehemiah"

const projects = ["a", "b", "c"]

interface Package {
  author: string
  keywords: string[]
}

async function updateProject(dir: string) {
  const n = new Nehemiah(dir)

  const updatePackage = () => n.modify("package.json")
    .asJson<Package>(p => {
      p.author = "Esra"

      if (!Array.isArray(p.keywords) || p.keywords.length < 3) {
        n.warn("Not enough keywords")
      }
    })

  const shouldHaveLicense = async () => {
    if (!await n.exists("license*")) {
      n.warn("Missing license")
    }
  }

  const deleteLogs = async () => n.delete("*.log")

  const updateEditorConfig = async () =>
    n.copy(__dirname, "templates/.editorconfig").to(".editorconfig")

  const updateMinorPatch = async () =>
    n.run("yarn upgrade --mutext file")

  const gitFetchPrune = () => n.run("git fetch --prune")

  await Promise.all([
    updatePackage,
    shouldHaveLicense,
    deleteLogs,
    updateEditorConfig,
    updateMinorPatch,
    gitFetchPrune,
  ])
}

(async () => {
  for (const dir of projects) {
    await updateProject(dir)
  }
})()
