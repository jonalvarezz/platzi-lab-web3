import { ethers } from "ethers";

/**
 *
 * @param {number} value Value in wei
 * @returns string
 */
export function formatGwei(value) {
  return `${ethers.utils.formatUnits(value, "gwei")} Gwei`;
}
