import h from "hyperscript";

import { render } from "../helpers/render";
import { shortenAddress } from "../helpers/shorten-address";
import { isMetaMask } from "../helpers/is-metamask";

import * as network from "../models/network.model";
import { button } from "../views/button";

import { provider } from "../services/provider.service";

export class Header {
  network = null;

  account = null;

  constructor(element) {
    this.element = element;
  }

  async init() {
    this.network = await network.getModel();

    this.render();
  }

  render() {
    const hasAccounts = this.account !== null;

    const connectedTo = `Conectado a ${this.network.name} con ${
      isMetaMask ? "Metamask" : "Cloudflare"
    }`;

    const buttonEl = button({
      className: !isMetaMask || hasAccounts ? "hidden" : "",
      children: "Conectar Wallet",
      onclick: this.onLogin.bind(this),
    });

    const connectedEl = h("div", {}, connectedTo);
    const messageEl = h(
      "span",
      { className: hasAccounts ? "" : "hidden" },
      `Hola, ${this.account ? shortenAddress(this.account) : ""}`
    );

    render(this.element, [connectedEl, buttonEl, messageEl]);
  }

  async onLogin() {
    if (!isMetaMask) {
      return;
    }
    try {
      const accounts = await provider.send("eth_requestAccounts");
      this.account = accounts[0];
      this.render();
    } catch (error) {
      console.log("[ wallet ] Acceso denegado");
    }
  }
}
