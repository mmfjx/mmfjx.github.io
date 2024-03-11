// 输入一个正整数组成的数组和一个正整数k, 请问数组中和大于或等于k的连续子数组的最短长度是多少？若是不存在，则返回0
const arr = [5, 1, 4, 3]
const k = 7

// 思路： 双指针的方式，因求的是连续子数组的最短长度，因此不需要排序，提前数组是正整数
function fn1(arr, k) {
    let len = 0
    for (let i = 0; i < arr.length; i++) {
        let p1 = i
        let p2 = i
        while (p2 < arr.length && p1 <= p2) {
            const sum = arr
                .slice(p1, p2 + 1)
                .reduce((acc, curr) => acc + curr, 0)
            if (sum >= k) {
                const temp = p2 - p1 + 1
                if (!len) {
                    len = temp
                } else {
                    len = Math.min(temp, len)
                }
                break
            } else if (sum < k) {
                p2++
            }
        }
    }

    return len
}
console.log(fn1(arr, k))
