// 输入一个递增排序额数组和一个值k, 请问如何找出数组中两个和为k的数字并返回下标，假设只存在一组符合条件的数字 ，同时一个数字不能使用两次

// 思路1：双指针，前提是已排序的数组 ， 时间复杂度O(n),空间复杂度O(1)
function fn1(arr, k) {
    let i = 0,
        j = arr.length - 1
    while (arr[i] + arr[j] !== k && i < j) {
        if (arr[i] + arr[j] < k) {
            i++
        } else {
            j--
        }
    }
    return [i, j]
}
console.log(fn1([2, 3, 4, 5, 6, 9, 13], 12), 'fn1')

// 思路2： 哈希表，把数组中的数字映射为哈希表，数组值 对应 下标，然后在哈希表中判断 k-i是否存在, 边扫描映射边判断  时间复杂度O(n),空间复杂度O(1)
function fn2(arr, k) {
    let hash = {}
    for (let i = 0; i < arr.length; i++) {
        const v = arr[i]
        hash[v] = i
        if (hash[k - v] && i !== hash[k - v]) {
            return [i, hash[k - v]]
        }
    }
    return [0, 0]
}
console.log(fn2([2, 3, 4, 5, 6, 9, 13], 12), 'fn2')

// 思路3： 二分法，在遍历扫描的过程中，假设扫描到的值为v, 则利用二分法查找k-v，二分法的前提也是有序数组 时间复杂度O(nlogn), 空间复杂O(1)
function fn3(arr, k) {
    let i = 0
    for (; i < arr.length; i++) {
        let v = arr[i]
        // 二分法查找k-v的下标
        let s = i + 1
        let e = arr.length - 1
        let h = Math.floor((s + e) / 2)
        while (arr[h] !== k - v && s < arr.length - 1 && e > i) {
            if (arr[h] < k - v) {
                s = h + 1
            } else if (arr[h] > k - v) {
                e = h - 1
            }
            h = Math.floor((s + e) / 2)
        }
        if (arr[h] === k - v) {
            return [i, h]
        }
    }
}
console.log(fn3([2, 3, 4, 5, 6, 9, 13], 12), 'fn3')
