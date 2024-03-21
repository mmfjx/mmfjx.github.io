// 深度优先遍历-中序，即先遍历左节点，再遍历父节点和右节点

import Stack from '../数据结构/stack.mjs'

// 方法一： 递归遍历
function midHeight1(root) {
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

    node.left && dfs(node.left, res)
    res.push(node.key)
    node.right && dfs(node.right, res)
}

// 方法二：非递归， 使用栈，父节点先入栈，左树再入栈，所有的左树处理完成后，再读取父节点的右树，是先入后出的场景，但父节点虽入栈，但不读值，需等左树读完之后再读
//  简单理解就是，先遍历左树，并把所有的节点都入栈，直到找到最左侧的节点，然后再从栈中读取节点，并获取值，这样就是先读左树的值，再读中间父节点的值，最后是遍历右树
function midHeight2(root) {
    const res = []
    if (!root) {
        return res
    }
    const stack = new Stack()
    let node = root
    while (!stack.isEmpty || node) {
        while (node) {
            stack.push(node)

            node = node.left
        }

        node = stack.pop()
        res.push(node.key)
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
console.log(midHeight1(root))
console.log(midHeight2(root))
