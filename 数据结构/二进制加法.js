// 输入为两个二进制的字符串，计算它们的和，以二级制字符串输出
// 思路：二进制字符右侧对齐再相加

function addBinary(a, b) {
    const aLen = a.length
    const bLen = b.length
    let res = []
    let up = 0

    for (let i = 1; i <= Math.max(aLen, bLen); i++) {
        const s1 = a.charAt(aLen - i) === '1' ? 1 : 0
        const s2 = b.charAt(bLen - i) === '1' ? 1 : 0
        console.log(s1, s2)
        if (s1 + s2 + up === 0) {
            res.push(0)
            up = 0
        } else if (s1 + s2 + up === 1) {
            res.push(1)
            up = 0
        } else if (s1 + s2 + up === 2) {
            res.push(0)
            up = 1
        } else if (s1 + s2 + up === 3) {
            res.push(1)
            up = 1
        }
        console.log(res, up)
    }
    if (up) {
        res.push(up)
    }
    return res.reverse().join('')
}

console.log(addBinary('1111100', '011'))
