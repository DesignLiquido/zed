# Migracao para gramatica tree-sitter de Delegua

Este documento descreve como substituir o fallback atual por uma gramatica
nativa de Delegua quando o parser estiver publicado.

## 0. Bootstrap local atual

Este repositorio ja contem um bootstrap inicial em:

- C:/Delegua/zed/gramaticas/tree-sitter-delegua

No bootstrap, os comandos basicos sao:

- npm install
- npm run generate
- npm test

Status atual do bootstrap neste repositorio:

- parser gerado com sucesso (`tree-sitter generate`)
- arquivo `tree-sitter.json` presente
- queries iniciais adicionadas em `queries/`
- corpus inicial em `test/corpus/basic.txt` com `tree-sitter test` passando

Observacao:

- a cobertura sintatica ainda e parcial e deve evoluir com base nos `.g4`
  oficiais de Delegua.

## 1. Registrar gramatica no manifesto

No arquivo extension.toml, adicionar uma entrada de gramatica:

[grammars.delegua]
repository = "https://github.com/<org>/<repo-da-gramatica>"
rev = "<sha-do-commit>"

Estado atual neste repositorio:

- ja existe `[grammars.delegua]` em `extension.toml` com `file://` local para desenvolvimento.

## 2. Apontar linguagem para a nova gramatica

No arquivo languages/delegua/config.toml:

- Antes:
  grammar = "javascript"

- Depois:
  grammar = "delegua"

Estado atual neste repositorio:

- `languages/delegua/config.toml` ja esta com `grammar = "delegua"`
- `languages/delegua-testes/config.toml` ja esta com `grammar = "delegua"`

Se dialetos compartilharem exatamente a mesma sintaxe base, eles podem usar
"delegua" tambem. Caso contrario, manter fallback temporario por dialeto.

## 3. Adicionar queries por linguagem

Criar, ao menos, os arquivos abaixo em languages/delegua/:

- highlights.scm
- brackets.scm
- indents.scm

Arquivos opcionais:

- outline.scm
- injections.scm
- textobjects.scm
- overrides.scm
- runnables.scm

## 4. Validar localmente

- Executar cargo check na raiz do projeto.
- Instalar como dev extension no Zed.
- Abrir arquivo .delegua e validar:
  - diagnosticos e completude do LSP;
  - highlight sintatico;
  - comentarios e indentacao.

## 5. Boas praticas

- Fixar rev por commit SHA imutavel.
- Evitar usar branch no campo rev.
- Atualizar README.md com o status da migracao quando concluir.
