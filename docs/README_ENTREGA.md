# README da Entrega - LARA

## Apresentação

LARA - Lactare Relationship Assistant é um protótipo acadêmico para o Challenge FIAP 2026 x Eurofarma. A aplicação demonstra uma jornada digital para aproximar nutrizes, hospitais parceiros, atendentes Lactare, bancos de leite humano e gestão Eurofarma, com foco em acolhimento, usabilidade e captação de doadoras de leite humano.

## Integrantes

| Integrante | RM |
| --- | --- |
| Julia Sawaia | RM555438 |
| Maria Eduarda Oliveira | RM558970 |
| Guilherme Garcia | RM558102 |
| André Pilatis | RM555897 |

## Conteúdo do pacote

| Pasta | Conteúdo |
| --- | --- |
| `00_LEIA-ME` | Orientações gerais da entrega em Markdown e PDF. |
| `01_LINKS` | Links do vídeo, GitHub e Azure DevOps. |
| `02_DOCUMENTACAO` | Documentação completa do LARA, protótipo Sprint 2 e documentação do Azure DevOps. |
| `03_CODIGO_FONTE/lara-web` | Código-fonte do protótipo web React/TypeScript. |
| `04_VIDEO` | Informações de acesso ao vídeo pitch. |

## Links

- Vídeo pitch: https://youtu.be/aO8Ntmf0yGs
- GitHub: https://github.com/juhsawaya/SPRINT03LARA
- Situação do GitHub: repositório público confirmado; arquivos finais publicados na branch `main`.
- Azure DevOps: https://dev.azure.com/lara-fiap-rm555438/LARA-TOGAF

## Como executar

Entre na pasta `03_CODIGO_FONTE/lara-web` e execute:

```bash
npm ci
npm run dev
```

Para validar o build:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## Funcionalidades operacionais

- Seleção de cinco perfis demonstrativos.
- Chat da nutriz com respostas simuladas por intenção.
- Jornada com etapas D0, D2, D4-8, D10-14, D14+ e Pós-doação.
- Agendamento demonstrativo.
- Painel gerencial com KPIs, funil, mapa e lista.
- Handoff humano com resumo simulado.
- Agenda e estoque demonstrativos do BLH.
- Cadastro hospitalar com consentimento LGPD demonstrativo.
- Persistência local via `localStorage`.

## Funcionalidades simuladas

- Inteligência artificial.
- WhatsApp Business.
- Integrações hospitalares, Eurofarma, Lactare e BLH.
- Banco de dados e backend.
- Autenticação real.
- Score, análises, resumos e mapa.

## Funcionalidades pendentes

- Backend e APIs.
- Banco de dados persistente.
- Autenticação e permissões por perfil.
- Integrações reais.
- IA real com governança e validação.
- Testes automatizados e homologação.

## Estado de completude

O pacote consolida o protótipo web navegável, a documentação acadêmica, o PDF de protótipos da Sprint 2 e os links oficiais informados. A validação pública do Azure DevOps não foi concluída porque a URL retornou erro de acesso sem login. O vídeo foi disponibilizado por link público; o arquivo local de vídeo não integra este ZIP.

## Aviso sobre dados fictícios

Todos os dados pessoais, mensagens, CPFs, telefones, hospitais, BLHs, métricas e scores usados na aplicação são fictícios e servem apenas para demonstração acadêmica. Scores, análises e resumos não possuem finalidade médica ou clínica.

## Checklist final

| Item | Situação |
| --- | --- |
| Código-fonte limpo incluído | Concluído |
| `package-lock.json` incluído | Concluído |
| `node_modules` fora do pacote | Concluído |
| `dist` fora do pacote | Concluído |
| `.git` fora do pacote | Concluído |
| Build web executado | Concluído |
| GitHub público verificado via API | Concluído |
| Commit final preparado para GitHub | Concluído |
| Publicação no GitHub | Concluído |
| Azure DevOps público verificado | Pendente: URL retornou 404/autenticação |
| Vídeo local final gerado | Não aplicável ao ZIP; vídeo entregue por link |
| Link do vídeo fornecido | Concluído |
| Documentação em Markdown e PDF | Concluído |

## Orientação de acesso

A banca deve usar os links em `01_LINKS/LINKS_DO_PROJETO.txt` para acessar vídeo, repositório GitHub e Azure DevOps. Em caso de bloqueio no Azure DevOps, a limitação de acesso está documentada em `02_DOCUMENTACAO/Documentacao_Azure_DevOps.md`.
