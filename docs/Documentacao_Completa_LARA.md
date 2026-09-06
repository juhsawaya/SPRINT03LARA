# Documentação Completa - LARA

## Capa

FIAP - Sistemas de Informação  
Challenge FIAP 2026 x Eurofarma  
Projeto: LARA - Lactare Relationship Assistant

| Integrante | RM |
| --- | --- |
| Julia Sawaia | RM555438 |
| Maria Eduarda Oliveira | RM558970 |
| Guilherme Garcia | RM558102 |
| André Pilatis | RM555897 |

Data da conferência: 06/09/2026

## Sumário

1. Introdução
2. Contextualização
3. Problema e necessidade
4. Objetivos
5. Público-alvo e stakeholders
6. Escopo
7. Requisitos e regras de negócio
8. Jornada da nutriz
9. Funcionalidades e telas
10. Perfis e permissões simuladas
11. Casos de uso
12. Casos de teste
13. Arquitetura atual e futura
14. Tecnologias
15. Segurança, LGPD, acessibilidade e usabilidade
16. Diferenciais, benefícios, limitações e próximos passos
17. Evidências e links oficiais

## 1. Introdução

O LARA - Lactare Relationship Assistant é um protótipo web navegável criado para demonstrar como uma jornada digital pode apoiar a captação de doadoras de leite humano com acolhimento, personalização e apoio operacional. A versão analisada é um front-end React/TypeScript com dados fictícios e persistência local no navegador.

## 2. Contextualização

O projeto está relacionado ao Challenge FIAP 2026 x Eurofarma e ao contexto Lactare. A proposta aproxima nutrizes em pós-parto, hospitais parceiros, atendentes Lactare, bancos de leite humano e gestão Eurofarma, demonstrando como uma experiência digital pode reduzir fricção entre orientação, convite, atendimento humano e agendamento.

## 3. Problema identificado

A doação de leite humano exige comunicação sensível e timing adequado. Nutrizes podem estar cansadas, inseguras ou indisponíveis, e uma abordagem invasiva pode prejudicar o vínculo. Além disso, a operação precisa de contexto, rastreabilidade, priorização e integração entre atores.

## 4. Necessidade atendida

A aplicação atende à necessidade de demonstrar uma jornada acolhedora, com comunicação por etapas, simulação de score de prontidão, sugestão de BLH, handoff humano e painéis operacionais.

## 5. Justificativa

O protótipo permite validar a experiência do usuário antes de investir em backend, integrações reais, IA real e infraestrutura. A abordagem multi-perfil evidencia benefícios para nutriz, atendimento, BLH, hospital e gestão.

## 6. Objetivo geral

Demonstrar uma solução digital capaz de apoiar a captação de doadoras de leite humano por meio de acompanhamento empático e operação coordenada.

## 7. Objetivos específicos

- Simular a jornada da nutriz do D0 ao pós-doação.
- Demonstrar mensagens acolhedoras e convite sem pressão.
- Simular score de prontidão e prioridade de atendimento.
- Permitir agendamento demonstrativo com BLH.
- Exibir painéis para gestor, atendente, hospital e BLH.
- Documentar claramente o que está implementado, simulado e pendente.

## 8. Público-alvo

- Nutrizes no pós-parto.
- Equipe Lactare.
- Gestores Eurofarma.
- Hospitais parceiros.
- Bancos de leite humano.

## 9. Stakeholders

| Stakeholder | Interesse |
| --- | --- |
| Nutriz | Receber orientação respeitosa e apoio humano quando necessário. |
| Hospital parceiro | Encaminhar altas elegíveis para a jornada. |
| Lactare | Acompanhar conversas, priorizar risco e oferecer acolhimento. |
| BLH | Organizar agenda, doadoras e estoque demonstrativo. |
| Eurofarma | Acompanhar impacto, funil e indicadores da iniciativa. |

## 10. Escopo

### Dentro do escopo atual

- Protótipo web navegável.
- Dados fictícios.
- Cinco perfis demonstrativos.
- Chat simulado por intenção.
- Painéis, agendamento e persistência local.

### Fora do escopo atual

- Backend real.
- Banco de dados externo.
- Autenticação real.
- Integrações reais com WhatsApp, hospitais, BLHs, Lactare ou Eurofarma.
- IA real.
- Uso clínico, médico ou assistencial real.

