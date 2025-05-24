const stringTestCases = [
  {
    source: "let str = 'compilerrrr';",
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "str" },
      { type: "operator", value: "=" },
      { type: "string", value: "compilerrrr" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    source: 'let str="compilerrrr";',
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "str" },
      { type: "operator", value: "=" },
      { type: "string", value: "compilerrrr" },
      { type: "punctuation", value: ";" },
    ],
  },
  // 跳脫字元
  {
    source: 'let str="compilerrrr\'";',
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "str" },
      { type: "operator", value: "=" },
      { type: "string", value: "compilerrrr'" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    source: 'let str="compilerrrr\\"";',
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "str" },
      { type: "operator", value: "=" },
      { type: "string", value: 'compilerrrr"' },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    source: 'let str="compilerrrr\\";',
    expect: new TypeError("Unterminated string literal"),
  },
];

export { stringTestCases };
