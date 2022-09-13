/**
 * Calculates the median of an array of numbers
 *
 * @param {Array} list - List of numbers
 * @param {Object} options
 * @param {Object} options.sort - Whether to sort the list or not
 * @param {Object} options.valueResolver - A function that returns the value to be used for the calculation
 * @returns number
 */
export function calcMedian(
  list,
  { sorted = false, valueResolver = (item) => item } = {}
) {
  if (list.length === 0) {
    return 0;
  }

  const values = sorted ? list : [...list].sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  if (values.length % 2) return valueResolver(values[half]);

  return (valueResolver(values[half - 1]) + valueResolver(values[half])) / 2.0;
}
