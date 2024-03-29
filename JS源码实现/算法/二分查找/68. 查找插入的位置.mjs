// 输入一个排序的整数数组nums，和一个目标值t，如果数组nums中包含t，则返回t在数组中的下标，否则返回将t按顺序插入数组的下标。假设数组中没有相同的数字
// 排序后数组 查找   明显二分查找

const arr = [1, 3, 6, 8]
function fn(arr, t) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2)

        if (arr[mid] >= t) {
            if (mid === 0 || arr[mid - 1] < t) {
                return mid
            }

            right = mid - 1
        } else {

            left = mid + 1
        }
    }
    return arr.length
}

console.log(fn(arr, 4))