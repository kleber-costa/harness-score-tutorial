#!/usr/bin/env node
import { calculateMeetingCost } from './meeting-cost.js';

const USAGE =
  'Uso: npm start -- <participantes> <minutos> <custo-por-hora>\nExemplo: npm start -- 5 60 100';

const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error(`Erro: informe exatamente 3 argumentos.\n${USAGE}`);
  process.exit(1);
}

try {
  const [participants, minutes, hourlyCost] = args.map((arg) =>
    arg.trim() === '' ? NaN : Number(arg),
  );
  const total = calculateMeetingCost(participants, minutes, hourlyCost);
  console.log(
    `Reunião de ${participants} participante(s) por ${minutes} min a ${hourlyCost.toFixed(2)}/h: custo total = ${total.toFixed(2)}`,
  );
} catch (error) {
  if (error instanceof RangeError) {
    console.error(`Erro: ${error.message}.\n${USAGE}`);
    process.exit(1);
  }
  throw error;
}
