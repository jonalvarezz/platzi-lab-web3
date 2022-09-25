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

    const transactionList = [
      {
        title: "Número de transacciones",
        description: block.transactions.length,
      },
      {
        description: this.getHighestPaidGas(),
        title: "Precio del gas más alto",
      },
      {
        description: this.getLowestPaidGas(),
        title: "Precio del gas más bajo",
      },
      {
        description: this.getMedianPaidGas(),
        title: "Media",
      },
    ];

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

  getHighestPaidGas() {
    const highestPaidGas = this.transactions[0].gasPrice.toNumber();

    return formatGwei(highestPaidGas);
  }

  getLowestPaidGas() {
    const lowestPaidGas =
      this.transactions[this.transactions.length - 1].gasPrice.toNumber();

    return formatGwei(lowestPaidGas);
  }

  getMedianPaidGas() {
    const paidGasMedian = calcMedian(this.transactions, {
      sorted: true,
      valueResolver: (item) => item.gasPrice.toNumber(),
    });

    return formatGwei(paidGasMedian);
  }
}
