/**
 * Render `content` in the first found element that matched the `selector`.
 *
 * @param {string} selector - valid CSS selector
 * @param {string | HTMLElement | Array<HTMLElement>} content - HTML to be rendered
 */
export function render(selector, content) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(
      `[ render ] selector "${selector}" didn't return any element`
    );
  }

  if (typeof content === "string") {
    element.innerHTML = content;
  }

  if (Array.isArray(content)) {
    element.innerHTML = "";
    element.append(...content);
  }

  if (content instanceof HTMLElement) {
    element.innerHTML = "";
    element.append(content);
  }

  return element;
}
