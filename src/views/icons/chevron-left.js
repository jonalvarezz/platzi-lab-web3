/**
 *
 * Icon: chevron-left (<)
 *
 * @see  https://heroicons.com
 *
 * @param Properties
 * @param Properties.className `string` The class name of the icon
 * @returns String
 */
export function chevronLeft({ className = "h-5 w-5 pr-1" } = {}) {
  return `
<svg
  class="${className}"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M15.75 19.5L8.25 12l7.5-7.5"
  />
</svg>
`;
}
