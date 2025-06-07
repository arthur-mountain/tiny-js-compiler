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
  /* elseif unsupported yet */
  // {
  //   description: "If/ElseIf statement",
  //   source: "",
  //   expect: [
  //     {
  //       type: "IfStatement",
  //       test,
  //       consequent,
  //       alternate,
  //     },
  //   ],
  // },
  // {
  //   description: "If/ElseIf/Else statement",
  //   source: "",
  //   expect: [
  //     {
  //       type: "IfStatement",
  //       test,
  //       consequent,
  //       alternate,
  //     },
  //   ],
  // },
];

export { ifElseTestCases };
