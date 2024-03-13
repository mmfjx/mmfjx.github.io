// 给定一个字符串，请问该字符串中有多少个回文连续子字符串
const s1 = 'abc' // a ,b,c 3个
const s2 = 'aaa' // a ,a,a,aa,aa,aaa 6个
// 思路： 双指针，从中间往两边对比

function fn1(s) {
    if (!s) {
        return 0
    }
    let count = 0
    for (let i = 0; i < s.length; i++) {
        count += countPalindrome(s, i, i) // 奇数 aba
        count += countPalindrome(s, i, i + 1) // 偶数 abba
    }
    return count
}

/*
countPalindrome函数的作用是计算以给定起始和结束索引为中心的回文连续子字符串的数量。该函数使用了双指针的方法，从中间向两边进行对比。具体的实现逻辑如下：
首先，定义一个变量count，用于记录回文连续子字符串的数量，初始值为0。
然后，使用一个循环，判断起始索引start是否大于等于0且结束索引end是否小于字符串s的长度，并且判断起始索引和结束索引对应的字符是否相等。
如果满足上述条件，说明找到了一个回文连续子字符串，将count加1，并将起始索引start减1，结束索引end加1，继续向两边扩展寻找更长的回文连续子字符串。
如果不满足上述条件，说明已经找到了最长的回文连续子字符串，退出循环。
最后，返回计数count。
*/
function countPalindrome(s, start, end) {
    let count = 0
    while (start >= 0 && end < s.length && s.charAt(start) === s.charAt(end)) {
        count++
        start--
        end++
    }
    return count
}

console.log(fn1(s2))
