export class App {
  /**
   * @type {Object.<string, Controller>} controllers
   */
  controllers = {};

  /**
   * @param {Object.<string, Controller>} controllers
   * @example
   * const app = new App({
   *  "#root": MyController,
   * });
   */
  constructor(controllers) {
    this.controllers = controllers;
    this.init();
  }

  async init() {
    const promises = Object.entries(this.controllers).map(
      ([selector, Controller]) => {
        const controller = new Controller(selector);
        return controller.init();
      }
    );

    return Promise.all(promises);
  }
}
