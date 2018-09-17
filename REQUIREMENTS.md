## Requirements

Things I would like to be able to do with a simple API:

- ✅ scan repo for files
- ✅ test if file exists --> find out what type of project it is, or if a certain dependency/config file is used
- ✅ copy file --> add file to repo if it doesn't exist, overwrite file, e.g. `tslint.json`
- ✅ delete file --> remove unwanted files for cleanup, e.g. logfiles
- ✅ merge file fragments --> insert partials into `README.md`
- ✅ edit json file --> update `package.json` with standardized values
- ✅ edit line-based file --> update `.gitignore`
- ✅ run shell commands in directory --> `yarn install`, `git fetch`, `yarn upgrade`, `sort-package-json`
- ✅ get warned if something deviates from expectations --> no tests in `package.json`, missing license
