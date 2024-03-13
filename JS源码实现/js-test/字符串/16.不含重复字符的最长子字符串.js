//  输入一个字符串，求该字符串中不含重复字符串的最长子字符串的长度
const s = 'babccadef'

// 思路: 哈希 + 双指针，边扫码边创建哈希表，同时边判断是否有重复的（哈希值 >2）, 两个指针开始都指向第一个字符，指针2右移一位，判断指针1和指针2之间是否有重复字符，如没有，指针2继续右移，直到遇到重复的字符
// 然后指针1开始右移，判断是否有重复字符，如有，继续右移，直到没有了重复字符，然后又开始右移指针2，如此循环，直到遍历完成

function fn1(s) {
    let maxLen = 1
    const hash = {}
    let p1 = 0
    let p2 = 0

    for (let i = 0; i < s.length; i++) {
        p2 = i
        if (hash[s.charAt(i)]) {
            hash[s.charAt(i)]++
        } else {
            hash[s.charAt(i)] = 1
        }

        while (hasRepeat(hash)) {
            hash[s.charAt(p1)]--
            p1++
        }
        maxLen = Math.max(maxLen, p2 - p1 + 1)
    }

    return maxLen
}

function hasRepeat(hash) {
    console.log(hash)
    for (let v of Object.values(hash)) {
        if (v > 1) {
            return true
        }
    }
    return false
}
console.log(fn1(s))
