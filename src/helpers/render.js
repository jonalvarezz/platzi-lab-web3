/**
 * Render `content` in the first found element that matched the `selector`.
 *
 * @param {string} selector - valid CSS selector
 * @param {string} content - HTML string to be rendered
 */
export function render(selector, content) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(
      `[ render ] selector "${selector}" didn't return any element`
    );
  }

  element.innerHTML = content;

  return element;
}
