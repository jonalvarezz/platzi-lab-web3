import { render } from "../helpers/render";
import { formatGasUsed } from "../helpers/format-gas-used";
import { formatTimestamp } from "../helpers/format-timestamp";

import { Controller } from "./_abstract.controller";

import * as network from "../models/network.model";
import * as block from "../models/block.model";

import { contentBlock } from "../views/content-block";
import { contentHeading } from "../views/content-heading";
import { link } from "../views/link";
import { descriptionItem } from "../views/description-item";

export class Block extends Controller {
  network = null;
  block = null;

  async init() {
    this.network = await network.getModel();
    this.block = await block.getModel();

    this.render();
  }

  render() {
    const block = this.block;
    const network = this.network;

    const heading = contentHeading({
      title: block.number,
      description: `Bloque de la cadena Ethereum en la red "${network.name}". Dirección ENS
  "${network.ensAddress}"`,
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

    render(this.element, blockInfo);
  }
}
