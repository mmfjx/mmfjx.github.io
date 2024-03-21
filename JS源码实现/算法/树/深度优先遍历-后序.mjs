// 深度优先遍历-后序，即先遍历左节点，再遍历右节点，最后遍历父节点

import Stack from '../数据结构/stack.mjs'

// 方法一： 递归遍历
function rightHeight1(root) {
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
    node.right && dfs(node.right, res)
    res.push(node.key)
}

// 方法二：非递归， 使用栈，父节点先入栈，左树再入栈，所有的左树处理完成后，再读取父节点的右树，是先入后出的场景，此时父节点需要等右树都读完成，才能读值，可判断当前节点的右子节点是否等于上一个读值的节点，如果是，则认为已经读取完右树
//  简单理解就是，先遍历左树，并把所有的节点都入栈，直到找到最左侧的节点，然后再从栈中读取节点，并获取值，这样就是先读左树的值，再遍历右树，当右数遍历并读取完成后，再读父节点
function rightHeight2(root) {
    const res = []
    if (!root) {
        return res
    }
    const stack = new Stack()
    let node = root
    let pre = null
    while (!stack.isEmpty || node) {
        while (node) {
            stack.push(node)
            node = node.left
        }
        node = stack.peer
        if (node.right && pre !== node.right) {
            node = node.right
        } else {
            stack.pop()
            res.push(node.key)
            pre = node
            node = null
        }
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
console.log(rightHeight1(root))
console.log(rightHeight2(root))
