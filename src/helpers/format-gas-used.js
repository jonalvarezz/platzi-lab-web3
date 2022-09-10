import { formatNumber } from "./format-number";

const getPercentage = (value, total) => {
  const percentage = (value / total) * 100;
  return percentage.toFixed(2);
};

/**
 *
 * @param {import("ethers").BigNumber} gasUsed
 * @param {import("ethers").BigNumber} gasLimit
 * @returns String
 *
 * @example
 * const gasUsed = 1000000;
 * const gasLimit = 10000000;
 * const percentage = getPercentage(gasUsed, gasLimit);
 * console.log(percentage); // 10%
 */
export function formatGasUsed(gasUsed, gasLimit) {
  const percentage = getPercentage(gasUsed.toNumber(), gasLimit.toNumber());
  return `${formatNumber(gasUsed.toNumber())} (${percentage}%)`;
}
