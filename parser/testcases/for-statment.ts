const forStatmentTestCases = [
  {
    description: "for 迴圈省略條件與更新",
    source: "for (let i = 0;;) {}",
    expect: [
      {
        type: "ForStatement",
        init: {
          type: "VariableDeclaration",
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              id: { type: "Identifier", name: "i" },
              init: { type: "NumberLiteral", value: "0" },
            },
          ],
        },
        test: null,
        update: null,
        body: {
          type: "BlockStatement",
          body: [],
        },
      },
    ],
  },
  {
    description: "for 迴圈省略初始化與更新",
    source: "for (; i < 10;) {}",
    expect: [
      {
        type: "ForStatement",
        init: null,
        test: {
          type: "BinaryExpression",
          operator: "<",
          left: { type: "Identifier", name: "i" },
          right: { type: "NumberLiteral", value: "10" },
        },
        update: null,
        body: {
          type: "BlockStatement",
          body: [],
        },
      },
    ],
  },
  {
    description: "for 迴圈包含多行區塊",
    source: "for (;;) { let a = 1; return a; }",
    expect: [
      {
        type: "ForStatement",
        init: null,
        test: null,
        update: null,
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "VariableDeclaration",
              kind: "let",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: { type: "Identifier", name: "a" },
                  init: { type: "NumberLiteral", value: "1" },
                },
              ],
            },
            {
              type: "ReturnStatement",
              argument: { type: "Identifier", name: "a" },
            },
          ],
        },
      },
    ],
  },
  {
    description: "基本 for 迴圈：let 初始化 + 條件 + 更新",
    source: "for (let i = 0; i < 10; i++) {}",
    expect: [
      {
        type: "ForStatement",
        init: {
          type: "VariableDeclaration",
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              id: { type: "Identifier", name: "i" },
              init: { type: "NumberLiteral", value: "0" },
            },
          ],
        },
        test: {
          type: "BinaryExpression",
          operator: "<",
          left: { type: "Identifier", name: "i" },
          right: { type: "NumberLiteral", value: "10" },
        },
        update: {
          type: "UpdateExpression",
          operator: "++",
          argument: { type: "Identifier", name: "i" },
          prefix: false,
        },
        body: {
          type: "BlockStatement",
          body: [],
        },
      },
    ],
  },
  {
    description: "for 迴圈：let 宣告 + 遞減",
    source: "for (let i = 5; i > 0; i--) {}",
    expect: [
      {
        type: "ForStatement",
        init: {
          type: "VariableDeclaration",
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              id: { type: "Identifier", name: "i" },
              init: { type: "NumberLiteral", value: "5" },
            },
          ],
        },
        test: {
          type: "BinaryExpression",
          operator: ">",
          left: { type: "Identifier", name: "i" },
          right: { type: "NumberLiteral", value: "0" },
        },
        update: {
          type: "UpdateExpression",
          operator: "--",
          argument: { type: "Identifier", name: "i" },
          prefix: false,
        },
        body: {
          type: "BlockStatement",
          body: [],
        },
      },
    ],
  },
  {
    description: "基本 for 迴圈：let 初始化 + 條件 + 更新(prefix:true)",
    source: "for (let i = 0; i < 10; ++i) {}",
    expect: [
      {
        type: "ForStatement",
        init: {
          type: "VariableDeclaration",
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              id: { type: "Identifier", name: "i" },
              init: { type: "NumberLiteral", value: "0" },
            },
          ],
        },
        test: {
          type: "BinaryExpression",
          operator: "<",
          left: { type: "Identifier", name: "i" },
          right: { type: "NumberLiteral", value: "10" },
        },
        update: {
          type: "UpdateExpression",
          operator: "++",
          argument: { type: "Identifier", name: "i" },
          prefix: true,
        },
        body: {
          type: "BlockStatement",
          body: [],
        },
      },
    ],
  },
  {
    description: "for 迴圈：let 宣告 + 遞減(prefix:true)",
    source: "for (let i = 5; i > 0; --i) {}",
    expect: [
      {
        type: "ForStatement",
        init: {
          type: "VariableDeclaration",
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              id: { type: "Identifier", name: "i" },
              init: { type: "NumberLiteral", value: "5" },
            },
          ],
        },
        test: {
          type: "BinaryExpression",
          operator: ">",
          left: { type: "Identifier", name: "i" },
          right: { type: "NumberLiteral", value: "0" },
        },
        update: {
          type: "UpdateExpression",
          operator: "--",
          argument: { type: "Identifier", name: "i" },
          prefix: true,
        },
        body: {
          type: "BlockStatement",
          body: [],
        },
      },
    ],
  },
];

export { forStatmentTestCases };
