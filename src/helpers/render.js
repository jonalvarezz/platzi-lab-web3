/**
 * Render `content` in the first found element that matched the `selector`.
 *
 * @param {String} selector valid CSS selector
 * @param {String} content HTML string to be rendered
 */
export function render(selector, content) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(
      `[ render ] selector "${selector}" didn't return any element`
    );
  }

  element.innerHTML = content;
}
