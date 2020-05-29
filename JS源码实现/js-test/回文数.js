// 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。输入: 121
// 输出: true
// https://leetcode-cn.com/problems/palindrome-number/solution/hui-wen-shu-by-leetcode/
var isPalindrome = function(x) {
    if (!x) return true;
    let str = x.toString();
    if (str.length === 1) return true;
    let half = Math.floor(str.length - 1) / 2
    let isEven = str.length % 2 === 0;

    for(let i = 0; i <= half; i++) {
        let left = half - i;
        let right = isEven ? half + i + 1 : half + i; // 保证左右两边相等
        if (str.charAt(left) !== str.charAt(right)) {
            return false;
        }
    }
    return true;

}


// 解法二：

var isPalindrome = function(x) {
    // 负数、和末尾是0, 都不是回文
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

    let rev = 0;

    // 翻转一半，每次通过对10求余，获取到最后一个数字
    while (x > rev) {
        rev = rev * 10 + x % 10;
        x = Math.floor(x / 10);
    }

    return x === rev || x === Math.floor(rev / 10)

}