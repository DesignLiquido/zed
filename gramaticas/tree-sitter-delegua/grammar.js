module.exports = grammar({
  name: 'delegua',

  conflicts: ($) => [
    [$.assert_statement, $.parenthesized_expression],
    [$.block, $.object_literal],
    [$.property_statement, $.property_name],
    [$.parameter, $._expression],
  ],

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
      $.property_statement,
      $.variable_declaration,
      $.class_declaration,
      $.interface_declaration,
      $.extension_declaration,
      $.function_declaration,
      $.if_statement,
      $.switch_statement,
      $.try_statement,
      $.having_as_statement,
      $.while_statement,
      $.for_each_statement,
      $.for_statement,
      $.continue_statement,
      $.break_statement,
      $.throw_statement,
      $.assert_statement,
      $.help_statement,
      $.return_statement,
      $.expression_statement,
      $.block,
    ),

    block: ($) => seq('{', repeat($._statement), '}'),

    property_statement: ($) => seq(
      $.identifier,
      ':',
      choice(
        $.block,
        $.variable_declaration,
        $.if_statement,
        $.while_statement,
        $.for_each_statement,
        $.for_statement,
        $.switch_statement,
        $.try_statement,
        $.return_statement,
        $.throw_statement,
        $.assert_statement,
        $.help_statement,
        $.continue_statement,
        $.break_statement,
        $.expression_statement,
      ),
    ),

    import_statement: ($) => seq(
      choice('importar', 'importe'),
      choice(
        $.string,
        seq('{', $.identifier, repeat(seq(',', $.identifier)), optional(','), '}', 'de', $.string),
        seq($.identifier, 'de', $.string),
      ),
      ';',
    ),

    class_declaration: ($) => seq(
      repeat($.decorator),
      'classe',
      optional($.class_modifiers),
      $.identifier,
      optional(seq('herda', $.identifier)),
      optional(seq(choice('implementa', 'implements'), $.identifier, repeat(seq(',', $.identifier)))),
      optional(seq('mescla', $.identifier, repeat(seq(',', $.identifier)))),
      '{',
      repeat(choice($.method_declaration, $.variable_declaration)),
      '}',
    ),

    class_modifiers: () => repeat1(choice(
      'abstrato',
      'abstrata',
      'estrangeira',
      'estatico',
      'estática',
      'estático',
      'estatica',
    )),

    interface_declaration: ($) => seq(
      'interface',
      $.identifier,
      '{',
      repeat($.method_signature),
      '}',
    ),

    extension_declaration: ($) => seq(
      choice('extensao', 'extensão'),
      'de',
      $.identifier,
      '{',
      repeat($.method_declaration),
      '}',
    ),

    decorator: ($) => seq(
      '@',
      $.decorator_name,
      optional($.arguments),
    ),

    decorator_name: ($) => seq(
      $.identifier,
      repeat(seq('.', $.identifier)),
    ),

    arguments: ($) => seq(
      '(',
      optional(seq($.argument, repeat(seq(',', $.argument)), optional(','))),
      ')',
    ),

    argument: ($) => seq(
      optional('...'),
      $._expression,
    ),

    arrow_function_expression: ($) => choice(
      seq(
        optional('assincrono'),
        choice(
          $.identifier,
          seq('(', optional(seq($.parameter, repeat(seq(',', $.parameter)))), ')'),
        ),
        '=>',
        choice($.block, $._expression),
      ),
      seq(
        optional('assincrono'),
        $.identifier,
        '=>',
        choice($.block, $._expression),
      ),
    ),

    anonymous_function_expression: ($) => seq(
      optional('assincrono'),
      choice('funcao', 'função'),
      optional('*'),
      '(',
      optional(seq($.parameter, repeat(seq(',', $.parameter)))),
      ')',
      $.block,
    ),

    method_declaration: ($) => seq(
      repeat($.decorator),
      $.identifier,
      '(',
      optional(seq($.parameter, repeat(seq(',', $.parameter)))),
      ')',
      $.block,
    ),

    method_signature: ($) => seq(
      $.identifier,
      '(',
      optional(seq($.parameter, repeat(seq(',', $.parameter)))),
      ')',
      optional(seq(':', $.type_identifier)),
      ';',
    ),

    variable_declaration: ($) => seq(
      choice('var', 'constante', 'const'),
      $.identifier,
      optional(seq(':', $.type_identifier)),
      optional(seq('=', $._expression)),
      ';',
    ),

    function_declaration: ($) => seq(
      repeat($.decorator),
      optional('assincrono'),
      choice('funcao', 'função'),
      optional('*'),
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
      optional(seq(choice('senao', 'senão'), $._statement)),
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

    having_as_statement: ($) => seq(
      'tendo',
      $._expression,
      'como',
      $.identifier,
      $.block,
    ),

    while_statement: ($) => seq(
      'enquanto',
      '(',
      $._expression,
      ')',
      $._statement,
    ),

    for_each_statement: ($) => seq(
      'para',
      'cada',
      $.identifier,
      'em',
      $._expression,
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

    continue_statement: () => seq(
      choice('continue', 'continua', 'continuar'),
      ';',
    ),

    break_statement: () => seq(
      choice('sustar', 'quebrar', 'quebre'),
      ';',
    ),

    throw_statement: ($) => seq(
      'falhar',
      optional($._expression),
      ';',
    ),

    assert_statement: ($) => seq(
      choice(
        seq(
          choice('assercao', 'asserção'),
          '(',
          $._expression,
          optional(seq(',', $._expression)),
          ')',
        ),
        seq(choice('assercao', 'asserção'), $._expression),
      ),
      ';',
    ),

    help_statement: ($) => seq(
      'ajuda',
      optional(seq('(', optional($._expression), ')')),
      ';',
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
      $.update_expression,
      $.binary_expression,
      $.arrow_function_expression,
      $.anonymous_function_expression,
      $.optional_chain_expression,
      $.super_expression,
      $.this_expression,
      $.void_expression,
      $.delete_expression,
      $.call_expression,
      $.member_expression,
      $.index_expression,
      $.array_literal,
      $.object_literal,
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
      choice('=', '+=', '-=', '*=', '/=', '\\=', '%=', '&=', '^=', '|=', '**='),
      $._expression,
    )),

    unary_expression: ($) => prec.right(13, seq(
      choice('!', 'nao', 'não', '-', '~', '++', '--'),
      $._expression,
    )),

    update_expression: ($) => prec.left(13, seq(
      choice($.identifier, $.member_expression, $.index_expression),
      choice('++', '--'),
    )),

    array_literal: ($) => seq(
      '[',
      optional(seq($._expression, repeat(seq(',', $._expression)), optional(','))),
      ']',
    ),

    optional_chain_expression: ($) => prec.left(11, seq(
      choice($.identifier, $.call_expression, $.member_expression, $.index_expression, $.parenthesized_expression),
      '?.',
      choice($.identifier, $.call_expression, $.member_expression, $.index_expression),
    )),

    super_expression: () => 'super',

    this_expression: () => 'isto',

    void_expression: ($) => seq(
      'vazio',
      $._expression,
    ),

    delete_expression: ($) => seq(
      'excluir',
      $._expression,
    ),

    object_literal: ($) => seq(
      '{',
      optional(seq($.property_assignment, repeat(seq(',', $.property_assignment)), optional(','))),
      '}',
    ),

    property_assignment: ($) => seq(
      $.property_name,
      ':',
      $._expression,
    ),

    property_name: ($) => choice(
      $.identifier,
      $.string,
      $.number,
      seq('[', $._expression, ']'),
    ),

    binary_expression: ($) => choice(
      ...[
        ['**', 11],
        ['*', 10],
        ['/', 10],
        ['\\', 10],
        ['%', 10],
        ['+', 9],
        ['-', 9],
        ['>>', 8],
        ['<<', 8],
        ['<', 8],
        ['<=', 8],
        ['>', 8],
        ['>=', 8],
        ['==', 7],
        ['!=', 7],
        ['&', 6],
        ['^', 6],
        ['|', 6],
        ['e', 6],
        ['ou', 5],
      ].map(([operator, precedence]) =>
        prec.left(precedence, seq($._expression, operator, $._expression)),
      ),
    ),

    call_expression: ($) => prec.left(12, seq(
      field('function', choice($.identifier, $.member_expression, $.index_expression, $.super_expression)),
      $.arguments,
    )),

    member_expression: ($) => prec.left(11, seq(
      field('object', choice($.identifier, $.call_expression, $.parenthesized_expression, $.index_expression, $.super_expression, $.this_expression)),
      '.',
      field('property', $.identifier),
    )),

    index_expression: ($) => prec.left(11, seq(
      field('array', choice($.identifier, $.call_expression, $.member_expression, $.parenthesized_expression, $.array_literal)),
      '[',
      field('index', $._expression),
      ']',
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
