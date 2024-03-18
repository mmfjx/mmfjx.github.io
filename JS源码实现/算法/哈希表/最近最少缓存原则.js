// LRU LRU 缓存淘汰算法就是一种常用策略。LRU 的全称是 Least Recently Used，是一种常见的缓存算法，用于管理缓存中的数据。LRU算法的核心思想是保留最近被访问过的数据，而淘汰最久未被访问的数据。
// 它的工作原理如下：
// 初始化： 缓存被初始化为一定的容量，当缓存达到容量上限时，需要淘汰数据。
// 访问数据： 每次访问（读取或写入）缓存中的数据时，将该数据移动到数据结构的头部或更新其位置，表示这个数据是最近被使用的。
// 淘汰数据： 当缓存达到容量上限时，需要淘汰最久未被访问的数据，通常是数据结构的尾部的数据。

// 哈希表+ 双链表环，哈希表的key是真实数据，value是双链表对应的节点，在js中可用map来实现哈希表，双链表指向前一个节点和后一个节点，当访问数据时，直接把对应的节点移动至链表头，如此，不常访问的数据会在链表尾部, 且next指向头节点，头节点的pre指向尾节点
// 时间复杂度O(1)

function ListNode(val) {
    return {
        pre: null,
        next: null,
        val,
    }
}
class LRU {
    limit = 5
    head = new ListNode(null)
    map = new Map()
    constructor(limit) {
        this.limit = limit
    }

    deleteNode(node) {
        const preNode = node.pre
        const nextNode = node.next
        preNode.next = nextNode
        nextNode.pre = preNode
    }

    insertNodeAfterHead(node) {
        const head = this.head
        if (head.next) {
            node.pre = head
            node.next = head.next
            head.next.pre = node
            head.next = node
        } else {
            node.pre = head
            node.next = head
            head.next = node
            head.pre = node
        }
    }

    // 读取
    get(key) {
        const node = this.map.get(key)
        if (node) {
            this.deleteNode(node)
            this.insertNodeAfterHead(node)
        }
        return (node && node.val) || node
    }
    // 写入, 注意超过limit时，需删除尾部节点
    put(key) {
        if (this.map.size === this.limit) {
            const tailNode = this.head.pre
            this.deleteNode(tailNode)
        }
        let node = this.map.get(key)
        if (node) {
            this.deleteNode(node)
            this.insertNodeAfterHead(node)
        } else {
            node = new ListNode(key)
            this.map.set(key, node)
            this.insertNodeAfterHead(node)
        }
    }
}

const lur = new LRU(3)
// console.log(lur.get(2))
lur.put(2)
lur.put(3)
lur.put(4)
lur.put(5)
console.log(lur.head)
