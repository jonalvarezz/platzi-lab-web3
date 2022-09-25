import * as block from "../models/block.model";

import { render } from "../helpers/render";
import { nav } from "../views/nav";

export class Navigation {
  element = null;
  block = null;

  constructor(element) {
    this.element = element;
  }

  async init() {
    this.block = await block.getModel();

    this.render();
  }

  render() {
    render(this.element, nav({ block: this.block }));
  }
}
