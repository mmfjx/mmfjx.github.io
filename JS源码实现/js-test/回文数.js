// 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。输入: 121
// 输出: true

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