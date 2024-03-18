
// 二分查找， 在有序的数组找出目标值
function binFind(arr, target) {
    let low = 0;
    let high = arr.length -1;
    while(low <= high) {
        let mid = Math.floor((high + low) / 2);
        if (arr[mid] === target) {
            return mid;
        }
        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}



