# Documentação Azure DevOps - LARA

## Projeto

- Organização: `lara-fiap-rm555438`
- Projeto: `LARA-TOGAF`
- Link: https://dev.azure.com/lara-fiap-rm555438/LARA-TOGAF
- Challenge: FIAP 2026 x Eurofarma
- Projeto: LARA - Lactare Relationship Assistant

## Integrantes

| Integrante | RM |
| --- | --- |
| Julia Sawaia | RM555438 |
| Maria Eduarda Oliveira | RM558970 |
| Guilherme Garcia | RM558102 |
| André Pilatis | RM555897 |

## Validação de acesso

Em 06/09/2026, a URL pública do Azure DevOps respondeu com `HTTP 404` e cabeçalho de autenticação `Bearer`, indicando que o projeto não pôde ser validado publicamente sem login nesta execução. Não foram realizadas alterações no Azure DevOps porque não havia ferramenta autenticada disponível para edição segura do projeto.

## Fonte local confirmada

Foi localizado no workspace o arquivo `docs/azure-devops-work-items.csv` e uma documentação local anterior em `docs/azure-devops-togaf-sprint.md`. A documentação abaixo usa somente essas fontes locais e o código do protótipo web.

## Epics

| ID | Epic | Objetivo relacionado |
| --- | --- | --- |
| E-01 | Captação e conversão de doadoras | Aumentar alcance, engajamento e conversão de nutrizes em doadoras de leite humano. |
| E-02 | Jornada digital empática de 30 dias | Acompanhar nutrizes no pós-parto com comunicação cuidadosa. |
| E-03 | Inteligência operacional e memória emocional | Consolidar contexto, score, histórico e indicadores para apoio à decisão. |
| E-04 | Conexão com BLHs e agendamento de coleta | Aproximar nutriz e banco de leite humano. |
| E-05 | Handoff humano e segurança do acolhimento | Encaminhar situações sensíveis para atendimento humano. |

## Features

| Feature | Epic relacionado | Observação |
| --- | --- | --- |
| Cadastro de nutriz pelo hospital parceiro | Captação e conversão de doadoras | Inicia a jornada em D0. |
| Acompanhamento de jornadas de nutrizes | Jornada digital empática de 30 dias | Lista nutrizes, etapas e scores. |
| Detalhe contextual da nutriz | Jornada digital empática de 30 dias | Mostra histórico, mensagens e BLH. |
| Conversa LARA por etapa da jornada | Jornada digital empática de 30 dias | Simula respostas por intenção. |
| Score de prontidão e análise de interação | Inteligência operacional e memória emocional | Atualiza score localmente. |
| Convite e agendamento com BLH | Conexão com BLHs e agendamento de coleta | Permite agendamento demonstrativo. |
| Atendimento humano com contexto | Handoff humano e segurança do acolhimento | Cria fila com resumo simulado. |
| Indicadores gerenciais e funil | Inteligência operacional e memória emocional | Apoia visão gerencial. |
| Operação demonstrativa do BLH | Conexão com BLHs e agendamento de coleta | Agenda, doadoras e estoque. |
| Persistência demonstrativa em memória e localStorage | Inteligência operacional e memória emocional | Mantém dados locais no navegador. |

## Product Backlog Items

| PBI | Feature | Effort | Sprint |
| --- | --- | ---: | --- |
| Estruturar base do app LARA e modelos de jornada | Persistência demonstrativa em memória e localStorage | 8 | Sprint 1 |
| Implementar navegação entre home, lista, detalhe, cadastro e confirmação | Acompanhamento de jornadas de nutrizes | 5 | Sprint 1 |
| Exibir painel inicial com KPIs do funil | Indicadores gerenciais e funil | 3 | Sprint 1 |
| Listar nutrizes com etapa, sentimento e score | Acompanhamento de jornadas de nutrizes | 5 | Sprint 1 |
| Exibir detalhe da jornada com memória emocional, mensagens e BLH | Detalhe contextual da nutriz | 8 | Sprint 2 |
| Cadastrar nova nutriz e iniciar jornada D0 | Cadastro de nutriz pelo hospital parceiro | 5 | Sprint 2 |
| Simular chat LARA com respostas por intenção | Conversa LARA por etapa da jornada | 13 | Sprint 2 |
| Atualizar score e status conforme interação da nutriz | Score de prontidão e análise de interação | 8 | Sprint 3 |
| Criar fila de atendimento humano com resumo de contexto | Atendimento humano com contexto | 8 | Sprint 3 |
| Permitir agendamento de coleta presencial ou domiciliar | Convite e agendamento com BLH | 8 | Sprint 3 |
| Disponibilizar painel gerencial com filtros, funil e mapa | Indicadores gerenciais e funil | 13 | Sprint 4 |
| Registrar entrada de estoque demonstrativa no BLH | Operação demonstrativa do BLH | 5 | Sprint 4 |

## Release plan

| Sprint | Período documentado localmente | Entregas |
| --- | --- | --- |
| Sprint 1 | 29/06/2026 a 15/07/2026 | Base do app, navegação, indicadores iniciais e lista de nutrizes. |
| Sprint 2 | 16/07/2026 a 01/08/2026 | Detalhe, cadastro D0 e chat demonstrativo. |
| Sprint 3 | 02/08/2026 a 18/08/2026 | Score, handoff humano e agendamento. |
| Sprint 4 | 19/08/2026 a 04/09/2026 | Painel gerencial, mapa, funil e estoque demonstrativo. |

## Rastreabilidade

A rastreabilidade local indica a sequência: Objective TOGAF -> Epic -> Requirement TOGAF -> Feature -> Componentes -> Product Backlog Item -> Sprint. Essa estrutura foi inferida a partir dos arquivos locais do projeto, do protótipo web e dos work items exportados em CSV.

## Pendências

- Confirmar acesso público ao Azure DevOps sem login.
- A hierarquia real de work items deve ser considerada validada somente dentro do Azure DevOps autenticado, pois a URL pública não pôde ser aberta sem login nesta conferência.
- Corrigir no Azure, se necessário, qualquer divergência de RM ou acentuação encontrada em documentação antiga.
