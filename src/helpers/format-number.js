/**
 *
 * @param {number} number
 * @returns string
 * @example
 * const number = 1000000;
 * const formattedNumber = formatNumber(number);
 * console.log(formattedNumber); // 1,000,000
 */
export function formatNumber(number) {
  return new Intl.NumberFormat("es-ES").format(number);
}
