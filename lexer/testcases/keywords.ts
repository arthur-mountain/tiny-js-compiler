const keywordsTestCases = [
  {
    description: "var",
    source: "var x = 5;",
    expect: [
      { type: "keyword", value: "var" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "let",
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
    description: "const",
    source: "const x = 5;",
    expect: [
      { type: "keyword", value: "const" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
];

export { keywordsTestCases };
