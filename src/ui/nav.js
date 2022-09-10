import { chevronLeft } from "./icons/chevron-left";

/**
 *
 * Creates the markup of our navigation component
 *
 * @param {Object} props
 * @param {import("ethers").ethers.providers.Block} props.block - Block object
 * @returns string
 */
export function nav({ block }) {
  return `
${navItem({
  href: "/fixme",
  children: `${chevronLeft()}
  <span class="">Bloque Anterior</span>`,
})}

${navItem({
  href: "/",
  children: `<span class="">Último</span>`,
})}
`;
}

/**
 *
 * Creates the markup of our navigation's item component
 *
 * @param {Object} props
 * @param {string} props.href - The link's href
 * @param {string} props.children - The content of the link
 * @returns string
 */
function navItem({ href = "", children = "" } = {}) {
  return `
<a
  href="${href}"
  class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7 flex items-center"
>
  ${children}
</a>
`;
}
