// 如何在一个棵二叉树中找出它最低层最左边节点的值？

// 思路：最底层最左边，还是广度搜索，用两个队列来查找

const { Node } = require('../数据结构/二叉树/BinaryTree')
const Queue = require('./queue')

function fn1(root) {
    let bottomLeft = null
    if (!root) {
        return bottomLeft
    }
    // 两个队列
    let queue1 = new Queue()
    let queue2 = new Queue()

    queue1.enqueue(root)
    bottomLeft = root.key

    while (!queue1.isEmpty) {
        queue1.front().left && queue2.enqueue(queue1.front().left)
        queue1.front().right && queue2.enqueue(queue1.front().right)
        queue1.dequeue()

        if (queue1.isEmpty) {
            queue1 = queue2
            if (queue1.front()) {
                bottomLeft = queue1.front().key
            }
            queue2 = new Queue()
        }
    }
    return bottomLeft
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
