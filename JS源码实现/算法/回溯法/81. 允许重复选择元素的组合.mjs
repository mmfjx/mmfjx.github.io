// 给定一个没有重复数字的正整数集合，请找出所有元素之和等于k的所有组合，同一个数字可以出现任意次

const arr = [2, 3, 5]
function fn(arr, k) {
    const res = []
    helper(arr, k, 0, [], res)
    return res
}

function helper(arr, k, i, sub, res) {
    if (k === 0) {
        res.push([...sub])
    } else if (i < arr.length && k > 0) {
        // 不加
        helper(arr, k, i + 1, sub, res)
        // 加
        sub.push(arr[i])
        helper(arr, k - arr[i], i, sub, res)
        sub.pop()
    }
}
console.log(fn(arr, 8))