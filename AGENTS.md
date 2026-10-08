# AGENTS.md

## Produto

- Meeting Cost CLI: CLI em Node.js 24 com ESM que calcula o custo total de mão de obra de uma reunião.
- Entrada: participantes, minutos e custo por hora. Saída: resultado no terminal.
- Mantenha o projeto mínimo: a menor aplicação de linha de comando útil.

## Estrutura

- `src/meeting-cost.js`: função de domínio pura e exportada `calculateMeetingCost`.
- `src/cli.js`: lê os argumentos e escreve a saída no terminal.
- `test/`: testes com o test runner nativo do Node.js.
- `package.json`: `"type": "module"`, Node `>=24`, scripts abaixo.
- `biome.json`, `tsconfig.json`: configuração de lint/formatação e de typecheck estrito (`checkJs`).
- `.github/workflows/ci.yml`: CI com `npm ci`, lint, typecheck e testes.
- `PROJETO.md`: descrição curta e exemplo de uso. Mantenha-o coerente com o comportamento real.
- `README.md`, `LICENSE`: não altere.
- `.gitignore`: `node_modules/`, `coverage/`, logs, `.env*` (exceto `.env.example`), arquivos de sistema e de editores.

## Comandos

- `npm start -- <participantes> <minutos> <custo-por-hora>`: executa `node src/cli.js`. Exemplo: `npm start -- 5 60 100` imprime `Reunião de 5 participante(s) por 60 min a 100.00/h: custo total = 500.00`.
- `npm test`, `npm run lint`, `npm run typecheck`, `npm run format`.
- `npm run check`: lint, typecheck e testes. Rode antes de concluir; o passo a passo está em `.agents/workflows/verify.md`.
- Não invente outros scripts.

## Domínio

- Custo total = `participantes * (minutos / 60) * custoPorHora`.
- `participantes`: finito e `>= 1`. `minutos`: finito e `> 0`. `custoPorHora`: finito e `>= 0`.
- Rejeite `NaN` e `Infinity`.
- Lance `RangeError` com mensagem em português que diga o que está errado e como corrigir.
- Mantenha `calculateMeetingCost` pura: sem argumentos, I/O ou efeitos colaterais.

## CLI e erros

- Exija exatamente três argumentos e converta cada um com `Number`. Argumento vazio vira `NaN` e é rejeitado.
- Valide as regras de domínio só em `calculateMeetingCost`. Não reimplemente o cálculo em `src/cli.js`.
- Mostre `RangeError` em `stderr` com a forma de uso e saia com código 1.
- Relance erros que não sejam `RangeError`.

## Dependências e ESM

- Use apenas ESM, com `.js` explícito nos imports relativos. Sem `require` nem `module.exports`.
- Use só recursos nativos do Node.js 24 em runtime. Sem dependências de runtime.
- Dev dependencies fixadas (sem `^`): `@biomejs/biome`, `typescript`, `@types/node`. Não adicione outras sem pedido.
- Mantenha `package-lock.json` versionado e coerente com `package.json`.

## Segurança

- Trate os argumentos como entrada não confiável. Sem `eval` nem comandos de shell.
- O código da aplicação não lê nem escreve arquivos e não acessa a rede.
- Não imprima segredos nem variáveis de ambiente. Não faça commit de `.env` ou credenciais.

## Proibido sem pedido explícito

- Commit, push ou mudança no histórico do git.
- Instalar ou atualizar dependências.
- Criar hooks, pre-commit, MCP, subagentes, `CLAUDE.md` ou `GEMINI.md`.
- Inventar comandos, arquivos, serviços ou requisitos.

## Conclusão

- [ ] Cálculo puro e exportado; CLI separada.
- [ ] Só ESM e Node.js nativo; sem dependências de runtime.
- [ ] Entradas inválidas rejeitadas com erro acionável e código 1.
- [ ] `npm run check` passa.
- [ ] `README.md`, `LICENSE` e `PROJETO.md` coerentes; sem commit.
