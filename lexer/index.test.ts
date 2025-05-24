import assert from "node:assert";
import lexer from "./index.js";

const tests = [
  {
    source: "let x = 5;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    source: "let x=5;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
];

for (const { source, expect } of tests) {
  try {
    assert.deepStrictEqual(lexer(source), expect);
    console.log(`✅ Passed: "${source}"`);
  } catch (err) {
    console.error(`❌ Failed: "${source}"`);
    console.error(err);
  }
}
