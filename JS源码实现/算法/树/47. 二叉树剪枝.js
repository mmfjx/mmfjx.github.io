// 一棵二叉树的所有节点的值要么是0要么是1，请剪除该二叉树中所有节点的值全部是0的子树
// 思路：需先判断左右节点是否全部为0，再判断父节点是否为0，适用后序遍历
function fn1(root) {
    if (!root) {
        return root
    }
    root.left = fn1(root.left)
    root.right = fn1(root.right)
    if (!root.left && !root.right && root.key === 0) {
        return null
    }
    return root
}

const root = {
    key: 3,
    left: {
        key: 4,
        left: { key: 5, left: null, right: null },
        right: { key: 1, left: null, right: null },
    },
    right: {
        key: 0,
        left: null,
        right: { key: 0, left: null, right: null },
    },
}
console.log(fn1(root))
