---
trigger: glob
globs: src/**
description: Regras de domínio e arquitetura do Meeting Cost CLI para arquivos em src/.
---

# Regras de `src/`

## Arquitetura

- `src/meeting-cost.js` exporta `calculateMeetingCost(participants, minutes, hourlyCost)`, função pura: sem I/O, sem argumentos de processo, sem efeitos colaterais.
- `src/cli.js` só lê `process.argv`, chama `calculateMeetingCost` e escreve em `stdout`/`stderr`. Não reimplemente o cálculo nele.
- Imports relativos em ESM com `.js` explícito. Sem `require` nem `module.exports`.

## Domínio

- Custo total = `participantes * (minutos / 60) * custoPorHora`.
- `participantes`: finito e `>= 1`. `minutos`: finito e `> 0`. `custoPorHora`: finito e `>= 0`. `NaN` e `Infinity` são rejeitados.
- Violações lançam `RangeError` com mensagem em português que diz o que está errado e como corrigir.
- Só `calculateMeetingCost` valida as regras de domínio.

## CLI

- Exija exatamente três argumentos e converta cada um com `Number`; argumento vazio vira `NaN`.
- Mostre `RangeError` em `stderr` com a forma de uso e saia com código 1. Relance os demais erros.
- Sem `eval`, shell, leitura/escrita de arquivos ou rede.