## 11. Requisitos funcionais

| ID | Requisito | Situação |
| --- | --- | --- |
| RF-01 | Permitir seleção de perfil demonstrativo. | Implementado |
| RF-02 | Exibir chat da nutriz com mensagens por etapa. | Implementado |
| RF-03 | Responder mensagens com lógica simulada de intenção. | Implementado/simulado |
| RF-04 | Atualizar score, status e histórico localmente. | Implementado/simulado |
| RF-05 | Exibir BLH próximo demonstrativo. | Implementado/simulado |
| RF-06 | Permitir agendamento presencial ou domiciliar. | Implementado/simulado |
| RF-07 | Criar solicitação de atendimento humano. | Implementado/simulado |
| RF-08 | Exibir painel gerencial com KPIs, funil, mapa e lista. | Implementado/simulado |
| RF-09 | Exibir agenda, doadoras e estoque para BLH. | Implementado/simulado |
| RF-10 | Cadastrar alta hospitalar fictícia com consentimento. | Implementado/simulado |
| RF-11 | Restaurar dados iniciais da demonstração. | Implementado |

## 12. Requisitos não funcionais

| ID | Requisito | Situação |
| --- | --- | --- |
| RNF-01 | Aplicação deve executar em navegador moderno. | Atendido |
| RNF-02 | Interface deve ser responsiva em nível demonstrativo. | Atendido parcialmente |
| RNF-03 | Dados sensíveis reais não devem ser usados. | Atendido com dados fictícios |
| RNF-04 | Build deve compilar sem erros. | Atendido em 06/09/2026 |
| RNF-05 | Código deve evitar envio de dependências geradas. | Atendido no pacote |
| RNF-06 | Scores e análises devem ser identificados como simulados. | Atendido na documentação e na interface |

## 13. Regras de negócio

- RB-01: A abordagem de doação deve respeitar o momento da nutriz.
- RB-02: Sinais de dor, cansaço, cancelamento ou pedido humano devem priorizar acolhimento.
- RB-03: Convites à doação devem aparecer em etapa adequada e sem insistência.
- RB-04: O atendimento humano deve receber contexto para evitar repetição da história.
- RB-05: O consentimento LGPD é obrigatório no cadastro hospitalar demonstrativo.
- RB-06: Dados e métricas são fictícios e não podem ser tratados como indicadores reais.

## 14. Jornada da nutriz

```text
D0 -> D2 -> D4-8 -> D10-14 -> D14+ -> Pós-doação
 |     |       |        |         |        |
Alta  Acolhe  Educa    Convida   Agenda   Acompanha
```

## 15. Funcionalidades implementadas

A aplicação implementa navegação entre perfis, chat demonstrativo, alteração de etapa, respostas por intenção, score local, histórico, fila de atendimento, agendamento, painel gerencial, painel do BLH, portal hospitalar e persistência em `localStorage`.

## 16. Telas principais

| Tela | Descrição |
| --- | --- |
| Seleção de perfil | Acesso a nutriz, gestor, atendente, BLH e hospital. |
| Nutriz | Conversa estilo aplicativo, etapas da jornada, ações rápidas e agendamento. |
| Gestor Eurofarma | KPIs, gráfico semanal, funil, mapa, nutrizes, BLHs, atendimento e configurações. |
| Atendente Lactare | Handoff, resumo simulado, histórico, nota, pausa e encaminhamento. |
| Gestor BLH | Agenda por data, atualização de status, estoque e lista de doadoras. |
| Hospital parceiro | Cadastro de alta com campos obrigatórios e consentimento. |

## 17. Perfis e permissões simuladas

| Perfil | Permissões demonstradas |
| --- | --- |
| Nutriz | Conversar, aceitar/recusar conteúdos, solicitar atendente e agendar. |
| Gestor Eurofarma | Consultar indicadores, funil, mapa, nutrizes e fila. |
| Atendente Lactare | Consultar contexto, enviar mensagem, agendar, pausar e registrar nota. |
| Gestor BLH | Consultar agenda, status, doadoras e estoque. |
| Hospital parceiro | Cadastrar alta e encaminhar nutriz para a jornada. |

## 18. Casos de uso

