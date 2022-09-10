/**
 *
 * @param {string} timestamp
 * @return string
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}
