---
name: add-calculation-case
description: Use when adding or changing a calculation or validation rule in calculateMeetingCost (src/meeting-cost.js), including its edge cases.
---

# Adicionar ou alterar uma regra de cálculo

## Processo

1. Leia `src/meeting-cost.js` e `src/cli.js`. A regra vive só em `calculateMeetingCost`; o CLI não calcula nem valida o domínio.
2. Escreva a regra em palavras: entradas, intervalo válido e fórmula. Fórmula atual: `participantes * (minutos / 60) * custoPorHora`.
3. Altere `calculateMeetingCost` mantendo-a pura (sem I/O nem efeitos colaterais).
4. Para cada entrada inválida, lance `RangeError` em português dizendo o que está errado e como corrigir.
5. Se a forma de uso ou a saída mudar, ajuste `src/cli.js` (continue com três argumentos via `Number`) e mantenha `PROJETO.md` coerente.
6. Não adicione dependências, testes ou comandos npm novos.

## Casos de borda

- `NaN`, `Infinity`, `-Infinity` em qualquer parâmetro: rejeitar.
- Participantes `0`, `0.5` ou negativos: rejeitar; `1` é aceito.
- Minutos `0` ou negativos: rejeitar; valores fracionários positivos são aceitos.
- Custo por hora `-1`: rejeitar; `0` é aceito e resulta em custo total `0`.
- Argumento vazio no CLI (vira `NaN`) e quantidade de argumentos diferente de três: erro com código 1.

## Verificação

Rode apenas comandos existentes (`npm start`), conforme `.agents/workflows/verify.md`:

- Caso válido: `npm start -- 5 60 100` deve imprimir `Reunião de 5 participante(s) por 60 min a 100.00/h: custo total = 500.00`.
- Para cada caso de borda inválido, ex.: `npm start -- 0 60 100`, confirme mensagem em `stderr` e código de saída 1 (`echo $?`).
- Confirme que a regra nova aparece no resultado esperado calculado à mão.
