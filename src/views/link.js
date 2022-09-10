/**
 *
 * Creates the markup of a link - a tag
 *
 * @param {Object} props
 * @param {string} props.href - The link's href
 * @param {boolean} props.external - Whether the link is external or not
 * @param {string} props.children - The content of the link
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
