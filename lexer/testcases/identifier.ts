const identifierTestCases = [
  {
    description: "變數名稱: 英文字母",
    source: "let x = 5;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "identifier", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "變數名稱: 下底線開頭",
    source: "let _x = 5;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "identifier", value: "_x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "變數名稱: 錢字號開頭",
    source: "let $x = 5;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "identifier", value: "$x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "變數名稱: 下底線結尾",
    source: "let x_ = 5;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "identifier", value: "x_" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "變數名稱: 錢字號結尾",
    source: "let x$ = 5;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "identifier", value: "x$" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
];

export { identifierTestCases };
