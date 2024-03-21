//  在一棵二叉树中所有节点都在0-9之间，从根节点到叶节点的路径表示一个数字，求二叉树中所有路径表示的数字之和
// 思路：从根节点到叶节点，复核前序遍历

function fn1(root) {
    if (!root) {
        return 0
    }
    return dfs(root, 0)
}

function dfs(root, path) {
    if (!root) {
        return 0
    }
    path = path * 10 + root.key
    if (!root.left && !root.right) {
        return path
    }
    const left = dfs(root.left, path)
    const right = dfs(root.right, path)
    return left + right
}

const root = {
    key: 3,
    left: {
        key: 4,
        left: { key: 5, left: null, right: null },
        right: { key: 1, left: null, right: null },
    },
    right: {
        key: 2,
        left: null,
        right: { key: 9, left: null, right: null },
    },
}
console.log(fn1(root))
