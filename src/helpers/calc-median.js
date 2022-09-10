/**
 * Calculates the median of an array of numbers
 *
 * @param {Array} list - List of numbers
 * @returns number
 */
export function calcMedian(list) {
  if (list.length === 0) {
    return 0;
  }

  list.sort((a, b) => a - b);

  const half = Math.floor(list.length / 2);

  if (list.length % 2) return list[half];

  return (list[half - 1] + list[half]) / 2.0;
}
