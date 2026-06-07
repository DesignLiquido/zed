module.exports = grammar({
  name: 'delegua',

  extras: ($) => [
    /\s/,
    $.line_comment,
    $.block_comment,
  ],

  word: ($) => $.identifier,

  rules: {
    source_file: ($) => repeat($._statement),

    _statement: ($) => choice(
      $.import_statement,
      $.variable_declaration,
      $.class_declaration,
      $.function_declaration,
      $.if_statement,
      $.switch_statement,
      $.try_statement,
      $.while_statement,
      $.for_statement,
      $.return_statement,
      $.expression_statement,
      $.block,
    ),

    block: ($) => seq('{', repeat($._statement), '}'),

    import_statement: ($) => seq(
      'importar',
      choice(
        $.string,
        seq('{', $.identifier, repeat(seq(',', $.identifier)), optional(','), '}', 'de', $.string),
        seq($.identifier, 'de', $.string),
      ),
      ';',
    ),

    class_declaration: ($) => seq(
      'classe',
      $.identifier,
      optional(seq('herda', $.identifier)),
      '{',
      repeat(choice($.method_declaration, $.variable_declaration)),
      '}',
    ),

    method_declaration: ($) => seq(
      $.identifier,
      '(',
      optional(seq($.parameter, repeat(seq(',', $.parameter)))),
      ')',
      $.block,
    ),

    variable_declaration: ($) => seq(
      choice('var', 'constante', 'const'),
      $.identifier,
      optional(seq(':', $.type_identifier)),
      optional(seq('=', $._expression)),
      ';',
    ),

    function_declaration: ($) => seq(
      choice('funcao', 'função'),
      $.identifier,
      '(',
      optional(seq($.parameter, repeat(seq(',', $.parameter)))),
      ')',
      $.block,
    ),

    parameter: ($) => seq(
      $.identifier,
      optional(seq(':', $.type_identifier)),
    ),

    if_statement: ($) => prec.right(seq(
      'se',
      '(',
      $._expression,
      ')',
      $._statement,
      optional(seq('senao', $._statement)),
    )),

    switch_statement: ($) => seq(
      'escolha',
      '(',
      $._expression,
      ')',
      '{',
      repeat($.switch_case),
      optional($.switch_default),
      '}',
    ),

    switch_case: ($) => seq(
      'caso',
      $._expression,
      ':',
      repeat($._statement),
    ),

    switch_default: ($) => seq(
      choice('padrao', 'padrão'),
      ':',
      repeat($._statement),
    ),

    try_statement: ($) => seq(
      'tente',
      $.block,
      optional(seq('pegue', optional(seq('(', $.identifier, ')')), $.block)),
      optional(seq('finalmente', $.block)),
    ),

    while_statement: ($) => seq(
      'enquanto',
      '(',
      $._expression,
      ')',
      $._statement,
    ),

    for_statement: ($) => seq(
      'para',
      '(',
      optional($._expression),
      ';',
      optional($._expression),
      ';',
      optional($._expression),
      ')',
      $._statement,
    ),

    return_statement: ($) => seq(
      'retorna',
      optional($._expression),
      ';',
    ),

    expression_statement: ($) => seq($._expression, ';'),

    _expression: ($) => choice(
      $.assignment_expression,
      $.unary_expression,
      $.binary_expression,
      $.call_expression,
      $.member_expression,
      $.identifier,
      $.number,
      $.string,
      $.boolean,
      $.null,
      $.parenthesized_expression,
    ),

    parenthesized_expression: ($) => seq('(', $._expression, ')'),

    assignment_expression: ($) => prec.right(1, seq(
      choice($.identifier, $.member_expression),
      choice('=', '+=', '-=', '*=', '/='),
      $._expression,
    )),

    unary_expression: ($) => prec.right(13, seq(
      choice('!', 'nao', 'não', '-'),
      $._expression,
    )),

    binary_expression: ($) => choice(
      ...[
        ['*', 10],
        ['/', 10],
        ['%', 10],
        ['+', 9],
        ['-', 9],
        ['<', 8],
        ['<=', 8],
        ['>', 8],
        ['>=', 8],
        ['==', 7],
        ['!=', 7],
        ['e', 6],
        ['ou', 5],
      ].map(([operator, precedence]) =>
        prec.left(precedence, seq($._expression, operator, $._expression)),
      ),
    ),

    call_expression: ($) => prec.left(12, seq(
      field('function', choice($.identifier, $.member_expression)),
      '(',
      optional(seq($._expression, repeat(seq(',', $._expression)))),
      ')',
    )),

    member_expression: ($) => prec.left(11, seq(
      field('object', choice($.identifier, $.call_expression, $.parenthesized_expression)),
      '.',
      field('property', $.identifier),
    )),

    type_identifier: ($) => $.identifier,

    identifier: () => /[A-Za-z_\u00C0-\u024F][A-Za-z0-9_\u00C0-\u024F]*/,

    number: () => token(choice(
      /\d+\.\d+/,
      /\d+/
    )),

    string: () => choice(
      seq('"', repeat(choice(/[^"\\\n]/, /\\./)), '"'),
      seq("'", repeat(choice(/[^'\\\n]/, /\\./)), "'")
    ),

    boolean: () => choice('verdadeiro', 'falso'),
    null: () => 'nulo',

    line_comment: () => token(seq('//', /.*/)),
    block_comment: () => token(seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/')),
  },
});
