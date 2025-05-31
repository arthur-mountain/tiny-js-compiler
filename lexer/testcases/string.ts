const stringTestCases = [
  {
    description: "宣告字串變數，使用單引號",
    source: "let str = 'compilerrrr';",
    expect: [
      { type: "keyword", value: "let" },
      { type: "identifier", value: "str" },
      { type: "operator", value: "=" },
      { type: "string", value: "compilerrrr" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "宣告字串變數，使用雙引號",
    source: 'let str="compilerrrr";',
    expect: [
      { type: "keyword", value: "let" },
      { type: "identifier", value: "str" },
      { type: "operator", value: "=" },
      { type: "string", value: "compilerrrr" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "字串包含跳脫單引號",
    source: 'let str="compilerrrr\'";',
    expect: [
      { type: "keyword", value: "let" },
      { type: "identifier", value: "str" },
      { type: "operator", value: "=" },
      { type: "string", value: "compilerrrr'" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "字串包含跳脫雙引號",
    source: 'let str="compilerrrr\\"";',
    expect: [
      { type: "keyword", value: "let" },
      { type: "identifier", value: "str" },
      { type: "operator", value: "=" },
      { type: "string", value: 'compilerrrr"' },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "字串包含表情符號",
    source: 'let str="compilerrrr 😍";',
    expect: [
      { type: "keyword", value: "let" },
      { type: "identifier", value: "str" },
      { type: "operator", value: "=" },
      { type: "string", value: "compilerrrr 😍" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "字串未正確結束，應拋出錯誤",
    source: 'let str="compilerrrr\\";',
    expect: new TypeError("Unterminated string literal"),
  },
];

export { stringTestCases };
