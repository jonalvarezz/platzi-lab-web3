import "./style.css";
import { ethers } from "ethers";

import { render } from "./src/helpers/render";
import { formatGasUsed } from "./src/helpers/format-gas-used";
import { formatGwei } from "./src/helpers/format-gwei";
import { formatTimestamp } from "./src/helpers/format-timestamp";
import { calcMedian } from "./src/helpers/calc-median";

import { hero } from "./src/ui/hero";
import { link } from "./src/ui/link";
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

  // Gas pagado mas alto
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
    title: "Gas pagado más alto",
  });

  // Gas pagado mas bajo
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
    title: "Gas pagado más bajo",
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
