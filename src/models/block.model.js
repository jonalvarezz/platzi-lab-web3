import { provider } from "../services/provider.service";

let block = null;

/**
 *
 * @param {number | BlockTag} blockNumber block number to fetch
 * @returns {Promise<Block>} block
 */
export const getModel = async (blockNumber = "latest") => {
  if (block) {
    return block;
  }

  const blockToQuery = isNaN(parseInt(blockNumber, 10))
    ? "latest"
    : parseInt(blockNumber);

  block = await provider.getBlock(blockToQuery);

  return block;
};
