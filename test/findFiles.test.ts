import Nehemiah from "../src"

describe("findFiles", () => {

  let n: Nehemiah

  beforeAll(() => {
    n = new Nehemiah(__dirname)
  })

  test("should find this test file", async () => {
    const testfile = "findFiles.test.ts"
    const files = await n.findFiles(testfile)
    expect(files).toEqual(expect.arrayContaining([testfile]))
  })

})
