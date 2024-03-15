// 判断一个链表是不是回文, 要求时间复杂度O(n)，空间复杂度小于O(n)
// 思路: 还是折半，反转，最后比较的方法
const utils = require('./utils')
const { ListNode, createLinkedList, printLinkedList } = utils

let arr = [1, 2, 3, 4, 3, 2, 1]
let head = createLinkedList(arr)

function splitLinkedList(head) {
    let dummy = new ListNode(0)
    dummy.next = head
    let slow = dummy
    let fast = dummy
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next
        if (fast.next) {
            fast = fast.next
        }
    }
    // 断开link
    let newHead = slow.next
    slow.next = null
    return {
        head1: head,
        head2: newHead,
    }
}

function reserveLinkedList(head) {
    let pre = null
    let cur = head
    while (cur) {
        let next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
}

function fn1(head) {
    if (!head || !head.next) {
        return true
    }
    let { head1, head2 } = splitLinkedList(head)
    head2 = reserveLinkedList(head2)
    let node1 = head1
    let node2 = head2
    while (node1 && node2) {
        if (node1.val !== node2.val) {
            return false
        }
        node1 = node1.next
        node2 = node2.next
    }

    return true
}
console.log(fn1(head))
