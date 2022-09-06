import "./style.css";
import { ethers } from "ethers";

import { render } from "./src/helpers/render";
import { formatGasUsed } from "./src/helpers/format-gas-used";
import { formatTimestamp } from "./src/helpers/format-timestamp";

import { hero } from "./src/ui/hero";
import { descriptionItem } from "./src/ui/description-item";

const process = async () => {
  const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.CloudflareProvider();

  const networkInfo = await provider.getNetwork();

  const blockNumber = await provider.getBlockNumber();
  const block = await provider.getBlock(blockNumber);

  // Hero
  // ---------------------------------
  render(
    ".js-hero",
    hero({
      block: blockNumber,
      network: networkInfo.name,
      networkEnsAddress: networkInfo.ensAddress,
    })
  );

  // Content
  // ---------------------------------
  const list = [
    { description: block.hash, title: "Hash" },
    { description: block.miner, title: "Minado por" },
    { description: block.nonce, title: "Nonce" },
    { description: block.parentHash, title: "Hash padre" },
    {
      description: formatGasUsed(block.gasUsed, block.gasLimit),
      title: "Gas usado",
    },
    { description: formatTimestamp(block.timestamp), title: "Timestamp" },
  ];

  // @todo: Optimize
  let allContent = "";
  list.forEach(({ title, description }) => {
    allContent += descriptionItem({ title, description });
  });
  render(".js-content", allContent);
};

process();
