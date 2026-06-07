# Origem das gramaticas de Delegua

As gramaticas oficiais de Delegua atualmente disponiveis estao no repositorio
principal em formato ANTLR:

- https://github.com/DesignLiquido/delegua/tree/principal/gramaticas
- referencia local: C:/Delegua/delegua/gramaticas

Arquivos principais observados:

- DeleguaLexer.g4
- DeleguaParser.g4

## O que isso implica para o Zed

Extensoes de linguagem do Zed usam tree-sitter para registro de gramatica e
queries de editor. Assim, os arquivos .g4 nao podem ser consumidos diretamente
como gramatica de extensao.

## Estrategia recomendada

1. Tratar os .g4 como fonte de verdade sintatica.
2. Implementar parser tree-sitter de Delegua em repositorio proprio.
3. Registrar esse parser em extension.toml (bloco [grammars.<nome>]).
4. Migrar languages/delegua/config.toml para grammar = "delegua".
5. Criar queries basicas (highlights.scm, brackets.scm, indents.scm).

## Estado atual desta extensao

- LSP funcional com @designliquido/delegua-lsp.
- Registro de dialetos com fallback de grammar para linguagens existentes.
- Roadmap de migracao documentado em docs/tree-sitter-migracao.md.
