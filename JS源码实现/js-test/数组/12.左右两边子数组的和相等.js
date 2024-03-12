// 输入一个整数数组，如果一个数字左边的子数组数字之和等于右边的子数组的数字之和，那么返回该数字的下标。如果存在多个，返回第一个，如不存在，则返回-1
const arr = [1, 7, 3, 6, 2, 9]
// 返回下标3，值6的左右子数组相等，都是11
// 思路，先遍历累加，求数组的总和total, 再扫描计算，从0 到 i-1的和sum与total-sum-i值的大小是否相等，如相等，则i即为寻找的值
function fn1(arr) {
    const total = arr.reduce((acc, a) => (acc += a), 0)
    for (let i = 0; i < arr.length; i++) {
        const sum = arr.slice(0, i).reduce((acc, a) => (acc += a), 0)
        if (sum === total - arr[i] - sum) {
            return i
        }
    }
    return -1
}
console.log(fn1(arr))
