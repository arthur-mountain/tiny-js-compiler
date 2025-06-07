const variableDeclarationTestCases = [
  {
    description: "變數名稱: 英文字母",
    source: "let x = 5;",
    expect: [
      {
        type: "VariableDeclaration",
        kind: "let",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "x" },
            init: { type: "NumberLiteral", value: "5" },
          },
        ],
      },
    ],
  },
  {
    description: "變數名稱: 下底線開頭",
    source: "let _x = 5;",
    expect: [
      {
        type: "VariableDeclaration",
        kind: "let",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "_x" },
            init: { type: "NumberLiteral", value: "5" },
          },
        ],
      },
    ],
  },
  {
    description: "變數名稱: 錢字號開頭",
    source: "let $x = 5;",
    expect: [
      {
        type: "VariableDeclaration",
        kind: "let",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "$x" },
            init: { type: "NumberLiteral", value: "5" },
          },
        ],
      },
    ],
  },
  {
    description: "變數名稱: 下底線結尾",
    source: "let x_ = 5;",
    expect: [
      {
        type: "VariableDeclaration",
        kind: "let",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "x_" },
            init: { type: "NumberLiteral", value: "5" },
          },
        ],
      },
    ],
  },
  {
    description: "變數名稱: 錢字號結尾",
    source: "let x$ = 5;",
    expect: [
      {
        type: "VariableDeclaration",
        kind: "let",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "x$" },
            init: { type: "NumberLiteral", value: "5" },
          },
        ],
      },
    ],
  },
  {
    description: "var 變數名稱",
    source: "var x = 5;",
    expect: [
      {
        type: "VariableDeclaration",
        kind: "var",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "x" },
            init: { type: "NumberLiteral", value: "5" },
          },
        ],
      },
    ],
  },
  {
    description: "const 變數名稱",
    source: "const x = 5;",
    expect: [
      {
        type: "VariableDeclaration",
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "x" },
            init: { type: "NumberLiteral", value: "5" },
          },
        ],
      },
    ],
  },
  {
    description: "初始化多個 expressions",
    source: "const x = 5, y = 10, z = 15;",
    expect: [
      {
        type: "VariableDeclaration",
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "x" },
            init: { type: "NumberLiteral", value: "5" },
          },
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "y" },
            init: { type: "NumberLiteral", value: "10" },
          },
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "z" },
            init: { type: "NumberLiteral", value: "15" },
          },
        ],
      },
    ],
  },
  {
    description: "Binary expression",
    source: "const x = 5 + 15;",
    expect: [
      {
        type: "VariableDeclaration",
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "x" },
            init: {
              type: "BinaryExpression",
              operator: "+",
              left: { type: "NumberLiteral", value: "5" },
              right: { type: "NumberLiteral", value: "15" },
            },
          },
        ],
      },
    ],
  },
  {
    description: "Priority of binary expression",
    source: "const x = 5 + 3 * 2;",
    expect: [
      {
        type: "VariableDeclaration",
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "x" },
            init: {
              type: "BinaryExpression",
              operator: "+",
              left: { type: "NumberLiteral", value: "5" },
              right: {
                type: "BinaryExpression",
                operator: "*",
                left: { type: "NumberLiteral", value: "3" },
                right: { type: "NumberLiteral", value: "2" },
              },
            },
          },
        ],
      },
    ],
  },
];

export { variableDeclarationTestCases };
