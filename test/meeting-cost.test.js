import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { calculateMeetingCost } from '../src/meeting-cost.js';

describe('calculateMeetingCost', () => {
  it('calcula o custo de uma reunião válida', () => {
    assert.equal(calculateMeetingCost(5, 60, 100), 500);
    assert.equal(calculateMeetingCost(2, 30, 80), 80);
  });

  it('aceita os limites válidos', () => {
    assert.equal(calculateMeetingCost(1, 60, 0), 0);
    assert.equal(calculateMeetingCost(1, 0.5, 120), 1);
  });

  it('mantém a precisão fracionária sem arredondar', () => {
    assert.ok(Math.abs(calculateMeetingCost(1, 1, 100) - 100 / 60) < 1e-12);
  });

  it('rejeita participantes menores que 1', () => {
    assert.throws(() => calculateMeetingCost(0, 60, 100), RangeError);
    assert.throws(() => calculateMeetingCost(0.5, 60, 100), RangeError);
    assert.throws(() => calculateMeetingCost(-1, 60, 100), RangeError);
  });

  it('rejeita duração não positiva', () => {
    assert.throws(() => calculateMeetingCost(5, 0, 100), RangeError);
    assert.throws(() => calculateMeetingCost(5, -10, 100), RangeError);
  });

  it('rejeita custo por hora negativo', () => {
    assert.throws(() => calculateMeetingCost(5, 60, -1), RangeError);
  });

  it('rejeita valores não finitos', () => {
    for (const bad of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
      assert.throws(() => calculateMeetingCost(bad, 60, 100), RangeError);
      assert.throws(() => calculateMeetingCost(5, bad, 100), RangeError);
      assert.throws(() => calculateMeetingCost(5, 60, bad), RangeError);
    }
  });

  it('usa mensagens em português que indicam como corrigir', () => {
    assert.throws(() => calculateMeetingCost(0, 60, 100), /participantes.*maior ou igual a 1/);
  });
});
