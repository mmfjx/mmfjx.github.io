// 在完全二叉树中，除最后一层之外的其他节点都是满的，最后一层的节点可能不满，该层所有的节点尽可能向左边靠拢，实现插入新节点insert方法

// 思路： 按层级搜索，是广度优先搜索，可以用对队列来实现，首先第一层，把根节点放入队列，如果节点的左右节点都存在，则在队列中删除该节点，并把左右节点放入队列，如此第一层处理完成，如果左节点或者右节点不攒存在，则不存在的节点就是插入的位置
// 接着处理队列的第一个节点，如果左节点存在，则第一个节点就是左节点，如此继续下去，处理第二层、后面也是如此
const { Node, BinaryTree } = require('../数据结构/二叉树/BinaryTree')
const Queue = require('./queue')
class CBTInserter {
    root = null
    queue = new Queue()

    constructor(root) {
        this.root = root
        // 在此处直接查找插入的位置
        this.queue.enqueue(root)
        while (this.queue.front().left && this.queue.front().right) {
            this.queue.dequeue()
            this.queue.enqueue(this.queue.front().left)
            this.queue.enqueue(this.queue.front().right)
        }
        // 运行到此处， queue最后一个节点是父节点
    }
    // insert 在完全二叉树中添加一个值为v的节点，并返回被插入节点的父节点
    insert(v) {
        const node = new Node(v)
        const parentNode = this.queue.front()
        if (!parentNode.left) {
            parentNode.left = node
        } else {
            parentNode.right = node
            this.queue.dequeue(parentNode)
            this.queue.enqueue(parentNode.left)
            this.queue.enqueue(parentNode.right)
        }
        return parentNode
    }

    getRoot() {
        // 返回完全二叉树的根节点
        return this.root
    }
}

const root = new Node(1)
const cbTInserter = new CBTInserter(root)
console.log(cbTInserter.insert(2))
console.log(cbTInserter.insert(3))
console.log(cbTInserter.insert(4))
console.log(cbTInserter.insert(5))
console.log(cbTInserter.insert(6))
console.log(cbTInserter.getRoot())
