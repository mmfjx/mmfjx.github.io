// 有一门外形语言，它的字母表刚好包含所有的英文小写字母，只是字母表的顺序不同，给定一组单词和字母表顺序，请判断这些单词是否按照字母表属性排序，
const order = 'zyxwvutsrqponmlkjihgfedcba'
const words = ['offer', 'is', 'coming', 'addd'] // 应该输出true

// 思路： 根据字母表顺序创建哈希表，键位字母，值为对应的下标，然后对words遍历挨个字母比较

function wordCompare(word1, word2, map) {
    for (let j = 0; j < word1.length; j++) {
        if (word2.charAt(j)) {
            if (map.get(word1.charAt(j)) < map.get(word2.charAt(j))) {
                return true
            } else if (map.get(word1.charAt(j)) > map.get(word2.charAt(j))) {
                return false
            }
        } else {
            return false
        }
    }
    return true
}

function fn1(words, order) {
    const map = new Map()
    for (let i = 0; i < order.length; i++) {
        map.set(order.charAt(i), i)
    }
    for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i]
        const word2 = words[i + 1]
        if (!wordCompare(word1, word2, map)) {
            return false
        }
    }
    return true
}

console.log(fn1(words, order))
