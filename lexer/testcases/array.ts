const arrayTestCases = [
  {
    description: "初始化空陣列陣列",
    source: "let x = [];",
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "bracket", value: "[" },
      { type: "bracket", value: "]" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "初始化單一元素陣列",
    source: "let x = [1];",
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "bracket", value: "[" },
      { type: "number", value: "1" },
      { type: "bracket", value: "]" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "初始化多元素陣列",
    source: "let x = [1,2,3];",
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "bracket", value: "[" },
      { type: "number", value: "1" },
      { type: "punctuation", value: "," },
      { type: "number", value: "2" },
      { type: "punctuation", value: "," },
      { type: "number", value: "3" },
      { type: "bracket", value: "]" },
      { type: "punctuation", value: ";" },
    ],
  },
];

export { arrayTestCases };
