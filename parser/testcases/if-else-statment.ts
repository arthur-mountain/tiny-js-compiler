const ifElseTestCases = [
  {
    description: "If statement",
    source: "if (x > 5) { return 'big'; }",
    expect: [
      {
        type: "IfStatement",
        test: {
          type: "BinaryExpression",
          operator: ">",
          left: { type: "Identifier", name: "x" },
          right: { type: "NumberLiteral", value: "5" },
        },
        consequent: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: { type: "StringLiteral", value: "big" },
            },
          ],
        },
        alternate: undefined,
      },
    ],
  },
  {
    description: "If/Else statement",
    source: "if (x > 5) { return 'big'; } else { return 'small'; }",
    expect: [
      {
        type: "IfStatement",
        test: {
          type: "BinaryExpression",
          operator: ">",
          left: { type: "Identifier", name: "x" },
          right: { type: "NumberLiteral", value: "5" },
        },
        consequent: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: { type: "StringLiteral", value: "big" },
            },
          ],
        },
        alternate: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: { type: "StringLiteral", value: "small" },
            },
          ],
        },
      },
    ],
  },
  {
    description: "If/ElseIf statement",
    source:
      "if (x > 10) { return 'big'; } else if (x > 5) { return 'medium'; }",
    expect: [
      {
        type: "IfStatement",
        test: {
          type: "BinaryExpression",
          operator: ">",
          left: { type: "Identifier", name: "x" },
          right: { type: "NumberLiteral", value: "10" },
        },
        consequent: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: { type: "StringLiteral", value: "big" },
            },
          ],
        },
        alternate: {
          type: "IfStatement",
          test: {
            type: "BinaryExpression",
            operator: ">",
            left: { type: "Identifier", name: "x" },
            right: { type: "NumberLiteral", value: "5" },
          },
          consequent: {
            type: "BlockStatement",
            body: [
              {
                type: "ReturnStatement",
                argument: { type: "StringLiteral", value: "medium" },
              },
            ],
          },
          alternate: undefined,
        },
      },
    ],
  },
  {
    description: "If/ElseIf/Else statement",
    source:
      "if (x > 10) { return 'big'; } else if (x > 5) { return 'medium'; } else { return 'small'; }",
    expect: [
      {
        type: "IfStatement",
        test: {
          type: "BinaryExpression",
          operator: ">",
          left: { type: "Identifier", name: "x" },
          right: { type: "NumberLiteral", value: "10" },
        },
        consequent: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: { type: "StringLiteral", value: "big" },
            },
          ],
        },
        alternate: {
          type: "IfStatement",
          test: {
            type: "BinaryExpression",
            operator: ">",
            left: { type: "Identifier", name: "x" },
            right: { type: "NumberLiteral", value: "5" },
          },
          consequent: {
            type: "BlockStatement",
            body: [
              {
                type: "ReturnStatement",
                argument: { type: "StringLiteral", value: "medium" },
              },
            ],
          },
          alternate: {
            type: "BlockStatement",
            body: [
              {
                type: "ReturnStatement",
                argument: { type: "StringLiteral", value: "small" },
              },
            ],
          },
        },
      },
    ],
  },
];

export { ifElseTestCases };
