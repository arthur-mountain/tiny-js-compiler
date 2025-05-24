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
];

export { stringTestCases };
