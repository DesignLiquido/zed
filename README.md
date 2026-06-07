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
