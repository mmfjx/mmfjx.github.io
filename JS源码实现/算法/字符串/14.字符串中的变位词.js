// 输入字符串s1和s2，如何判断字符串s2中是否包含s1的某个变位词？假设两个字符串中只包含英文小写字母
// 思路：变位词是指字符顺序变了，哈希表+双指针的方式，因只包含英文小写字母，哈希表可以把字符作为key，出现的次数作为值，出现次数+1。
// 这段代码的作用是判断字符串s2中是否包含字符串s1的某个变位词。

// 代码首先判断s2的长度是否小于s1的长度，如果是，则直接返回false，因为s2不可能包含s1的变位词。

// 接下来，代码使用一个哈表hash希现的来记录字符出次数。首先遍历字符串s1，将s1中的每个字符作为哈希表的key，出现的次数作为值。如果字符已经在哈希表中存在，则将对应的值加1；如果字符不在哈希表中，则将其添加到哈希表，并将值设为1。

// 同时，代码也遍历字符串s2，对于s2中的每个字符，如果字符在哈希表中存在，则将对应的值减1；如果字符不在哈希表中，则将其添加到哈表，并希将值设为-1。

// 接下来，代码调用allZero函数来判断哈希表中的所有值是否都为0，如果是，则表示s2中已经包含了s1的所有字符，即存在变位词，返回true。

// 如果哈希表中的值不全为0，则进环。循环从s1的入循长度开始，遍历s2的剩余部分。在每次循环中，代码通过两个指针p1和p2来指向s2中的字符。p1指向窗当前口的左边界，p2指向当前窗口的右边界，且p2和p1刚好相差s1的长度。

// 在每次循环中，代码先将p1指向的字符从哈希表中移出，即将对应的值加1。然后判断p2指向的字符是否在哈如果，希表中存在存在，则将对应的值减1；如果不存在，则将其添加到哈希表，并将值设为1。

// 最后，代码再次调用allZero函数来判断哈希表中的所有值是否都为0。如果是，则表示s2中存在s1的变位词，返回true。

// 如果循环结束后仍未找到变位词，则返回false。

// 总结来说这，段代码通过哈希表使用和双指针的方式来判断字符串s2中是否包含字符串s1的某个变位词。
// 总之，原则是对于移入的字符，哈希值-1，对于移除的字符哈希值+1

const s1 = 'acf'
const s2 = 'ddgcaf'
function fn1(s1, s2) {
    if (s2.length < s1.length) {
        return false
    }
    const hash = {}
    for (let i = 0; i < s1.length; i++) {
        if (hash[s1.charAt(i)]) {
            hash[s1.charAt(i)]++
        } else {
            hash[s1.charAt(i)] = 1
        }

        if (hash[s2.charAt(i)]) {
            hash[s2.charAt(i)]--
        } else {
            hash[s2.charAt(i)] = -1
        }
    }
    if (allZero(hash)) {
        return true
    }
    for (let i = s1.length; i < s2.length; i++) {
        let p1 = i - s1.length
        let p2 = i // p2和p1刚好是s1的长度
        hash[s2.charAt(p1)]++ // 移出

        if (hash[s2.charAt(p2)]) {
            hash[s2.charAt(p2)]--
        } else {
            hash[s2.charAt(p2)] = 1 // 移入
        }
        if (allZero(hash)) {
            return true
        }
    }
    return false
}

function allZero(hash) {
    console.log(hash)
    for (let v of Object.values(hash)) {
        if (v !== 0) {
            return false
        }
    }
    return true
}

console.log(fn1(s1, s2))
