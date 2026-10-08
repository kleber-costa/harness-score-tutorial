#!/usr/bin/env node
// Gate hook (beforeShellExecution): lê o payload JSON do stdin e responde com
// {"permission": "allow" | "deny" | "ask", ...} no stdout. Sem dependências.
import { readFileSync } from 'node:fs';

/** @typedef {{ permission: 'allow' | 'deny' | 'ask', user_message?: string, agent_message?: string }} Decision */

const ROOT_OR_HOME_TARGETS = new Set(['/', '/*', '~', '~/', '~/*', '$HOME', '$HOME/', '$HOME/*']);

/** Padrões simples de comandos sempre negados. */
const DENY_PATTERNS = [
  { regex: /\bnpm\s+publish\b/i, reason: 'npm publish' },
  { regex: /\bgit\s+push\b[^;&|\n]*(?:--force\b|\s-f\b)/i, reason: 'git push --force' },
  { regex: /\bgit\s+reset\s+--hard\b/i, reason: 'git reset --hard' },
  {
    regex: /\bremove-item\b[^;&|\n]*(?:-recurse[^;&|\n]*-force|-force[^;&|\n]*-recurse)/i,
    reason: 'Remove-Item -Recurse -Force',
  },
  {
    regex:
      /\bremove-item\b[^;&|\n]*\s['"]?(?:[a-z]:\\?\*?|~|\$home|\$env:(?:userprofile|homepath))(?:\\\*)?['"]?(?:\s|$)/i,
    reason: 'Remove-Item em raiz ou home',
  },
];

/**
 * @param {string} command
 * @returns {string | null} Motivo da negação, ou null se o comando for permitido.
 */
function findDenyReason(command) {
  for (const { regex, reason } of DENY_PATTERNS) {
    if (regex.test(command)) return reason;
  }
  for (const segment of command.split(/[;&|\n]+/)) {
    const tokens = segment.trim().split(/\s+/);
    if (tokens[0] === 'sudo') tokens.shift();
    if (tokens[0] !== 'rm') continue;
    const flags = tokens.slice(1).filter((token) => token.startsWith('-'));
    const recursive = flags.some((flag) => flag === '--recursive' || /^-[a-zA-Z]*[rR]/.test(flag));
    const targets = tokens
      .slice(1)
      .filter((token) => !token.startsWith('-'))
      .map((token) => token.replace(/^['"]|['"]$/g, '').replace(/^\$\{HOME\}/, '$HOME'));
    if (recursive && targets.some((target) => ROOT_OR_HOME_TARGETS.has(target))) {
      return 'remoção recursiva de raiz ou home';
    }
  }
  return null;
}

/**
 * @param {string} raw Payload bruto recebido no stdin.
 * @returns {Decision}
 */
export function decide(raw) {
  /** @type {unknown} */
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return {
      permission: 'ask',
      user_message: 'Não foi possível interpretar o payload do hook. Confirme o comando.',
      agent_message: 'O gate recebeu um payload inválido; peça confirmação ao usuário.',
    };
  }
  const command =
    payload !== null && typeof payload === 'object' && 'command' in payload
      ? payload.command
      : undefined;
  if (typeof command !== 'string') {
    return {
      permission: 'ask',
      user_message: 'O payload do hook não traz um comando em texto. Confirme o comando.',
      agent_message: 'O gate não encontrou o campo "command"; peça confirmação ao usuário.',
    };
  }
  const reason = findDenyReason(command);
  if (reason) {
    return {
      permission: 'deny',
      user_message: `Comando bloqueado pelo gate: ${reason}.`,
      agent_message: `Comando negado (${reason}). Use uma alternativa segura ou peça ao usuário para executá-lo.`,
    };
  }
  return { permission: 'allow' };
}

if (import.meta.filename === process.argv[1]) {
  let raw = '';
  try {
    raw = readFileSync(0, 'utf8');
  } catch {
    // stdin ilegível: decide() devolve "ask" para entrada vazia.
  }
  process.stdout.write(`${JSON.stringify(decide(raw))}\n`);
}
