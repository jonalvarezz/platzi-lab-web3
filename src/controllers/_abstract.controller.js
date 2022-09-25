export class Controller {
  /**
   * @type {string} dom selector for the container
   */
  element = null;

  /**
   * @param {string} container's dom selector
   */
  constructor(element = null) {
    this.element = element;
  }

  /**
   * Render the view
   */
  render() {
    throw new Error("Not implemented");
  }

  /**
   * Initialize the controller
   */
  async init() {
    throw new Error("Not implemented");
  }
}
