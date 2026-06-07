(identifier) @variable
(type_identifier) @type
(number) @number
(string) @string
(boolean) @boolean
(null) @constant.builtin

(function_declaration (identifier) @function)
(method_declaration (identifier) @function.method)
(class_declaration (identifier) @type)
(interface_declaration (identifier) @type)
(extension_declaration (identifier) @type)

(import_statement) @keyword
(if_statement) @keyword
(while_statement) @keyword
(for_statement) @keyword
(for_each_statement) @keyword
(switch_statement) @keyword
(switch_case) @keyword
(switch_default) @keyword
(try_statement) @keyword
(having_as_statement) @keyword
(interface_declaration) @keyword
(extension_declaration) @keyword
(property_statement) @keyword
(continue_statement) @keyword
(break_statement) @keyword
(throw_statement) @keyword
(assert_statement) @keyword
(help_statement) @keyword
(return_statement) @keyword
(variable_declaration) @keyword

(array_literal) @punctuation.bracket
(index_expression) @punctuation.bracket

(line_comment) @comment
(block_comment) @comment
