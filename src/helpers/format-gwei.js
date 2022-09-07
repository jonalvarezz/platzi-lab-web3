import { ethers } from "ethers";

/**
 *
 * @param {Number} value Value in wei
 * @returns String
 */
export function formatGwei(value) {
  return `${ethers.utils.formatUnits(value, "gwei")} Gwei`;
}
