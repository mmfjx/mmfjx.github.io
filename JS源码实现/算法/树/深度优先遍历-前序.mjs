// 深度优先遍历-前序，即先遍历父节点，再遍历左节点和右节点

import Stack from '../数据结构/stack.mjs'

// 方法一： 递归遍历
function leftHeight1(root) {
    const res = []
    if (!root) {
        return res
    }

    dfs(root, res)
    return res
}

function dfs(node, res) {
    if (!node) {
        return
    }
    res.push(node.key)
    node.left && dfs(node.left, res)
    node.right && dfs(node.right, res)
}

// 方法二：非递归， 使用栈，父节点先入栈，左树再入栈，所有的左树处理完成后，再读取父节点的右树，是先入后出的场景，所以用栈
function leftHeight2(root) {
    const res = []
    if (!root) {
        return res
    }
    const stack = new Stack()
    let node = root
    while (!stack.isEmpty || node) {
        while (node) {
            res.push(node.key)
            stack.push(node)
            node = node.left
        }
        node = stack.pop()
        node = node.right
    }
    return res
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
console.log(leftHeight1(root))
console.log(leftHeight2(root))
