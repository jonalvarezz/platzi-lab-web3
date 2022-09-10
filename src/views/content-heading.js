/**
 *
 * Creates the markup of our content's heading
 *
 * @param {Object} props
 * @param {string | number} props.title
 * @param {string} props.description
 * @returns String
 */
export function contentHeading({ title = 0, description = "" }) {
  return `
<h2 class="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-7xl">
  ${title}
</h2>
<p class="mt-4 text-center text-gray-500 max-w-4xl mx-auto">
  ${description}
</p>
`;
}
