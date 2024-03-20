// 给定一棵二叉树，如果站在该二叉树的右侧，那么从上到下看到的节点构成二叉树的右侧视图。请写一个函数返回二叉树的右侧视图节点的值

// 思路：每层的右侧视图，还是用两个队列
const Queue = require('./queue')

function fn1(root) {
    let rightView = []
    if (!root) {
        return rightView
    }
    // 两个队列
    let queue1 = new Queue()
    let queue2 = new Queue()

    queue1.enqueue(root)
    let rightNode = null

    while (!queue1.isEmpty) {
        queue1.front().left && queue2.enqueue(queue1.front().left)
        queue1.front().right && queue2.enqueue(queue1.front().right)
        rightNode = queue1.dequeue().key

        if (queue1.isEmpty) {
            rightView.push(rightNode)
            queue1 = queue2
            queue2 = new Queue()
            rightNode = null
        }
    }
    return rightView
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
