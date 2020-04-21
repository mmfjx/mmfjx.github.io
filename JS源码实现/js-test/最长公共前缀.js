// https://leetcode-cn.com/problems/longest-common-prefix/
var longestCommonPrefix = function(strs) {
    if (!strs || strs.length) return '';
    if (strs.length ===1) return strs[0];

    // 解法一，把第一个作为比较标准
    let commonStr = '';
    let strFir = strs[0];
    for (let i = 0; i < strFir.length; i++) {
        commonStr += strFir.chatAt(i);
        for (let j = 1; j < strs.length; j++) {
            if (strFir.chatAt(i) !== strs[j].chatAt(i)) {
                return commonStr.slice(0, i);
            }
        }
    }

    // 解法二， 先字符串排序，最大的字符串和最小的字符串有相同前缀，那中间的字符串肯定也有相同的前缀

    strs.sort();
    let minStr = strs[0];
    let maxStr = strs[strs.length - 1];
    for (let i = 0; i< minStr.length; i++) {
        if (minStr.chatAt(i) !== maxStr.chatAt(i)) {
            return minStr.slice(0, i);
        }
    }
    return minStr;


}