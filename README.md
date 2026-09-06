# LARA - Lactare Relationship Assistant

Projeto acadêmico desenvolvido para o Challenge FIAP 2026 x Eurofarma.

## Visão geral

O LARA - Lactare Relationship Assistant é um protótipo web navegável que demonstra uma jornada digital de acolhimento e relacionamento com nutrizes no pós-parto. A solução busca apoiar a captação de doadoras de leite humano por meio de uma experiência empática, personalizada e integrada entre nutrizes, hospitais parceiros, atendentes Lactare, bancos de leite humano e gestão Eurofarma.

O projeto atual é um front-end em React e TypeScript, com dados fictícios e persistência local no navegador. Não há backend, autenticação real, banco de dados externo, WhatsApp Business real, APIs de hospitais/BLHs ou inteligência artificial real implementados nesta versão.

## Problema

Bancos de leite humano dependem de uma comunicação cuidadosa e oportuna para aproximar nutrizes aptas da possibilidade de doação. No período pós-parto, a nutriz pode estar cansada, insegura ou sobrecarregada, e abordagens genéricas ou insistentes podem reduzir o engajamento. Também há desafios operacionais para conectar hospitais, atendentes, BLHs e gestores em uma jornada rastreável.

## Objetivo da solução

Demonstrar uma experiência digital que acompanha a nutriz em etapas, identifica sinais de prontidão ou necessidade de acolhimento, orienta sobre o BLH mais próximo, simula agendamento de coleta e oferece painéis operacionais para diferentes perfis.

## Público-alvo

| Perfil | Uso demonstrado |
| --- | --- |
| Nutriz | Conversa acolhedora, orientação por etapa da jornada, convite suave e agendamento. |
| Gestor Eurofarma | Indicadores, funil, mapa demonstrativo e visão de nutrizes em risco. |
| Atendente Lactare | Handoff humano com histórico e resumo contextual simulado. |
| Gestor do Banco de Leite Humano | Agenda, doadoras e registro de estoque demonstrativo. |
| Hospital parceiro | Cadastro de alta para iniciar a jornada da nutriz no LARA. |

## Benefícios

- Reduz fricção entre alta hospitalar, acolhimento e conexão com BLHs.
- Apoia uma comunicação mais humana e menos invasiva.
- Centraliza contexto de jornada, mensagens e status demonstrativos.
- Ajuda gestores a visualizar funil, regiões e risco de abandono.
- Permite demonstrar o fluxo ponta a ponta sem infraestrutura externa.

## Diferenciais competitivos

- Jornada orientada ao momento emocional da nutriz, com opção de pausa e handoff humano.
- Score de prontidão demonstrativo para apoiar priorização operacional.
- Experiência multi-perfil em uma única aplicação navegável.
- Integração futura prevista entre hospitais, Lactare, BLHs, Eurofarma e canais de mensagem.

## Integrantes

| Integrante | RM |
| --- | --- |
| Julia Sawaia | RM555438 |
| Maria Eduarda Oliveira | RM558970 |
| Guilherme Garcia | RM558102 |
| André Pilatis | RM555897 |

## Funcionalidades implementadas

- Seleção de perfil demonstrativo.
- Chat da nutriz com respostas simuladas por intenção e etapa da jornada.
- Etapas de jornada: D0, D2, D4-8, D10-14, D14+ e Pós-doação.
- Alteração simulada de score, status e histórico conforme mensagens digitadas.
- Convite para BLH próximo e abertura de modal de agendamento.
- Agendamento demonstrativo presencial ou domiciliar.
- Painel do gestor com KPIs, funil, mapa, lista de nutrizes, atendimento e configurações.
- Fila de atendimento humano com resumo simulado.
- Painel do atendente com histórico, nota interna, pausa de mensagens e encaminhamento simulado.
- Painel do BLH com agenda, doadoras e registro de estoque demonstrativo.
- Portal hospitalar com cadastro de alta e consentimento LGPD demonstrativo.
- Persistência local dos dados da demonstração via `localStorage`.
- Restauração dos dados iniciais pela opção "Restaurar demonstração".

## Principais telas

| Tela | Descrição |
| --- | --- |
| Seleção de perfil | Entrada da demonstração com acesso aos cinco perfis. |
| Nutriz | Simula conversa com a LARA, mudança de etapa, conteúdo de acolhimento, BLH próximo e agendamento. |
| Gestor Eurofarma | Mostra KPIs, gráfico semanal, funil, mapa de calor demonstrativo, lista de nutrizes e fila de atendimento. |
| Atendente Lactare | Mostra handoff humano, resumo simulado, histórico, ações de acolhimento e agendamento. |
| Gestor do BLH | Mostra agenda do dia, estoque e doadoras acompanhadas. |
| Hospital parceiro | Permite cadastrar alta fictícia e iniciar a jornada no dia D0. |

## Tecnologias

| Categoria | Itens |
| --- | --- |
| Linguagem | TypeScript |
| Interface | React |
| Build/dev server | Vite |
| Componentes visuais | CSS próprio |
| Ícones | lucide-react |
| Gráficos | Recharts |
| Persistência | `localStorage` do navegador |
| IDE sugerida | Visual Studio Code ou equivalente |

## Estrutura principal

```text
lara-web/
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    └── styles.css
```

## Pré-requisitos

- Node.js instalado.
- npm instalado.

## Instalação

```bash
npm ci
```

## Execução em desenvolvimento

```bash
npm run dev
```

Depois, acesse a URL exibida pelo Vite no terminal.

## Build de produção

```bash
npm run build
```

## Preview local do build

```bash
npm run preview
```

## Dados fictícios e persistência local

Todos os nomes, telefones, CPFs, hospitais, BLHs, mensagens, scores, métricas, mapas, resumos e dados de estoque usados na aplicação são demonstrativos. O protótipo salva alterações no `localStorage` do navegador para manter a navegação fluida durante a apresentação. Esses dados podem ser restaurados pela ação "Restaurar demonstração".

## Estado atual

### Já funcional

- Navegação entre perfis.
- Chat e respostas simuladas.
- Atualização local de score, status e histórico.
- Fila de atendimento humano.
- Agendamento demonstrativo.
- Painéis gerenciais e operacionais com dados fictícios.
- Cadastro hospitalar demonstrativo com validações básicas.

### Somente simulado

- Inteligência artificial e análise de sentimento.
- WhatsApp ou mensageria real.
- Integrações com hospitais, BLHs, Eurofarma e Lactare.
- Banco de dados, backend, autenticação e permissões reais.
- Geolocalização, mapa e cálculo de BLH mais próximo.
- Scores, resumos e análises.

### Falta para atingir 100%

- Backend com APIs seguras.
- Banco de dados persistente.
- Autenticação e autorização por perfil.
- Integração com WhatsApp Business ou canal equivalente.
- Integração com sistemas hospitalares e BLHs.
- Motor real de IA com validação ética, clínica e LGPD.
- Auditoria, logs, observabilidade e governança.
- Testes automatizados, testes de acessibilidade e homologação com usuários.

## Limitações

Este protótipo não deve ser usado para decisões médicas, clínicas ou assistenciais reais. Scores, análises, mensagens e resumos são simulados e não possuem finalidade médica ou clínica.

## Links

- Vídeo pitch: https://youtu.be/aO8Ntmf0yGs
- Repositório GitHub: https://github.com/juhsawaya/SPRINT03LARA
- Azure DevOps: https://dev.azure.com/lara-fiap-rm555438/LARA-TOGAF

## Licença

Uso acadêmico para avaliação no Challenge FIAP 2026 x Eurofarma.
