// 给定一个字符串，请判断如果最多从字符中删除一个字符能不能得到一个回文字符串
const s = 'abgca'
// 思路： 同题18一样，双指针，从两端开始往中间移动，如遇到不同的字符，两端都尝试删除后再比较
function fn1(s) {
    let i = 0
    let j = s.length - 1
    while (i <= j) {
        let char1 = s.charAt(i)
        let char2 = s.charAt(j)
        if (char1 !== char2) {
            i++
            char1 = s.charAt(i)
            if (char1 !== char2) {
                i++
                char1 = s.charAt(i)
                j--
                char2 = s.charAt(j)
                if (char1 !== char2) {
                    return false
                }
            }
        } else {
            i++
            j--
        }
    }
    return true
}

function fn2(s) {
    let i = 0
    let j = s.length - 1
    for (; i < s.length / 2; i++, j--) {
        if (s.charAt(i) !== s.charAt(j)) {
            break
        }
    }
    return (
        i === s.length / 2 ||
        isPalindrome(s, i + 1, j) ||
        isPalindrome(s, i, j - 1)
    )
}

function isPalindrome(s, start, end) {
    while (start < end) {
        if (s.charAt(start) !== s.charAt(end)) {
            break
        }
        start++
        end++
    }
    return start >= end
}

console.log(fn1(s))

console.log(fn2(s))
