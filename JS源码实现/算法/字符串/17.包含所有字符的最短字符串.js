// 输入两个字符串s和t, 请找出字符串s中包含字符串t所有字符的最短子字符串的长度
const s = 'ADDBCCECDDDABAD'
const t = 'ECAB'

// 思路：哈希表+ 双指针，先遍历t, 创建哈希表，对应字符的值为1，再遍历s，双指针，一开始都指向0，遍历的对应字符的值为-1，指针2++， 此时判断哈希表中所有的字符的值是否<0, 如是，则表示已找到包含所有字符的子字符串，再右移指针1，找到最短的子字符串，直到哈希表中所有的字符的值 >0,然后再继续右移指针2，继续遍历
// 双指针和16题类似

function fn1(s, t) {
    let minLen = 0
    const hash = {}
    for (let i = 0; i < t.length; i++) {
        if (hash[t.charAt(i)]) {
            hash[t.charAt(i)]++
        } else {
            hash[t.charAt(i)] = 1
        }
        if (hash[s.charAt(i)]) {
            hash[s.charAt(i)]--
        } else {
            hash[s.charAt(i)] = -1
        }
    }
    if (isLessOrZero(hash)) {
        return t.length
    }
    let j = 0
    for (let i = t.length; i < s.length; i++) {
        if (hash[s.charAt(i)]) {
            hash[s.charAt(i)]--
        } else {
            hash[s.charAt(i)] = -1
        }

        while (isLessOrZero(hash)) {
            // console.log(i, j)
            minLen = minLen === 0 ? i - j + 1 : Math.min(minLen, i - j + 1)
            hash[s.charAt(j)]++
            j++
        }
    }
    return minLen
}

function isLessOrZero(hash) {
    // console.log(hash)
    for (let v of Object.values(hash)) {
        if (v > 0) {
            return false
        }
    }
    return true
}
console.log(fn1(s, t))
