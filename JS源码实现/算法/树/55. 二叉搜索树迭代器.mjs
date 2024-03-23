// 请实现二次搜索树的迭代器BSTIterator, 主要有如下3个函数：
// 构造函数：输入二叉搜索树的根节点初始化该迭代器
// next： 返回二叉树中下一个最小的节点的值
// hasNext: 返回二叉搜索树是否还有下一个节点
import Stack from '../数据结构/stack.mjs'

class BSTIterator {
    stack = null
    node = null
    constructor(root) {
        this.stack = new Stack()
        this.node = root
    }
    next() {
        while (this.node) {
            this.stack.push(this.node)
            this.node = this.node.left
        }

        this.node = this.stack.pop()
        let val = node.key
        this.node = this.node.right
        return val
    }

    hasNext() {
        return !this.stack.isEmpty || !this.node
    }
}