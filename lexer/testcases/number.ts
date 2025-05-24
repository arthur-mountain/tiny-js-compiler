const numberTestCases = [
  {
    description: "初始化為數字",
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
    description: "初始化為個位數字相加",
    source: "let x = 5 + 5;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "operator", value: "+" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "初始化為十位數字相加",
    source: "let x = 50 + 10;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "50" },
      { type: "operator", value: "+" },
      { type: "number", value: "10" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "初始化為三個十位數字相加",
    source: "let x = 50 + 10 + 10;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "50" },
      { type: "operator", value: "+" },
      { type: "number", value: "10" },
      { type: "operator", value: "+" },
      { type: "number", value: "10" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "初始化為百位數字相加",
    source: "let x = 500 + 100;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "500" },
      { type: "operator", value: "+" },
      { type: "number", value: "100" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description:
      "即使格式不合法，但符合 token 定義，會進一步到 parser 階段檢查語法",
    source: "letx=500;",
    expect: [
      { type: "name", value: "letx" },
      { type: "operator", value: "=" },
      { type: "number", value: "500" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "小數點",
    source: `
      let x = 50.0;
      let y = 3.14;
    `,
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "50.0" },
      { type: "punctuation", value: ";" },
      { type: "keyword", value: "let" },
      { type: "name", value: "y" },
      { type: "operator", value: "=" },
      { type: "number", value: "3.14" },
      { type: "punctuation", value: ";" },
    ],
  },
];

export { numberTestCases };