| ID | Caso de uso | Ator | Pré-condição | Fluxo principal | Alternativas | Pós-condição |
| --- | --- | --- | --- | --- | --- | --- |
| UC-01 | Conversar com LARA | Nutriz | Perfil nutriz aberto | Digita mensagem; sistema registra; resposta simulada aparece | Se houver dor/cancelamento, cria handoff | Conversa e histórico atualizados |
| UC-02 | Agendar coleta | Nutriz | Etapa D14+ | Abre modal; escolhe modalidade, data e horário; confirma | Modal pode ser cancelado | Agendamento local criado |
| UC-03 | Consultar risco | Gestor | Perfil gestor aberto | Acessa visão geral; consulta nutrizes em risco | Pode abrir lista filtrada | Priorização demonstrada |
| UC-04 | Atender handoff | Atendente | Solicitação aberta | Lê resumo; registra ação; envia mensagem ou pausa | Pode encaminhar para psicólogo simulado | Atendimento atualizado localmente |
| UC-05 | Gerenciar BLH | Gestor BLH | Perfil BLH aberto | Consulta agenda; altera status; registra estoque | Data sem coletas exibe vazio | Agenda/estoque atualizados |
| UC-06 | Cadastrar alta | Hospital | Consentimento e campos válidos | Preenche formulário; envia para LARA | Campos inválidos exibem erro | Nutriz fictícia entra na base |

## 19. Casos de teste

| ID | Funcionalidade | Pré-condição | Passos | Resultado esperado | Resultado obtido | Situação |
| --- | --- | --- | --- | --- | --- | --- |
| CT-01 | Build | Dependências instaladas | Executar `npm run build` | Compilar sem erro | Build concluído em 06/09/2026 | Aprovado |
| CT-02 | Perfil nutriz | App aberto | Selecionar Nutriz | Chat e jornada aparecem | Confirmado pelo código e build | Aprovado |
| CT-03 | Mensagem com cansaço | Perfil nutriz | Enviar texto sobre cansaço | Resposta acolhedora e score reduzido | Lógica presente no código | Aprovado técnico |
| CT-04 | Pedido humano | Perfil nutriz | Solicitar atendente | Fila de atendimento recebe solicitação | Lógica presente no código | Aprovado técnico |
| CT-05 | Agendamento | Etapa D14+ | Abrir modal e confirmar | Agendamento é salvo localmente | Lógica presente no código | Aprovado técnico |
| CT-06 | Gestor | Perfil gestor | Abrir visão geral | KPIs, gráfico e risco aparecem | Componentes presentes no código | Aprovado técnico |
| CT-07 | BLH | Perfil BLH | Consultar agenda/estoque | Dados demonstrativos aparecem | Componentes presentes no código | Aprovado técnico |
| CT-08 | Hospital | Perfil hospital | Enviar sem consentimento | Exibir erro | Validação presente no código | Aprovado técnico |
| CT-09 | Limpeza do pacote | ZIP montado | Listar arquivos | Sem `node_modules`, `dist` e `.git` | Validado ao final | Aprovado |

## 20. Arquitetura atual

```text
Navegador
  |
  v
React + TypeScript + Vite
  |
  +-- Estado em memória
  +-- localStorage
  +-- Dados fictícios no App.tsx
```

## 21. Arquitetura futura proposta

```text
Usuários e perfis
  |
  v
Frontend Web/Mobile
  |
  v
API Backend segura
  |
  +-- Banco de dados
  +-- Serviço de autenticação
  +-- Motor de IA validado
  +-- WhatsApp Business/API de mensagens
  +-- Integrações hospitalares
  +-- Integrações com BLHs
  +-- Observabilidade, auditoria e LGPD
```

## 22. Atores

```text
Nutriz -> LARA -> Atendente Lactare -> BLH
Hospital parceiro -> LARA
Gestor Eurofarma -> Painel de indicadores
```

## 23. Integrações

### Atuais

Não há integrações externas reais. As integrações são simuladas no front-end.

### Futuras

- WhatsApp Business ou canal equivalente.
- APIs de hospitais parceiros.
- Sistemas de bancos de leite humano.
- Backend próprio.
- Motor de IA real.
- Serviços de autenticação, auditoria e monitoramento.

## 24. Tecnologias, linguagens, frameworks e bibliotecas

