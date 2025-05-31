const commentTestCases = [
  {
    description: "單行註解",
    source: "// this is a comment",
    expect: [{ type: "comment", value: " this is a comment" }],
  },
  {
    description: "單行註解包含符號",
    source: "// a + b = c",
    expect: [{ type: "comment", value: " a + b = c" }],
  },
  {
    description: "多行註解",
    source: "/* this is a block comment */",
    expect: [{ type: "comment", value: "/* this is a block comment */" }],
  },
  {
    description: "多行註解包含換行",
    source: "/* line 1\nline 2\nline 3 */",
    expect: [{ type: "comment", value: "/* line 1\nline 2\nline 3 */" }],
  },
  {
    description: "註解與程式碼共存",
    source: "let x = 5; // variable x",
    expect: [
      { type: "keyword", value: "let" },
      { type: "identifier", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
      { type: "comment", value: " variable x" },
    ],
  },
  {
    description: "多行註解與程式碼共存",
    source: "let x = 5; /* block comment */",
    expect: [
      { type: "keyword", value: "let" },
      { type: "identifier", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
      { type: "comment", value: "/* block comment */" },
    ],
  },
  {
    description: "多行註解中含 * 號",
    source: "/* multiply * value */",
    expect: [{ type: "comment", value: "/* multiply * value */" }],
  },
  {
    description: "多行註解中含特殊符號",
    source: "/* $%^&*()_+ */",
    expect: [{ type: "comment", value: "/* $%^&*()_+ */" }],
  },
  {
    description: "多行註解未結束 (應報錯)",
    source: "/* unterminated comment",
    expect: new TypeError("Unterminated block comment"),
  },
];

export { commentTestCases };
