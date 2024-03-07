// 一个字符串数组words，请计算不包含相同字符的两个字符串words[i]和words[j]长度乘积的最大值。如果所有字符串都包含至少一个相同的字符，那么返回0，假字符串中只包含大小写字母


// 思路1：用一个二维数据组存储每个字符串的哈希表，再遍历二维数组，找出不包含相同字符的两个字符串，并计算乘积
function fn1(words) {
    // 二维数组
    let flags = [];
    for (let i = 0; i < words.length; i++) {
        flags[i] = []
        for (let char of Array.from(words[i])) {
            flags[i][char.charCodeAt() - 'a'.charCodeAt()] = true
        }
    }
    let res = 0;
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            let k = 0
            for (; k < 26; k++) {
                if (flags[i][k] && flags[j][k]) {
                    break;
                }
            }
            if (k === 26) {
                console.log(words[i], words[j])
                const temp = words[i].length * words[j].length;
                res = Math.max(res, temp);
            }

        }
    }
    return res;
}

// console.log(fn1(['abcw', 'foo', 'bar', 'fxyz', 'abcdef']))


// 思路2： 用二进制表示每个字符串包含的字符，最右侧为‘a’, 存在1，不存在0，依次类推，构成一维二进制数组，再遍历二进制数组，相互做&运算，为0的是不包含相同字符的两个字符串，并计算乘积
function fn2(words) {
    // 生成一维二进制数组
    let flags = []
    for (let i = 0; i < words.length; i++) {
        for (let char of Array.from(words[i])) {
            flags[i] = flags[i] | 1 << (char.charCodeAt() - 'a'.charCodeAt()) // | 用来合并
        }
        console.log(flags[i])
    }

    let res = 0;
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            if (flags[i] & flags[j] === 0) {
                console.log(words[i], words[j])
                const temp = words[i].length * words[j].length;
                res = Math.max(res, temp);
            }
        }

    }

    return res;
}
console.log(fn2(['abcw', 'foo', 'bar', 'fxyz', 'abcdef']))