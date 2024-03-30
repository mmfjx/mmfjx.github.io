// 输入一个不含重复数字的数据集合，请找出它的所有子集
// 回溯法，每个数字都有添加和不添加两种选择
const arr = [1, 2]
function fn(arr) {
    let res = []
    if (arr.length === 0) {
        return res
    }
    helper(arr, 0, [], res)
    return res;
}

function helper(arr, index, sub, res) {
    if (index === arr.length) {
        res.push([...sub])
    } else {
        helper(arr, index + 1, sub, res) // 不加

        sub.push(arr[index]) // 加
        helper(arr, index + 1, sub, res)
        sub.pop()
    }
}
console.log(fn(arr))
