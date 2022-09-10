/**
 *
 * Creates the markup of our contents of the block
 *
 * @param {Object} props
 * @param {string} props.name - The name of the content section
 * @param {string} props.heading - HTML string for the heading of the content section
 * @param {string} props.listItems - HTML string for the list items
 * @returns String
 */
export function contentBlock({
  name = "content",
  heading = "",
  listItems = "",
}) {
  return `
<section aria-labelledby="${name}" class="my-6">
  <div
    class="mx-auto items-center py-12 px-4 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8"
  >
    ${heading}

    <dl
      class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8 js-content"
    >
      ${listItems}
    </dl>
  </div>
</section>
`;
}
