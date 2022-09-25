import { render } from "../helpers/render";
import { formatGwei } from "../helpers/format-gwei";
import { calcMedian } from "../helpers/calc-median";

import * as block from "../models/block.model";

import { contentBlock } from "../views/content-block";
import { contentHeading } from "../views/content-heading";
import { descriptionItem } from "../views/description-item";

export class Transactions {
  element = null;
  block = null;
  transactions = null;

  constructor(element) {
    this.element = element;
  }

  async init() {
    this.block = await block.getModel();
    this.transactions = await this.getSortedTransactions();

    this.render();
  }

  render() {
    const block = this.block;
    const transactions = this.transactions;

    const transactionList = [
      {
        title: "Número de transacciones",
        description: block.transactions.length,
      },
    ];

    // Precio del gas mas alto
    const highestPaidGas = transactions[0].gasPrice.toNumber();
    transactionList.push({
      description: formatGwei(highestPaidGas),
      title: "Precio del gas más alto",
    });

    // Precio del gas mas bajo
    const lowestPaidGas =
      transactions[transactions.length - 1].gasPrice.toNumber();
    transactionList.push({
      description: formatGwei(lowestPaidGas),
      title: "Precio del gas más bajo",
    });

    // Median gas price
    const paidGasMedian = calcMedian(transactions, {
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

    const transactionsBlock = contentBlock({
      name: "transactions",
      heading: contentHeading({
        title: "Transacciones",
        description: `Transacciones en el bloque ${block.number}`,
      }),
      listItems: transactionsContent,
    });

    render(this.element, transactionsBlock);
  }

  async getSortedTransactions() {
    const transactions = await block.getTransactions();

    return transactions.sort(
      (a, b) => b.gasPrice.toNumber() - a.gasPrice.toNumber()
    );
  }
}
