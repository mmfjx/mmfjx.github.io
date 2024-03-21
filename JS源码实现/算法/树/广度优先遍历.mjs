// 广度优先遍历，一层一层遍历，使用队列，先放入队列的节点，先处理，读取其左右子节点，读取完成后再出队列，继续往下读取子节点的左右子节点
import Queue from '../数据结构/queue.mjs'

function fn1(root) {
    const res = []
    const queue = new Queue()
    if (!root) {
        return res
    }
    res.push(root.key)
    queue.enqueue(root)
    while (!queue.isEmpty) {
        const node = queue.front()
        if (node.left) {
            queue.enqueue(node.left)
            res.push(node.left.key)
        }
        if (node.right) {
            queue.enqueue(node.right)
            res.push(node.right.key)
        }
        queue.dequeue()
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
console.log(fn1(root))
