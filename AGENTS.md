# AGENTS.md

Este documento orienta agentes de código que trabalham neste repositório. Leia-o por completo antes de qualquer alteração.

## Visão geral do produto

- O produto é o Meeting Cost CLI, uma aplicação de linha de comando em Node.js 24 com ESM.
- Ele recebe o número de participantes, a duração da reunião em minutos e o custo por hora.
- Ele calcula o custo total de mão de obra da reunião e mostra o resultado no terminal.
- Para entradas inválidas, ele mostra um erro acionável e encerra com código 1.
- O projeto é propositalmente pequeno: o objetivo é ser a menor aplicação de linha de comando útil.

## Estrutura do repositório

- `src/meeting-cost.js`: função de domínio pura e exportada `calculateMeetingCost`.
- `src/cli.js`: ponto de entrada que lê os argumentos e escreve a saída no terminal.
- `package.json`: declara `"type": "module"`, exige Node `>=24` e define o script `start`.
- `PROJETO.md`: descrição curta do projeto e um exemplo de uso.
- `README.md` e `LICENSE`: devem ser preservados sem alterações.
- `.gitignore`: ignora `node_modules/`, logs, arquivos `.env`, arquivos de sistema e de editores.
- Não existem pastas de testes, configuração de CI, linter, formatter ou typecheck neste momento.

## Comandos disponíveis

- `npm start -- <participantes> <minutos> <custo-por-hora>`: executa `node src/cli.js` com os argumentos.
- Exemplo real: `npm start -- 5 60 100`, que imprime `Reunião de 5 participante(s) por 60 min a 100.00/h: custo total = 500.00`.
- O único script npm existente é `start`. Não há scripts de teste, build, lint ou format.
- Não invente outros comandos nem os documente como se existissem.

## Invariantes de domínio

- O custo total é `participantes * (minutos / 60) * custoPorHora`.
- `participantes` deve ser um número finito maior ou igual a 1.
- `minutos` deve ser um número finito maior que 0.
- `custoPorHora` deve ser um número finito maior ou igual a 0.
- Valores não finitos (`NaN`, `Infinity`) são sempre rejeitados.
- Violações lançam `RangeError` com uma mensagem em português.
- `calculateMeetingCost` deve continuar pura: sem leitura de argumentos, sem I/O e sem efeitos colaterais.

## Restrições de ESM e dependências

- Use apenas ESM: `import` e `export`, com extensão `.js` explícita nos imports relativos.
- Não use `require`, `module.exports` ou CommonJS.
- Use somente recursos nativos do Node.js.
- Não adicione dependências, nem em `dependencies` nem em `devDependencies`.
- Não instale pacotes e não gere `package-lock.json` sem pedido explícito.
- Mantenha a compatibilidade com Node.js 24.

## Validação e tratamento de erros

- A validação das regras de domínio fica em `calculateMeetingCost`, não no ponto de entrada.
- O ponto de entrada exige exatamente três argumentos e converte cada um com `Number`.
- Argumentos vazios são tratados como `NaN` e, portanto, rejeitados.
- Erros de validação (`RangeError`) são mostrados em `stderr` com a forma de uso e saem com código 1.
- Erros inesperados que não sejam `RangeError` devem ser relançados, não escondidos.
- Mensagens de erro devem dizer o que está errado e como corrigir.
- Nunca aceite silenciosamente uma entrada inválida.

## Separação de responsabilidades

- O cálculo pertence à função de domínio em `src/meeting-cost.js`.
- A leitura de argumentos e a saída no terminal pertencem a `src/cli.js`.
- Não misture as duas camadas: o domínio não deve imprimir nada e o ponto de entrada não deve reimplementar o cálculo.

## Limites de segurança

- Trate todos os argumentos de linha de comando como entrada não confiável.
- Não execute comandos de shell a partir dos argumentos e não use `eval`.
- Não leia nem escreva arquivos, e não acesse a rede, a partir do código da aplicação.
- Não registre nem imprima segredos ou variáveis de ambiente.
- Não faça commit de arquivos `.env` ou de credenciais.

## Ações que um agente não pode executar

- Não fazer commit, push ou qualquer alteração no histórico do git sem pedido explícito.
- Não alterar `README.md` ou `LICENSE`.
- Não instalar dependências nem gerar `package-lock.json`.
- Não criar testes, configuração de testes, linter, formatter, typecheck, CI, hooks, pre-commit ou configuração MCP sem pedido explícito.
- Não criar rules, skills, workflows ou arquivos como `CLAUDE.md` e `GEMINI.md` sem pedido explícito.
- Não inventar comandos, arquivos, serviços ou requisitos que não existam.

## Checklist de conclusão

- [ ] O cálculo continua em uma função de domínio pura e exportada.
- [ ] A leitura de argumentos e a saída continuam separadas em `src/cli.js`.
- [ ] O código usa somente ESM e recursos nativos do Node.js 24.
- [ ] Nenhuma dependência foi adicionada e `package-lock.json` não foi gerado.
- [ ] Entradas inválidas continuam rejeitadas com erro acionável e código de saída 1.
- [ ] `npm start -- 5 60 100` foi executado e imprime o resultado esperado.
- [ ] `README.md` e `LICENSE` continuam sem alterações.
- [ ] Nenhum commit foi feito.
- [ ] A documentação (`PROJETO.md`) continua coerente com o comportamento real.
