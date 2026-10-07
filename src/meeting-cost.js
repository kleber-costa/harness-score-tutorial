/**
 * Calcula o custo total de mão de obra de uma reunião.
 * @param {number} participants Número de participantes (>= 1).
 * @param {number} minutes Duração em minutos (> 0).
 * @param {number} hourlyCost Custo por hora por participante (>= 0).
 * @returns {number} Custo total.
 */
export function calculateMeetingCost(participants, minutes, hourlyCost) {
  if (!Number.isFinite(participants) || participants < 1) {
    throw new RangeError('participantes deve ser um número finito maior ou igual a 1');
  }
  if (!Number.isFinite(minutes) || minutes <= 0) {
    throw new RangeError('minutos deve ser um número finito maior que 0');
  }
  if (!Number.isFinite(hourlyCost) || hourlyCost < 0) {
    throw new RangeError('custo-por-hora deve ser um número finito maior ou igual a 0');
  }
  return participants * (minutes / 60) * hourlyCost;
}
