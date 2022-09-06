/**
 *
 * @param {String} timestamp
 * @return String
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}
