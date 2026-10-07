import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { describe, it } from 'node:test';

const CLI = new URL('../src/cli.js', import.meta.url).pathname;

/**
 * @param {string[]} args
 */
function run(args) {
  return spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });
}

describe('cli', () => {
  it('imprime o resultado para entradas válidas', () => {
    const result = run(['5', '60', '100']);
    assert.equal(result.status, 0);
    assert.equal(
      result.stdout.trim(),
      'Reunião de 5 participante(s) por 60 min a 100.00/h: custo total = 500.00',
    );
  });

  it('arredonda o total para duas casas decimais', () => {
    const result = run(['1', '1', '100']);
    assert.equal(result.status, 0);
    assert.match(result.stdout, /custo total = 1\.67/);
  });

  it('rejeita intervalos inválidos com código 1 e uso em stderr', () => {
    for (const args of [
      ['0', '60', '100'],
      ['5', '0', '100'],
      ['5', '60', '-1'],
    ]) {
      const result = run(args);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /Uso: npm start/);
    }
  });

  it('rejeita entradas não finitas ou vazias', () => {
    for (const args of [
      ['abc', '60', '100'],
      ['5', 'Infinity', '100'],
      ['5', '60', 'NaN'],
      ['', '60', '100'],
    ]) {
      const result = run(args);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /Erro:/);
    }
  });

  it('exige exatamente três argumentos', () => {
    const result = run(['5', '60']);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /exatamente 3 argumentos/);
  });
});
