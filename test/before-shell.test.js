import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { describe, it } from 'node:test';
import { decide } from '../.cursor/hooks/before-shell.js';

/**
 * @param {string} command
 */
const payload = (command) => JSON.stringify({ command, cwd: '/repo' });

describe('gate beforeShellExecution', () => {
  it('permite comandos comuns', () => {
    for (const command of [
      'npm test',
      'npm run check',
      'git status',
      'git push origin main',
      'ls -la',
      'rm -rf node_modules',
      'rm file.txt',
      'Remove-Item ./tmp/file.txt',
    ]) {
      assert.equal(decide(payload(command)).permission, 'allow', command);
    }
  });

  it('nega comandos destrutivos', () => {
    for (const command of [
      'npm publish',
      'npm publish --access public',
      'git push --force',
      'git push origin main --force',
      'git push -f origin main',
      'git reset --hard HEAD~1',
      'rm -rf /',
      'rm -rf /*',
      'rm -fr ~',
      'rm -r "$HOME"',
      'sudo rm -rf $HOME/*',
      'rm -rf "\x24{HOME}"',
      'Remove-Item -Recurse -Force C:\\',
      'remove-item -Force -Recurse ./build',
      'Remove-Item -Path ~ -Recurse',
    ]) {
      assert.equal(decide(payload(command)).permission, 'deny', command);
    }
  });

  it('retorna ask para payload malformado ou sem comando', () => {
    for (const raw of ['', '{', 'não é json', 'null', '{}', '{"command":42}']) {
      assert.equal(decide(raw).permission, 'ask', raw);
    }
  });

  it('responde JSON válido no stdout ao ser executado', () => {
    const script = new URL('../.cursor/hooks/before-shell.js', import.meta.url).pathname;
    const denied = spawnSync(process.execPath, [script], {
      input: payload('npm publish'),
      encoding: 'utf8',
    });
    assert.equal(denied.status, 0);
    assert.equal(JSON.parse(denied.stdout).permission, 'deny');
    const malformed = spawnSync(process.execPath, [script], { input: '{', encoding: 'utf8' });
    assert.equal(JSON.parse(malformed.stdout).permission, 'ask');
  });
});
