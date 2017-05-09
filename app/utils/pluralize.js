/**
 * Pluralize number
 * @param {number} num
 * @param {array} titles
 * @returns {string}
 */
export default function pluralize(num, titles) {
  const number = Math.abs(num);
  const cases = [2, 0, 1, 1, 1, 2];

  if (number % 100 > 4 && number % 100 < 20) {
    return titles[2];
  }

  const cCase = cases[(number % 10 < 5) ? number % 10 : 5];
  return titles[cCase];
}
