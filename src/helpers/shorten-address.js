/**
 *
 * @param {string} address
 * @returns string
 *
 * @example
 * shortenAddress("0x1234567890123456789012345678901234567890")
 * // => "0x1234...7890"
 */
export function shortenAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
