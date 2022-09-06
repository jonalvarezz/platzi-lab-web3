/**
 *
 * Creates the markup of our description item
 *
 * @param Properties
 * @param Properties.title `string` The title of the item
 * @param Properties.description `string` The description of the item
 * @returns String
 */
export function descriptionItem({ title = "", description = "" }) {
  return `
<div class="border-t border-gray-200 pt-4">
  <dt class="font-medium text-gray-900">${title}</dt>
  <dd class="mt-2 text-sm text-gray-500 truncate">
    ${description}
  </dd>
</div>
`;
}
