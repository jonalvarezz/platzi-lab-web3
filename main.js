import { Header } from "./src/controllers/header.controller";
import { Block } from "./src/controllers/block.controller";
import { Navigation } from "./src/controllers/navigation.controller";
import { Transactions } from "./src/controllers/transactions.controller";

const process = async () => {
  const startTime = performance.now();

  // ---------------------------------
  // Header
  // ---------------------------------
  const header = new Header(".js--header");
  await header.init();

  // ---------------------------------
  // Navigation
  // ---------------------------------
  const navigation = new Navigation(".js--navigation");
  await navigation.init();

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
