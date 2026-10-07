# AGENTS.md

## Produto

- Meeting Cost CLI: CLI em Node.js 24 com ESM que calcula o custo total de mão de obra de uma reunião.
- Entrada: participantes, minutos e custo por hora. Saída: resultado no terminal.
- Mantenha o projeto mínimo: a menor aplicação de linha de comando útil.

## Estrutura

- `src/meeting-cost.js`: função de domínio pura e exportada `calculateMeetingCost`.
- `src/cli.js`: lê os argumentos e escreve a saída no terminal.
- `package.json`: `"type": "module"`, Node `>=24`, script `start`.
- `PROJETO.md`: descrição curta e exemplo de uso. Mantenha-o coerente com o comportamento real.
- `README.md`, `LICENSE`: não altere.
- `.gitignore`: `node_modules/`, logs, `.env`, arquivos de sistema e de editores.
- Não existem testes, CI, linter, formatter nem typecheck.

## Comandos

- `npm start -- <participantes> <minutos> <custo-por-hora>` executa `node src/cli.js`.
- Exemplo: `npm start -- 5 60 100` imprime `Reunião de 5 participante(s) por 60 min a 100.00/h: custo total = 500.00`.
- `start` é o único script. Não invente outros.

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
- Use só recursos nativos do Node.js 24. Não adicione dependências nem `package-lock.json`.

## Segurança

- Trate os argumentos como entrada não confiável. Sem `eval` nem comandos de shell.
- O código da aplicação não lê nem escreve arquivos e não acessa a rede.
- Não imprima segredos nem variáveis de ambiente. Não faça commit de `.env` ou credenciais.

## Proibido sem pedido explícito

- Commit, push ou mudança no histórico do git.
- Instalar dependências ou gerar `package-lock.json`.
- Criar testes, linter, formatter, typecheck, CI, hooks, pre-commit, MCP, rules, skills, workflows, `CLAUDE.md` ou `GEMINI.md`.
- Inventar comandos, arquivos, serviços ou requisitos.

## Conclusão

- [ ] Cálculo puro e exportado; CLI separada.
- [ ] Só ESM e Node.js nativo; sem dependências nem `package-lock.json`.
- [ ] Entradas inválidas rejeitadas com erro acionável e código 1.
- [ ] `npm start -- 5 60 100` imprime o resultado esperado.
- [ ] `README.md`, `LICENSE` e `PROJETO.md` coerentes; sem commit.
