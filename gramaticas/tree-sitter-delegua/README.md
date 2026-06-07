# tree-sitter-delegua (bootstrap)

Este diretorio contem um bootstrap inicial de gramatica tree-sitter para
Delegua.

Objetivo:

- Servir como base tecnica para evolucao incremental.
- Facilitar a migracao da extensao do Zed de fallback para gramatica dedicada.

Escopo atual:

- Regras sintaticas basicas para declaracoes, expressoes e controle de fluxo.
- Comentarios, strings, numeros e identificadores.
- Queries iniciais para highlight, brackets e indents.

Fonte de verdade:

- A sintaxe oficial continua sendo a gramatica ANTLR em:
  - C:/Delegua/delegua/gramaticas
  - https://github.com/DesignLiquido/delegua/tree/principal/gramaticas

Uso local:

1. npm install
2. npm run generate
3. npm test

Este bootstrap nao cobre ainda toda a linguagem Delégua e dialetos.
