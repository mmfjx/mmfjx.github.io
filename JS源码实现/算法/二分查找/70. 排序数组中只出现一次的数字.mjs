// 在一个排序的数组中，除一个数字只出现一次之外，其他数字都出现了两次，请找出这个唯一只出现一次的数字
// 最简单的思路，遍历查找这个数字不等于前一个数字，也不等于后一个数字，即是只出现一次的数字
const arr = [1, 1, 2, 2, 3, 4, 4, 5, 5]
function fn(arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        if (arr[mid] !== arr[mid - 1] && arr[mid] !== arr[mid + 1]) {
            return arr[mid]
        }
    }
}

// 二分查找，两两一组，找到第一个不相同的一组
function fn1(arr) {
    let left = 0;
    let right = Math.floor(arr.length / 2)
    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        let i = mid * 2
        if (i < arr.length && arr[i] !== arr[i - 1]) {
            if (mid === 0 || arr[i - 1] === arr[i - 2]) { // 第一个不相同的一组，前一组必定是相同的
                return arr[i]
            }
            right = mid - 1  // 说明不是第一个不相同，第一个不相同的在前面
        } else {
            left = mid + 1
        }
    }
    return arr[arr.length - 1]
}

console.log(fn(arr))
console.log(fn1(arr))