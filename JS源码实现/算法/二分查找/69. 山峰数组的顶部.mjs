// 在一个长度大于或等于3的数组中，任意相邻的两个数字都不相等、该数组的前若干数字试试递增的，之后的数字是递减的，因此它的值看起来像一座山峰，请找出山峰顶部，即数组中最大值的位置
// 峰顶的数字大于前一个，且大于后一个，二分查找，
const arr = [1, 3, 5, 4, 2]

function fn(arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) {
            return mid
        } else if (arr[mid] > arr[mid - 1]) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}

console.log(fn(arr))