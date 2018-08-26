export default {
  cache: true,
  compileEnhancements: false,
  concurrency: 5,
  extensions: ["ts"],
  failFast: false,
  failWithoutAssertions: false,
  files: ["test/**/*.test.ts"],
  require: ["ts-node/register"],
  sources: ["**/*.ts"],
  verbose: true,
}