- TypeScript.
- React.
- Vite.
- lucide-react.
- Recharts.
- CSS.
- npm.
- `localStorage`.

## 25. IDEs

IDE sugerida: Visual Studio Code ou equivalente. Não há configuração obrigatória de IDE no pacote.

## 26. Persistência local e dados simulados

A persistência ocorre por `localStorage`, usando a chave `lara-lactare-demo-v2`. Os dados iniciais são definidos no código e representam cenários fictícios para demonstração.

## 27. Segurança e LGPD

O protótipo não processa dados reais e não possui backend. A tela hospitalar demonstra consentimento LGPD, mas a solução final exigiria política de privacidade, base legal, controle de acesso, criptografia, logs, auditoria, retenção de dados e governança de IA.

## 28. Acessibilidade

O código usa alguns recursos como `aria-label`, foco visível e estrutura semântica básica. A versão final deve passar por auditoria WCAG, navegação por teclado, contraste, leitores de tela e testes com usuários.

## 29. Usabilidade

A aplicação privilegia perfis claros, telas diretas, ações visíveis e linguagem acolhedora. O fluxo demonstra a experiência sem expor código-fonte ao usuário final.

## 30. Diferenciais competitivos

- Comunicação empática por etapa da jornada.
- Handoff humano com contexto.
- Visão multi-perfil.
- Priorização por score demonstrativo.
- Respeito à pausa e ao momento emocional da nutriz.

## 31. Benefícios

- Melhora a experiência da nutriz.
- Apoia captação de doadoras.
- Reduz repetição de contexto no atendimento.
- Facilita gestão e tomada de decisão.
- Demonstra integrações futuras de forma navegável.

## 32. Cronograma

| Etapa | Período |
| --- | --- |
| Levantamento de requisitos | Registrado nos documentos e protótipos disponíveis no pacote. |
| Protótipo de experiência | Evidenciado pelo PDF `LARA_Prototipos_Sprint2.pdf` e pelo protótipo web navegável. |
| Desenvolvimento front-end | Consolidado no código-fonte React/TypeScript incluído no pacote. |
| Documentação e validação final | 06/09/2026 |

## 33. Estado atual da implementação

### Funcional

Front-end navegável, perfis, chat, painéis, formulários, agendamento demonstrativo e persistência local.

### Simulado

IA, WhatsApp, score, geolocalização, BLH próximo, resumos, análises, integrações, dados operacionais e permissões.

### Pendente para 100%

Backend, banco, autenticação, integrações reais, IA real, testes automatizados, segurança, LGPD completa, deploy e homologação.

## 34. Limitações

O protótipo não tem finalidade médica ou clínica. Scores, análises e resumos são simulações sem validade assistencial.

## 35. Evidências da aplicação funcionando

- `npm ci` executado com sucesso em 06/09/2026.
- `npm run build` executado com sucesso em 06/09/2026.
- Vite gerou `dist/index.html`, CSS e JS de produção localmente durante a auditoria.

As telas principais foram verificadas no navegador local durante a conferência final: seleção de perfil, nutriz, gestor Eurofarma, atendente Lactare, gestor do BLH e hospital parceiro.

## 36. Links oficiais

- GitHub: https://github.com/juhsawaya/SPRINT03LARA
- Situação do GitHub: repositório público confirmado; arquivos finais publicados na branch `main`.
- Vídeo pitch: https://youtu.be/aO8Ntmf0yGs
- Azure DevOps: https://dev.azure.com/lara-fiap-rm555438/LARA-TOGAF

## 37. Pendências

- O vídeo pitch foi entregue por link público, sem inclusão do arquivo local de vídeo no ZIP.
- O arquivo `LARA_Prototipos_Sprint2.pdf` foi incluído na documentação do pacote.
- Azure DevOps não pôde ser visualizado publicamente sem autenticação nesta execução.
- Confirmar se o link do vídeo aponta à versão final com menos de 5 minutos.
- Os arquivos finais foram publicados na branch `main` do repositório GitHub informado.

## 38. Conclusão

O LARA apresenta uma proposta consistente de jornada digital para captação e acolhimento de nutrizes, com protótipo web funcional para demonstração acadêmica. A entrega atual deixa claro o que está implementado, o que é simulado e o que precisa ser desenvolvido para uma solução produtiva, segura e integrada.
