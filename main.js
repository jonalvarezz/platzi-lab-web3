import { ethers } from "ethers";

import { render } from "./src/helpers/render";
import { nav } from "./src/views/nav";

import { Header } from "./src/controllers/header.controller";
import { Block } from "./src/controllers/block.controller";
import { Transactions } from "./src/controllers/transactions.controller";

const process = async () => {
  const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.CloudflareProvider();

  const maybeBlockNumber = window.location.pathname.split("/")[1];

  const blockToQuery = isNaN(parseInt(maybeBlockNumber, 10))
    ? "latest"
    : parseInt(maybeBlockNumber);

  let block = await provider.getBlock(blockToQuery);

  const startTime = performance.now();

  // ---------------------------------
  // Header
  // ---------------------------------
  const header = new Header(".js--header");
  await header.init();

  // ---------------------------------
  // Navigation
  // ---------------------------------
  render(".js--navigation", nav({ block }));

  // ---------------------------------
  // Content block: Block info
  // ---------------------------------

  const blockContent = new Block(".js--block-info");
  await blockContent.init();

  // ---------------------------------
  // Content block: Transactions
  // ---------------------------------

  const transactions = new Transactions(".js--block-transactions");
  await transactions.init();

  const elapsedTime = performance.now() - startTime;
  console.log(`[ app ] Rendered in ${elapsedTime}ms`);
};

process();
