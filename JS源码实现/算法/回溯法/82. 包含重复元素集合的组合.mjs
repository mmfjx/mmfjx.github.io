// 给定一个可能包含重复数字的整数集合，请找出所有元素之和等于k的所有组合，输出不得包含重复的组合
// 先排序，如果重复则跳过
const arr = [2, 2, 4, 3, 3]
function fn(arr, k) {
    const res = []
    arr = arr.sort()
    helper(arr, k, 0, [], res)
    return res
}

function helper(arr, k, i, sub, res) {
    if (k === 0) {
        res.push([...sub])
    } else if (i < arr.length && k > 0) {
        // 不加
        helper(arr, k, getNext(arr, i), sub, res)
        // 加
        sub.push(arr[i])
        helper(arr, k - arr[i], i + 1, sub, res)
        sub.pop()
    }
}

function getNext(arr, i) {
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] !== arr[i]) {
            return j
        }
    }
    return i + 1

}
console.log(fn(arr, 8))