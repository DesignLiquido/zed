(identifier) @variable
(type_identifier) @type
(number) @number
(string) @string
(boolean) @boolean
(null) @constant.builtin

(function_declaration (identifier) @function)
(method_declaration (identifier) @function.method)
(class_declaration (identifier) @type)

(import_statement) @keyword
(if_statement) @keyword
(while_statement) @keyword
(for_statement) @keyword
(switch_statement) @keyword
(switch_case) @keyword
(switch_default) @keyword
(try_statement) @keyword
(return_statement) @keyword
(variable_declaration) @keyword

(line_comment) @comment
(block_comment) @comment
