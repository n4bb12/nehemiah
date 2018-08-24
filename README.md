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
  <a href="https://circleci.com/gh/n4bb12/nehemiah">
    <img alt="CircleCI" src="https://img.shields.io/circleci/project/github/n4bb12/nehemiah/master.svg?style=flat-square&label=CircleCI&logo=circleci">
  </a>
  <a href="https://raw.githubusercontent.com/n4bb12/nehemiah/master/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/License-ISC-lightgrey.svg?style=flat-square">
  </a>
  <a href="#">
    <img alt="Status" src="https://img.shields.io/badge/Status-Working Draft-red.svg?style=flat-square">
  </a>
</p>

## Install

```
yarn add nehemiah
```

## Usage

```ts
import Nehemiah from "nehemiah"

const n = new Nehemiah(process.cwd())

n.modify("package.json", p => {
  p.author = "Abraham Schilling"

  if (!Array.isArray(p.keywords) || p.keywords.length < 3) {
    n.warn("not enough keywords")
  }
})

if (!n.exists("license*")) {
  n.warn("missing license")
}

n.delete("*.log")

n.copy(__dirname, "templates", ".editorconfig").to(".editorconfig")

n.run("yarn upgrade")
n.run("git fetch --prune")
```

## Attribution

<div>Logo made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/free-icon/divide_1070261" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
