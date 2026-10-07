---
description: Verifica o Meeting Cost CLI com os comandos reais de feedback (lint, typecheck e testes).
---

# Verificar

Execute na raiz do repositório. Use somente os scripts de `package.json`; não invente outros.

## Passos

1. `npm run check` (lint, typecheck e testes). Se falhar, corrija a causa e repita.
2. Se o lint reclamar de formatação, rode `npm run format` e repita o passo 1.
3. `npm start -- 5 60 100`. Esperado: `Reunião de 5 participante(s) por 60 min a 100.00/h: custo total = 500.00`.
4. Confirme que `README.md` e `LICENSE` não foram alterados e que `PROJETO.md` condiz com o comportamento.

## Relatório

Liste cada comando, o código de saída e o resultado, incluindo a contagem de testes. Não faça commit.
