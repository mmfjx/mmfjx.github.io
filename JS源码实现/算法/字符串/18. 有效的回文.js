// 给定一个字符串，判断它是否回文，只考虑数字和字母，并忽略大小写
// const s = 'Was it a cat I saw?'
const s = 'race a car'

// 思路：回文是指左右对称的字符串，，双指针的方式，指针1指向第一个字符，指针2指向最后一个字符, 同时向中间移动

function fn1(s) {
    let i = 0
    let j = s.length - 1
    while (i <= j) {
        const char1 = s.charAt(i).toLowerCase()
        const char2 = s.charAt(j).toLowerCase()
        // console.log(char1, char2)
        if (!/[a-z0-9]/.test(char1)) {
            i++
        } else if (!/[a-z0-9]/.test(char2)) {
            j--
        } else if (char1 === char2) {
            i++
            j--
        } else {
            return false
        }
    }
    return true
}

console.log(fn1(s))
