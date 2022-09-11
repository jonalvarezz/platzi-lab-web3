const variants = {
  small: "text-sm px-2 py-1 rounded",
  medium: "text-base px-3 py-2 rounded-md",
};

/**
 *
 * Creates the markup of a button
 *
 * @param {Object} props
 * @param {string} props.variant - The button's variant. Can be "small" or "medium"
 * @param {string} props.className - The button's additional CSS classes
 * @param {string} props.children - The content of the link
 * @returns String
 */
export function button({
  variant = "small",
  className = "",
  children = "",
} = {}) {
  const classStr = variants[variant] || variants.medium;

  return `
<button class="${classStr} ${className} bg-slate-100 hover:text-gray-900" type="button">
  ${children}
</button>
`;
}
