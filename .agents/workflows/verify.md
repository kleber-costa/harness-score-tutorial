---
description: Verifica o Meeting Cost CLI executando somente os comandos que existem hoje e registrando sensors pendentes.
---

# Verificar

Execute na raiz do repositório. Use somente comandos que existem; não invente outros.

## Passos

1. Caso válido: `npm start -- 5 60 100`. Esperado: `Reunião de 5 participante(s) por 60 min a 100.00/h: custo total = 500.00`.
2. Caso inválido: `npm start -- 0 60 100`. Esperado: erro em `stderr` com a forma de uso e código de saída 1.
3. Argumentos faltando: `npm start -- 5 60`. Esperado: erro de uso e código 1.
4. Confirme que `README.md` e `LICENSE` não foram alterados e que `PROJETO.md` condiz com o comportamento.

## Sensors pendentes

Ainda não existem scripts nem configuração para estes sensors. Registre-os como pendentes no relatório; não invente comandos:

- Testes: pendente.
- Lint: pendente.
- Typecheck: pendente.

## Relatório

Liste cada comando executado, o código de saída e o resultado. Inclua os sensors pendentes. Não faça commit.
