import { Header } from "./src/controllers/header.controller";
import { Block } from "./src/controllers/block.controller";
import { Navigation } from "./src/controllers/navigation.controller";
import { Transactions } from "./src/controllers/transactions.controller";

import { App } from "./src/controllers/app.controller";

const process = async () => {
  const startTime = performance.now();

  const app = new App({
    // ---------------------------------
    // Header
    // ---------------------------------
    ".js--header": Header,

    // ---------------------------------
    // Navigation
    // ---------------------------------
    ".js--navigation": Navigation,

    // ---------------------------------
    // Content block: Block info
    // ---------------------------------

    ".js--block-info": Block,

    // ---------------------------------
    // Content block: Transactions
    // ---------------------------------

    ".js--block-transactions": Transactions,
  });

  await app.init();

  const elapsedTime = performance.now() - startTime;
  console.log(`[ app ] Rendered in ${elapsedTime}ms`);
};

process();
