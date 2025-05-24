import assert from "node:assert";
import testcases from "./testcases/index.js";
import lexer from "./index.js";

for (const { source, expect } of testcases) {
  try {
    assert.deepStrictEqual(lexer(source), expect);
    console.log(`✅ Passed: "${source}"`);
  } catch (err) {
    console.error(`❌ Failed: "${source}"`);
    console.error(err);
  }
}
