import { ethers } from "ethers";

import { render } from "./src/helpers/render";
import { formatGasUsed } from "./src/helpers/format-gas-used";
import { formatGwei } from "./src/helpers/format-gwei";
import { formatTimestamp } from "./src/helpers/format-timestamp";
import { calcMedian } from "./src/helpers/calc-median";

import { contentBlock } from "./src/views/content-block";
import { contentHeading } from "./src/views/content-heading";
import { link } from "./src/views/link";
import { nav } from "./src/views/nav";
import { descriptionItem } from "./src/views/description-item";

import { Header } from "./src/controllers/header.controller";

const process = async () => {
  const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.CloudflareProvider();

  const maybeBlockNumber = window.location.pathname.split("/")[1];

  const blockToQuery = isNaN(parseInt(maybeBlockNumber, 10))
    ? "latest"
    : parseInt(maybeBlockNumber);

  let block = await provider.getBlock(blockToQuery);

  const blockNumber = block.number;

  const networkInfo = await provider.getNetwork();

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

  const heading = contentHeading({
    title: blockNumber,
    description: `Bloque de la cadena Ethereum en la red "${networkInfo.name}". Dirección ENS
  "${networkInfo.ensAddress}"`,
  });

  // content list
  const list = [
    { description: block.hash, title: "Hash" },
    {
      description: link({
        children: block.miner,
        href: `https://etherscan.io/address/${block.miner}`,
      }),
      title: "Minado por",
    },
    { description: block.nonce, title: "Nonce" },
    { description: block.parentHash, title: "Hash padre" },
    {
      description: formatGasUsed(block.gasUsed, block.gasLimit),
      title: "Gas usado",
    },
    { description: formatTimestamp(block.timestamp), title: "Timestamp" },
  ];

  const blockContent = list
    .map(({ title, description }) => descriptionItem({ title, description }))
    .join("");

  const blockInfo = contentBlock({
    name: "block-info",
    heading,
    listItems: blockContent,
  });

  render(".js--block-info", blockInfo);

  // ---------------------------------
  // Content block: Transactions
  // ---------------------------------

  let numberOfTransactions = 3; // Limit it to 10 transactions
  const transactionPromises = block.transactions
    .filter((_, index) => index < numberOfTransactions)
    .map((tx) => provider.getTransaction(tx));

  const resolvedTransactions = await Promise.all(transactionPromises);

  const transactionList = [
    {
      title: "Número de transacciones",
      description: block.transactions.length,
    },
  ];

  // Precio del gas mas alto
  const transactionsSortedByGasPrice = resolvedTransactions.sort(
    (a, b) => b.gasPrice.toNumber() - a.gasPrice.toNumber()
  );
  const highestPaidGas = transactionsSortedByGasPrice[0].gasPrice.toNumber();
  transactionList.push({
    description: formatGwei(highestPaidGas),
    title: "Precio del gas más alto",
  });

  // Precio del gas mas bajo
  const lowestPaidGas =
    transactionsSortedByGasPrice[
      transactionsSortedByGasPrice.length - 1
    ].gasPrice.toNumber();
  transactionList.push({
    description: formatGwei(lowestPaidGas),
    title: "Precio del gas más bajo",
  });

  // Median gas price
  const paidGasMedian = calcMedian(transactionsSortedByGasPrice, {
    sorted: true,
    valueResolver: (item) => item.gasPrice.toNumber(),
  });
  transactionList.push({
    description: formatGwei(paidGasMedian),
    title: "Media",
  });

  const transactionsContent = transactionList
    .map(({ title, description }) => descriptionItem({ title, description }))
    .join("");

  const transactions = contentBlock({
    name: "transactions",
    heading: contentHeading({
      title: "Transacciones",
      description: `Transacciones en el bloque ${blockNumber}`,
    }),
    listItems: transactionsContent,
  });

  render(".js--block-transactions", transactions);

  const elapsedTime = performance.now() - startTime;
  console.log(`[ app ] Rendered in ${elapsedTime}ms`);
};

process();
