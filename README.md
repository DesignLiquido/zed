# Delégua Language for Zed

Extensão para o editor Zed com suporte a Delégua e dialetos usando o pacote
[@designliquido/delegua-lsp](https://www.npmjs.com/package/@designliquido/delegua-lsp).

## Recursos

- Language Server Protocol para Delégua e dialetos (completude, hover, definição,
	referências, renomeação e formatação, conforme o servidor).
- Associação automática de extensões de arquivo usadas no ecossistema Design Líquido.
- Instalação automática do pacote `@designliquido/delegua-lsp` via npm quando
	necessário.

## Linguagens suportadas

Linguagens registradas nesta extensão:

- BIRL (`.birl`)
- Delégua (`.delegua`)
- Delégua Testes (`.teste.delegua`)
- Delégua Propriedades (`.delprops`)
- Egua (`.egua`)
- FolEs (`.foles`)
- LinConEs (`.lincones`)
- LMHT (`.lmht`)
- MAPLER (`.mapler`)
- Pituguês (`.pitu`, `.pitugues`)
- Portugol Studio (`.por`)
- Potigol (`.poti`, `.potigol`)
- VisuAlg (`.alg`)

Linguagens conectadas ao `@designliquido/delegua-lsp` (conforme suporte
documentado do servidor):

- BIRL
- Delégua
- Delégua Testes
- MAPLER
- Pituguês
- Portugol Studio
- Potigol
- VisuAlg

## Estrutura do projeto

- `extension.toml`: manifesto da extensão do Zed.
- `Cargo.toml` e `fontes/lib.rs`: implementação Rust/WASM que inicia o servidor LSP.
- `languages/delegua/config.toml`: definição da linguagem no Zed.

## Nota sobre a pasta `languages`

No ecossistema de extensões do Zed, a pasta que define linguagens precisa se chamar exatamente `languages`. O editor usa esse nome para descobrir e carregar
arquivos `config.toml` de linguagem.

Se necessário, você pode usar uma pasta `linguagens` para organização interna
(documentação, scripts e anotações), mas a pasta consumida pelo Zed deve
continuar sendo `languages`.

## Como testar localmente no Zed

1. Garanta que Rust foi instalado com `rustup`.
2. Garanta que Node.js e npm estão disponíveis no ambiente.
3. No Zed, rode a ação `zed: install dev extension`.
4. Selecione esta pasta (`C:/Delegua/zed`).
5. Abra um arquivo com extensão suportada, por exemplo `.delegua`.

## Observação sobre gramática

Atualmente a linguagem está registrada com gramática temporária para permitir
integração imediata do LSP no Zed. O próximo passo recomendado é plugar uma
gramática tree-sitter específica de Delégua para melhorar highlighting e recursos
baseados em sintaxe.

As gramáticas oficiais atuais da linguagem Delégua, no repositório principal,
estão em formato ANTLR (`.g4`): https://github.com/DesignLiquido/delegua/tree/principal/gramaticas

Importante: o Zed não consome ANTLR diretamente em extensões de linguagem.
Para usar gramática nativa no Zed, ainda é necessário disponibilizar uma
gramática em formato tree-sitter.

Status atual da integração na extensão:

- `languages/delegua/config.toml` já usa `grammar = "delegua"`
- `languages/delegua-testes/config.toml` já usa `grammar = "delegua"`
- `extension.toml` já registra `[grammars.delegua]` apontando para o bootstrap local

Observação: o uso de `repository = "file://./gramaticas/tree-sitter-delegua"`
é voltado ao fluxo de desenvolvimento local. Para publicação/distribuição,
o recomendado é apontar para um repositório Git da gramática com revisão fixa.

## Roadmap de gramática tree-sitter

Status atual:

- Delégua e dialetos com fallback para gramáticas existentes (principalmente JavaScript).
- LSP funcional para os dialetos suportados por `@designliquido/delegua-lsp`.

Próxima etapa:

1. Publicar/definir o repositório da gramática tree-sitter de Delégua.
	A gramática ANTLR existente deve ser tratada como fonte de verdade para
	derivar essa implementação.
2. Registrar a gramática no manifesto `extension.toml`.
3. Trocar `grammar` em `languages/delegua/config.toml` (e, se necessário, nos dialetos).
4. Adicionar queries por linguagem (`highlights.scm`, `brackets.scm`, `indents.scm`).

Enquanto a gramática dedicada não estiver disponível, a extensão permanece utilizável
com recursos de LSP e associação de arquivos já configurados.

Bootstrap local já incluído neste repositório em:

- C:/Delegua/zed/gramaticas/tree-sitter-delegua

Esse bootstrap já foi gerado com tree-sitter CLI e contém:

- grammar.js
- tree-sitter.json
- src/ (arquivos gerados do parser)
- queries/ iniciais (highlights, brackets, indents)

Validação atual do bootstrap:

- corpus inicial de testes criado
- `tree-sitter test` passando

Cobertura sintática inicial já implementada no bootstrap:

- declaração de variáveis
- declaração de função e métodos
- declaração de interface
- declaração de extensão (`extensao de`)
- condicionais `se`/`senao`
- laços `enquanto` e `para`
- laço `para cada ... em`
- `importar`
- `classe`
- `classe` com `implementa/implements`
- comando de propriedade (`identificador: comando`)
- `escolha`/`caso`/`padrao`
- `tente`/`pegue`/`finalmente`
- `tendo ... como ...`
- `continue` e `sustar`
- `falhar`, `assercao` e `ajuda`
- literais de vetor e indexação (`[]`)
- arrow functions
- optional chaining (`?.`)
- spread em argumentos (`...`)
- literais de objeto (`{ chave: valor }`)

Documentação complementar:

- docs/tree-sitter-migracao.md
- docs/antlr-origem.md
