// 给定一棵二叉搜索树和一个值k，请判断该二叉搜索树是否存在值之和等于k的两个节点，假设二叉搜索树中节点的值均唯一

//  哈希+ 遍历
import Stack from '../数据结构/stack.mjs'
function fn(root, k) {
    if (!root) {
        return false
    }
    const stack = new Stack()
    const map = new Map()
    let node = root
    while (!stack.isEmpty || node) {
        while (node) {
            stack.push(node)
            node = node.left
        }
        node = stack.pop()
        if (map.get(k - node.key)) {
            return true
        }
        map.set(node.key, true)
        node = node.right
    }
    return false
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
        left: { key: 5, left: null, right: null },
        right: { key: 7, left: null, right: null },
    },
}

console.log(fn(root, 20))