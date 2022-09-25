import * as block from "../models/block.model";

import { render } from "../helpers/render";
import { Controller } from "./_abstract.controller";
import { nav } from "../views/nav";

export class Navigation extends Controller {
  block = null;

  async init() {
    this.block = await block.getModel();

    this.render();
  }

  render() {
    render(this.element, nav({ block: this.block }));
  }
}
