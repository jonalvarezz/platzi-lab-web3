/**
 *
 * Creates the markup of our hero component
 *
 * @param {Object} props
 * @param {string | number} props.block - Block number
 * @param {string} props.network - The network's name
 * @param {string} props.networkEnsAddress - The network's ENS address
 * @returns String
 */
export function hero({ block = 0, network = "", networkEnsAddress = "" }) {
  return `
<h2 class="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-7xl">
  ${block}
</h2>
<p class="mt-4 text-center text-gray-500 max-w-4xl mx-auto">
  Bloque de la cadena Ethereum en la red "${network}". Dirección ENS
  "${networkEnsAddress}"
</p>
`;
}
