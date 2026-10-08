#!/usr/bin/env node
// Feedback hook (afterFileEdit): formata com o Biome local o arquivo editado.
// É só orientação: nunca falha o fluxo do agente; a CI é a fonte da verdade.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const BIOME = path.join(ROOT, 'node_modules', '@biomejs', 'biome', 'bin', 'biome');
const SUPPORTED = new Set(['.js', '.mjs', '.cjs', '.json', '.jsonc']);

try {
  const payload = JSON.parse(readFileSync(0, 'utf8'));
  const filePath = payload?.file_path;
  if (typeof filePath === 'string') {
    const absolute = path.resolve(ROOT, filePath);
    const inside = !path.relative(ROOT, absolute).startsWith('..');
    if (inside && SUPPORTED.has(path.extname(absolute)) && existsSync(BIOME)) {
      execFileSync(
        process.execPath,
        [BIOME, 'format', '--write', '--no-errors-on-unmatched', absolute],
        { cwd: ROOT, stdio: 'ignore', timeout: 10_000 },
      );
    }
  }
} catch {
  // Payload inválido ou falha do formatter: ignore e deixe a CI decidir.
}
process.stdout.write('{}\n');
