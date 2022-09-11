import { ethers } from "ethers";

import { render } from "./src/helpers/render";
import { shortenAddress } from "./src/helpers/shorten-address";
import { formatGasUsed } from "./src/helpers/format-gas-used";
import { formatGwei } from "./src/helpers/format-gwei";
import { formatTimestamp } from "./src/helpers/format-timestamp";
import { calcMedian } from "./src/helpers/calc-median";

import { contentBlock } from "./src/views/content-block";
import { contentHeading } from "./src/views/content-heading";
import { link } from "./src/views/link";
import { button } from "./src/views/button";
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

  // ---------------------------------
  // Header
  // ---------------------------------
  const isMetaMask = window.ethereum?.isMetaMask;
  const connectedTo = `Conectado a ${networkInfo.name} con ${
    isMetaMask ? "Metamask" : "Cloudflare"
  }`;
  const canLogin = isMetaMask;
  const buttonStr = button({
    className: !canLogin ? "hidden" : "",
    children: "Conectar Wallet",
  });

  const header = render(
    ".js--header",
    `<div>${connectedTo}</div>
${buttonStr}
<span class="hidden"></span>`
  );

  const loginBtn = header.querySelector("button");
  loginBtn.addEventListener("click", async () => {
    if (!isMetaMask) {
      return;
    }
    try {
      const accounts = await provider.send("eth_requestAccounts");
      loginBtn.classList.add("hidden");
      const span = header.querySelector("span");
      span.classList.remove("hidden");
      span.innerText = `Hola, ${shortenAddress(accounts[0])}`;
    } catch (error) {
      console.log("[ wallet ] Acceso denegado");
    }
  });

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

  let blockContent = "";
  list.forEach(({ title, description }) => {
    blockContent += descriptionItem({ title, description });
  });

  const blockInfo = contentBlock({
    name: "block-info",
    heading,
    listItems: blockContent,
  });

  render(".js--block-info", blockInfo);

  // ---------------------------------
  // Content block: Transactions
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

  let transactionsContent = "";
  transactionList.forEach(({ title, description }) => {
    transactionsContent += descriptionItem({ title, description });
  });

  const transactions = contentBlock({
    name: "transactions",
    heading: contentHeading({
      title: "Transacciones",
      description: `Transacciones en el bloque ${blockNumber}`,
    }),
    listItems: transactionsContent,
  });

  render(".js--block-transactions", transactions);
};

process();
