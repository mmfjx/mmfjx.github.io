// 给定一棵二叉搜索树，请调整节点的指针使每个节点都没有左子节点。调整后的树看起来像一个链表，但仍然是二叉搜索树

// 二叉搜索树，左节点 < 父节点 < 右节点，要使没有左子节点，即左节点变成父节点的父节点，父节点变成左节点的右节点，最后左节点为null
// 整体采用中序遍历，用栈
import Stack from '../数据结构/stack.mjs'
function fn(root) {
    if (!root) {
        return root
    }
    const stack = new Stack()
    let node = root
    let first = null
    let pre = null
    while (!stack.isEmpty || node) {
        while (node) {
            stack.push(node)
            node = node.left
        }
        node = stack.pop()
        if (!first) {
            first = node
        }
        if (pre) {
            pre.right = node
        }

        node.left = null
        pre = node;
        node = node.right

    }
    return first

}


const root = {
    key: 4,
    left: {
        key: 2,
        left: { key: 1, left: null, right: null },
        right: { key: 3, left: null, right: null },
    },
    right: {
        key: 6,
        left: { key: 6, left: null, right: null },
        right: { key: 7, left: null, right: null },
    },
}

console.log(fn(root))