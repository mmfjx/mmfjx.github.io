// 输入一个只包含0和1的数组，请问如何求0和1的个数相同的最长连续子数组的长度？
const arr = [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1]
// 有两个子数组包含相同个数的0和1，[0,1] [1,0], 长度都是2，因此输出2

// 思路：求0和1个数相同的连续子数组的长度，0和1个数相同，如果把0替换成-1，就意味着-1和1的个数相同，即和为0，可以转变成求和为0的连续子数组的最长长度，和第10题一样，先计算从0到i项的和，同时用哈希表记录键为和，值为下标记录并寻找和为0的子数组
function fn1(arr) {
    let maxLen = 0
    let sumObj = {}
    sumObj[0] = -1
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i] === 0 ? -1 : arr[i]
        const sum = arr.slice(0, i + 1).reduce((acc, a) => (acc += a), 0)
        if (sumObj[sum]) {
            maxLen = Math.max(0, i - sumObj[sum])
        } else {
            sumObj[sum] = i
        }
    }
    return maxLen
}
console.log(fn1(arr))
