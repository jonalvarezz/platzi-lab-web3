import "./style.css";
import { ethers } from "ethers";

import { render } from "./src/helpers/render";
import { formatGasUsed } from "./src/helpers/format-gas-used";
import { formatGwei } from "./src/helpers/format-gwei";
import { formatTimestamp } from "./src/helpers/format-timestamp";
import { calcMedian } from "./src/helpers/calc-median";

import { hero } from "./src/views/hero";
import { link } from "./src/views/link";
import { nav } from "./src/views/nav";
import { descriptionItem } from "./src/views/description-item";

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

  // Navigation
  // ---------------------------------
  render(".js-navigation", nav({ block }));

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

  // @todo: Optimize
  let allContent = "";
  list.forEach(({ title, description }) => {
    allContent += descriptionItem({ title, description });
  });
  render(".js-content", allContent);

  // Transactions
  // ---------------------------------

  const transactionList = [
    {
      title: "Número de transacciones",
      description: block.transactions.length,
    },
  ];

  // Precio del gas mas alto
  let highestPaidGas = 0;
  let numberOfTransactions = 3; // Limit it to 10 transactions
  for (const transaction of block.transactions) {
    if (numberOfTransactions === 0) {
      break;
    }
    const transactionInfo = await provider.getTransaction(transaction);

    if (transactionInfo.gasPrice.toNumber() > highestPaidGas) {
      highestPaidGas = transactionInfo.gasPrice.toNumber();
    }

    numberOfTransactions--;
  }
  transactionList.push({
    description: formatGwei(highestPaidGas),
    title: "Precio del gas más alto",
  });

  // Precio del gas mas bajo
  let lowestPaidGas = block.gasLimit.toNumber();
  numberOfTransactions = 3; // Limit it to 10 transactions
  for (const transaction of block.transactions) {
    if (numberOfTransactions === 0) {
      break;
    }
    const transactionInfo = await provider.getTransaction(transaction);

    if (
      lowestPaidGas > 0 &&
      transactionInfo.gasPrice.toNumber() < lowestPaidGas
    ) {
      lowestPaidGas = transactionInfo.gasPrice.toNumber();
    }

    numberOfTransactions--;
  }
  transactionList.push({
    description: formatGwei(lowestPaidGas),
    title: "Precio del gas más bajo",
  });

  // Median gas price
  numberOfTransactions = 3; // Limit it to 10 transactions
  const gasPricesList = [];
  for (const transaction of block.transactions) {
    if (numberOfTransactions === 0) {
      break;
    }
    const transactionInfo = await provider.getTransaction(transaction);
    gasPricesList.push(transactionInfo.gasPrice.toNumber());

    numberOfTransactions--;
  }
  const paidGasMedian = calcMedian(gasPricesList);
  transactionList.push({
    description: formatGwei(paidGasMedian),
    title: "Media",
  });

  // @todo: Optimize
  let transactionsContent = "";
  transactionList.forEach(({ title, description }) => {
    transactionsContent += descriptionItem({ title, description });
  });
  render(".js-tx-content", transactionsContent);
};

process();
