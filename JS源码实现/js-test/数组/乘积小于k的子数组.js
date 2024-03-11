// // 输入一个由正整数组成的数组和一个正整数k， 请问数组中有多少个数字乘积小于k的连续子数组？
const arr = [10, 5, 2, 6]
const k = 100
// 有8个子数组，[10]、[5]、[2]、[6]、[10,5]、[5,2]、[2,6]、[5,2,6]

// 思路： 双指针方式， 前提是数组是正整数
function fn1(arr, k) {
    let p1 = 0
    let p2 = 0
    const res = []

    //
    for (let i = 0; i < arr.length; i++) {
        p1 = i
        p2 = i
        while (p1 <= p2 && p2 < arr.length) {
            const product = arr
                .slice(p1, p2 + 1)
                .reduce((acc, a) => (acc *= a), 1)
            if (product < k) {
                res.push(arr.slice(p1, p2 + 1))
                p2++
            } else {
                break
            }
        }
    }

    return res
}
console.log(fn1(arr, k))
