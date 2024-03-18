// 输入字符串s1和s2, 如何找出字符串s2的所有变位词在s1中的起始下标，假设只包含英文小写字母
const s1 = 'cbadabacg'
const s2 = 'abc'
// 同题14一样的思路，哈希表+ 双指针

function fn1(s1, s2) {
    const tags = []
    if (s1.length < s2.length) {
        return tags
    }
    const hash = {}
    for (let i = 0; i < s2.length; i++) {
        if (hash[s2.charAt(i)]) {
            hash[s2.charAt(i)]++
        } else {
            hash[s2.charAt(i)] = 1
        }

        if (hash[s1.charAt(i)]) {
            hash[s1.charAt(i)]--
        } else {
            hash[s1.charAt(i)] = -1
        }
    }
    if (allZero(hash)) {
        tags.push(0)
    }

    for (let i = s2.length; i < s1.length; i++) {
        const p1 = i - s2.length
        const p2 = i
        hash[s1.charAt(p1)]++
        if (hash[s1.charAt(p2)]) {
            hash[s1.charAt(p2)]--
        } else {
            hash[s1.charAt(p2)] = -1
        }
        if (allZero(hash)) {
            tags.push(p1 + 1)
        }
    }
    return tags
}

function allZero(hash) {
    for (let v of Object.values(hash)) {
        if (v !== 0) {
            return false
        }
    }
    return true
}

console.log(fn1(s1, s2))
