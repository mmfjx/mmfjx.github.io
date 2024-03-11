// 输入一个整数数组和一个整数k，请问数组中有多少个数字之和是k的连续子数组？例如 [1,1,1] ,k为2，有2个连续子数组之和为2

// 因整数不一定是正整数，用双指针无法判断是前进还是后退

// 转换思路，先求前i项的和，那么前j项的和 - 前i项的和 = k，则表示从i+ 1到j是一个连续子数组
const arr = [2, 2, 4, 3, 2, 3]
const k = 4

// const arr = [1, 2, 1]
// const k = 3

function fn1(arr, k) {
    let count = 0
    const sumObj = {}
    // 边扫描边用哈希表记录，不用数组记录, 键为和， 值为出现的次数
    // 初始化 sum = 0, 次数为1
    sumObj[0] = 1
    for (let i = 0; i < arr.length; i++) {
        const sum = arr.slice(0, i + 1).reduce((acc, a) => (acc += a), 0)

        if (sumObj[sum]) {
            sumObj[sum]++
        } else {
            sumObj[sum] = 1
        }
        console.log(sum, sumObj)
        if (sumObj[sum - k]) {
            count += sumObj[sum - k]
        }
    }
    return count
}

console.log(fn1(arr, k))
