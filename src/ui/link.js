/**
 *
 * Creates the markup of a link - a tag
 *
 * @param Properties
 * @param Properties.href {String}
 * @param Properties.external {Boolean} Whether the link is external or not
 * @param Properties.children {String} The content of the link
 * @returns String
 */
export function link({ href = "", external = true, children = "" }) {
  const target = external ? "target='_blank' rel='noopener noreferrer'" : "";

  return `
<a class="hover:text-gray-900 underline" href="${href}" ${target}>
  ${children}
</a>
`;
}
