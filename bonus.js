/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let p = strs[0];
  let words = "";

  for (let i = 1; i < strs.length; i++) {
    let k = 0;

    while (k < p.length && k < strs[i].length && p[k] === strs[i][k]) {
      words += p[k];
      k++;
    }

    p = words;
    words = "";
  }

  return p;
};
