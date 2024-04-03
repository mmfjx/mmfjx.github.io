// 输入n和k, 请输出从1到n中选取k个数字组成的所有组合
// 回溯法，1 到n， 每个数字有两个选择：加和不加入 当组合内有k个数字时，即完全一个组合

function fn(n, k) {
    const res = []
    helper(n, k, 1, [], res)
    return res
}

function helper(n, k, i, sub, res) {
    if (sub.length === k) {
        res.push([...sub])
    } else if (i <= n) {
        helper(n, k, i + 1, sub, res)
        sub.push(i)
        helper(n, k, i + 1, sub, res)
        sub.pop()
    }
}
console.log(fn(3, 2))