const variableDeclarationTestCases = [
  {
    description: "變數名稱: 英文字母",
    source: "let x = 5;",
    expect: [
      {
        type: "VariableDeclaration",
        id: { type: "Identifier", name: "x" },
        init: { type: "NumberLiteral", value: "5" },
      },
    ],
  },
  {
    description: "變數名稱: 下底線開頭",
    source: "let _x = 5;",
    expect: [
      {
        type: "VariableDeclaration",
        id: { type: "Identifier", name: "_x" },
        init: { type: "NumberLiteral", value: "5" },
      },
    ],
  },
  {
    description: "變數名稱: 錢字號開頭",
    source: "let $x = 5;",
    expect: [
      {
        type: "VariableDeclaration",
        id: { type: "Identifier", name: "$x" },
        init: { type: "NumberLiteral", value: "5" },
      },
    ],
  },
  {
    description: "變數名稱: 下底線結尾",
    source: "let x_ = 5;",
    expect: [
      {
        type: "VariableDeclaration",
        id: { type: "Identifier", name: "x_" },
        init: { type: "NumberLiteral", value: "5" },
      },
    ],
  },
  {
    description: "變數名稱: 錢字號結尾",
    source: "let x$ = 5;",
    expect: [
      {
        type: "VariableDeclaration",
        id: { type: "Identifier", name: "x$" },
        init: { type: "NumberLiteral", value: "5" },
      },
    ],
  },
];

export { variableDeclarationTestCases };
