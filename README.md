<h1 align="center">
  <img alt="Logo" src="https://image.flaticon.com/icons/svg/1070/1070261.svg" height="48">
  Nehemiah
</h1>

<p align="center">
  A library for managing repositories
</p>

<table>
  <tr>
    <td align="justify">
      <i>
        Nehemiah was a high official in the Persian court of King Artaxerxes I of Persia and led the third return of the Jewish people after seventy years of exile. He organized the reconstruction of the wall of Jerusalem in record time while defending against opposition on all sides. His talent, his huge organizational accomplishments and his faith in God inspired the name for this package.
        <a href="https://en.wikipedia.org/wiki/Nehemiah">Read the whole story.</a>
      </i>
    </td>
  </tr>
</table>

<p align="center">
  <a href="https://www.npmjs.com/package/nehemiah">
    <img alt="Version" src="https://flat.badgen.net/npm/v/nehemiah?icon=npm">
  </a>
  <a href="https://raw.githubusercontent.com/n4bb12/nehemiah/master/LICENSE">
    <img alt="License" src="https://flat.badgen.net/github/license/n4bb12/nehemiah?icon=github">
  </a>
  <a href="https://github.com/n4bb12/nehemiah/issues/new/choose">
    <img alt="Issues" src="https://flat.badgen.net/badge/github/create issue/pink?icon=github">
  </a>
  <a href="https://circleci.com/gh/n4bb12/workflows/nehemiah">
    <img alt="CircleCI" src="https://flat.badgen.net/circleci/github/n4bb12/nehemiah?icon=circleci">
  </a>
  <a href="https://david-dm.org/n4bb12/nehemiah">
    <img alt="Dependencies" src="https://flat.badgen.net/david/dep/n4bb12/nehemiah?icon=npm">
  </a>
  <a href="https://codecov.io/github/n4bb12/nehemiah">
    <img alt="Coverage" src="https://flat.badgen.net/codecov/c/github/n4bb12/nehemiah?icon=codecov">
  </a>
  <a href="https://lgtm.com/projects/g/n4bb12/nehemiah/alerts">
    <img alt="LGTM" src="https://flat.badgen.net/lgtm/alerts/g/n4bb12/nehemiah?icon=lgtm">
  </a>
</p>

## About

Basically monorepos without the monorepo.
Nehemiah synchronizes directories and executes tasks within them, based on code you write using a simple API.

Features include:

- Scan repo for files
- Test if file exists --> find out what type of project it is, or if a certain dependency/config file is used
- Copy file --> add file to repo if it doesn't exist, overwrite file, e.g. `tslint.json`
- Delete file --> remove unwanted files for cleanup, e.g. logfiles
- Merge file fragments --> insert partials into `README.md`
- Edit json file --> update `package.json` with standardized values
- Edit line-based file --> update `.gitignore`
- Run shell commands in directory --> `yarn install`, `git fetch`, `yarn upgrade`, `sort-package-json`
- Get warned if something deviates from expectations --> no tests in `package.json`, missing license


## Install

```
yarn add nehemiah
```

## Example

```ts
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
```

#

<div>Logo made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/free-icon/divide_1070261" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
