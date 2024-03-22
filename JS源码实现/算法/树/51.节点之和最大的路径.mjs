// 在二叉树中将路径定义为顺着节点之间的连接从任意一个节点开始到达任意一个节点所经过的所有节点。路径汇中至少包含一个节点，不一定经过二叉树的根节点，也不一定经过叶节点。给定非空的一棵二叉树，请求出二叉树上节点值之和的最大值。

//写递归，要注意先专注在一个父子节点内的处理，再考虑递归调用的逻辑处理
function maxPathSum(root) {
    const maxSum = [null]
    dfs(root, maxSum)
    return maxSum[0]
}

function dfs(root, maxSum) {
    if (!root) {
        return 0
    }

    const maxSumLeft = [null]
    let left = Math.max(0, dfs(root.left, maxSumLeft))

    const maxSumRight = [null]
    let right = Math.max(0, dfs(root.right, maxSumRight))

    if (maxSumLeft[0] === null && maxSumRight[0] === null) {
        maxSum[0] = null
    } else if (maxSumLeft[0] === null) {
        maxSum[0] = maxSumRight[0]
    } else if (maxSumRight[0] === null) {
        maxSum[0] = maxSumLeft[0]
    } else {
        maxSum[0] = Math.max(maxSumLeft[0], maxSumRight[0])
    }
    if (maxSum[0] === null) {
        maxSum[0] = root.key + left + right
    } else {
        maxSum[0] = Math.max(maxSum[0], root.key + left + right)
    }

    return root.key + Math.max(left, right)
}
const root = {
    key: -9,
    left: {
        key: 4,
        left: null,
        right: null,
    },
    right: {
        key: 20,
        left: {
            key: 15,
            left: { key: -3, left: null, right: null },
            right: null,
        },
        right: { key: 7, left: null, right: null },
    },
}

console.log(maxPathSum(root))
