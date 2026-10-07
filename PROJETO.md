# Meeting Cost CLI

CLI em Node.js 24 (ESM, sem dependências) que calcula o custo total de mão de obra de uma reunião a partir do número de participantes, da duração em minutos e do custo por hora.

## Uso

```bash
npm start -- <participantes> <minutos> <custo-por-hora>
npm start -- 5 60 100
```

Saída:

```
Reunião de 5 participante(s) por 60 min a 100.00/h: custo total = 500.00
```

Entradas inválidas (não finitas, menos de 1 participante, duração <= 0, custo negativo) retornam uma mensagem de erro e código de saída 1.

## Estrutura

- `src/meeting-cost.js`: função de domínio pura `calculateMeetingCost`.
- `src/cli.js`: leitura de argumentos e saída no terminal.
