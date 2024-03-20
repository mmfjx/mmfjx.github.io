// 输入一个二叉树，请找出二叉树中每层的最大值

// 思路： 每层的最大值，还是广度优先搜索，考虑队列，如用一个队列，会存在两层节点在一个队列的情况，但可以用计数的方式来统计是否一层遍历完成。另一种方法是用两个队列来暂存

const { Node } = require('../数据结构/二叉树/BinaryTree')
const Queue = require('./queue')

function fn1(root) {
    let maxArr = []
    if (!root) {
        maxArr = []
        return
    }
    // 两个队列
    let queue1 = new Queue()
    let queue2 = new Queue()

    queue1.enqueue(root)
    let max = null

    while (!queue1.isEmpty) {
        queue1.front().left && queue2.enqueue(queue1.front().left)
        queue1.front().right && queue2.enqueue(queue1.front().right)
        const node = queue1.dequeue()
        if (max === null) {
            max = node.key
        } else {
            max = Math.max(max, node.key)
        }

        if (queue1.isEmpty) {
            queue1 = queue2
            maxArr.push(max)
            max = null
            queue2 = new Queue()
        }
    }
    return maxArr
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
