// 给定一棵二叉搜索树，请将它对的每个节点的值替换成树中大于或等于该节点值的所有值之和
// 二叉搜索树，中序，最右侧的节点最大的，就是该节点本身，依次倒序遍历，并累计已遍历的节点和，即可边遍历边替换
import Stack from '../数据结构/stack.mjs'

function fn(root) {
    if (!root) {
        return root
    }
    const stack = new Stack()
    let node = root
    let sum = 0;
    while (!stack.isEmpty || node) {
        // 先根节点，再右节点，最后左节点
        while (node) {
            stack.push(node)
            node = node.right
        }
        node = stack.pop();
        sum += node.key
        node.key = sum
        node = node.left
    }
    return root;
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

console.log(fn(root))